export type BuildUrlInput = {
  hostname: string;
  pathname?: string;
  port?: string;
  isWebsocket?: boolean;
};

export const buildUrl = ({
  hostname,
  pathname = '',
  port = '443',
  isWebsocket = false,
}: BuildUrlInput) => {
  const scheme = isWebsocket
    ? port === '443'
      ? 'wss://'
      : 'ws://'
    : port === '443'
    ? 'https://'
    : 'http://';
  const isShowPort = !['443', '80'].includes(port);
  const isAddSlash = pathname.length > 0 && !pathname.startsWith('/');

  return [
    scheme,
    hostname,
    isShowPort ? `:${port}` : '',
    isAddSlash ? '/' : '',
    pathname,
  ]
    .map(v => v.trim())
    .join('');
};
