export const byFavicon = async (url: string, timeout = 5000) => {
  const fetchFavicon = (withDate = true) => {
    return new Promise<boolean>((resolve, reject) => {
      const timer = setTimeout(() => {
        cleanup();
        resolve(false);
      }, timeout);
      const cleanup = () => clearTimeout(timer);

      const imageSrc = `${url}${withDate ? `?${Date.now()}` : ''}`;
      const image = new Image();

      image.onload = () => {
        cleanup();
        resolve(true);
      };
      image.onerror = error => {
        cleanup();
        reject(error);
      };

      image.src = imageSrc;
    });
  };

  const catchError = (error: unknown) => {
    console.warn('[isReachable: byFavicon]', url, error);
    return false;
  };

  return (await fetchFavicon().catch(catchError))
    ? true
    : fetchFavicon(false).catch(catchError);
};
