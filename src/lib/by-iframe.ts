export const byIframe = (url: string) => {
  return checkByIframe(url)
    .then(res => {
      console.log('[isReachable:byIframe]', url, res);
      return res;
    })
    .catch(err => {
      console.warn('[isReachable:byIframe]', url, err);
      return false;
    });
};

const checkByIframe = (src: string, timeout = 5000) => {
  return new Promise<boolean>((resolve, reject) => {
    const timer = setTimeout(() => {
      cleanup();
      resolve(false);
    }, timeout);
    const cleanup = () => {
      clearTimeout(timer);
      document.body.removeChild(iframe);
    };

    const iframe = document.createElement('iframe');
    iframe.style.border = 'none';
    iframe.style.display = 'none';
    iframe.style.width = '0px';
    iframe.style.height = '0px';
    iframe.src = src;

    iframe.onload = () => {
      cleanup();
      resolve(true);
    };

    iframe.onerror = err => {
      cleanup();
      reject(err);
    };

    document.body.appendChild(iframe);
  });
};
