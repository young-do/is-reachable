import { buildUrl } from './lib/build-url';
import { byApi } from './lib/by-api';
import { byFavicon } from './lib/by-favicon';
import { byIframe } from './lib/by-iframe';
import { byWebRTC } from './lib/by-webRTC';
import { byWebsocket } from './lib/by-websocket';

export type IsReachableMethod =
  | 'favicon'
  | 'api'
  | 'iframe'
  | 'webRTC'
  | 'websocket';

export type IsReachableInput = {
  hostname: string;
  pathname?: string;
  port?: string;
  method?: IsReachableMethod;
  apiOptions?: {
    requestInit?: RequestInit;
  };
  webRTCOptions?: {
    iceServer: RTCIceServer;
  };
};

export const isReachable = async ({
  hostname,
  pathname,
  port,
  method = 'favicon',
  apiOptions,
  webRTCOptions,
}: IsReachableInput): Promise<boolean> => {
  // 1. url parsing = scheme / host / port / rest
  // 2. fn mapping
  // 3. return result

  const url = buildUrl({
    hostname,
    pathname,
    port,
    isWebsocket: method === 'websocket',
  });

  let result = false;

  switch (method) {
    case 'api':
      result = await byApi(url, apiOptions?.requestInit);
      break;
    case 'favicon':
      result = await byFavicon(url);
      break;
    case 'iframe':
      result = await byIframe(url);
      break;
    case 'webRTC':
      result = await byWebRTC(hostname, webRTCOptions?.iceServer);
      break;
    case 'websocket':
      result = await byWebsocket(url);
      break;
  }

  return result;
};
