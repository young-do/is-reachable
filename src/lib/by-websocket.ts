export const byWebsocket = (url: string) => {
  return new Promise<boolean>(resolve => {
    const webSocket = new WebSocket(url);
    let result = false;

    webSocket.onopen = event => {
      console.log('[isReachable:byWebsocket]: onopen', url, event);
      result = true;
      webSocket.close();
    };

    webSocket.onerror = event => {
      console.warn('[isReachable:byWebsocket]: onerror', url, event);
      webSocket.close();
    };

    webSocket.onclose = event => {
      console.log('[isReachable:byWebsocket]: onclose', url, event);
      resolve(result);
    };
  });
};
