export const byApi = (
  url: string,
  requestInit: RequestInit = { method: 'GET' },
  timeout = 5000,
) => {
  return new Promise<boolean>(resolve => {
    const timer = setTimeout(() => {
      cleanup();
      resolve(false);
    }, timeout);
    const cleanup = () => {
      clearTimeout(timer);
    };

    fetch(url, requestInit)
      .then(res => {
        console.log('[isReachable:byApi]', url, res);
        cleanup();
        resolve(true);
      })
      .catch(err => {
        console.warn('[isReachable:byApi]', url, err);
        cleanup();
        resolve(false);
      });
  });
};
