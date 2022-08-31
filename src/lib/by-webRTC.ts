export const byWebRTC = (
  hostname: string,
  iceServer: RTCIceServer = { urls: hostname },
): Promise<boolean> => {
  if (typeof RTCPeerConnection === 'undefined') {
    return Promise.resolve(false);
  }

  return checkTURNServer(iceServer)
    .then(res => {
      console.log('[isReachable:byWebRTC]', hostname, res);
      return res;
    })
    .catch(err => {
      console.warn('[isReachable:byWebRTC]', hostname, err);
      return false;
    });
};

// ref: https://stackoverflow.com/questions/28772212/stun-turn-server-connectivity-test
const checkTURNServer = (iceServer: RTCIceServer, timeout = 5000) => {
  return new Promise<boolean>(resolve => {
    const pc = new RTCPeerConnection({
      iceServers: [iceServer],
      iceTransportPolicy: 'relay',
      iceCandidatePoolSize: 0,
    });
    let promiseResolved = false;

    // Stop waiting after X milliseconds and display the result
    setTimeout(() => {
      if (promiseResolved) return;
      promiseResolved = true;
      resolve(false);
    }, timeout);

    // Create a bogus data channel
    pc.createDataChannel('');

    // Listen for candidates
    pc.onicecandidate = ice => {
      if (promiseResolved || ice === null || ice.candidate === null) return;
      if (ice.candidate.candidate.includes('typ relay')) {
        promiseResolved = true;
        resolve(true);
      }
    };
    pc.onicecandidateerror = e => {
      if (e instanceof RTCPeerConnectionIceErrorEvent && e.errorCode === 401) {
        resolve(true);
      }
    };

    // Create offer and set local description
    pc.createOffer().then(offer => pc.setLocalDescription(offer));
  });
};
