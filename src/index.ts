import { byApi } from './lib/by-api';
import { byFavicon } from './lib/by-favicon';
import { byIframe } from './lib/by-iframe';
import { byWebRTC } from './lib/by-webRTC';
import { byWebsocket } from './lib/by-websocket';

export type IsReachableMethod = 'favicon' | 'api' | 'iframe' | 'webRTC' | 'websocket';

export type IsReachableInput = {
  url: string;
  method?: IsReachableMethod;
  apiOptions?: {
    requestInit?: RequestInit;
  };
  webRTCOptions?: {
    iceServer: RTCIceServer;
  };
};

export const isReachable = async ({
  url,
  method = 'favicon',
  apiOptions,
  webRTCOptions,
}: IsReachableInput): Promise<{ testable: boolean; reachable: boolean }> => {
  let testable = !!window && 'fetch' in window;
  let reachable = false;

  switch (method) {
    case 'api':
      reachable = await byApi(url, apiOptions?.requestInit);
      break;
    case 'favicon':
      reachable = await byFavicon(url);
      break;
    case 'iframe':
      reachable = await byIframe(url);
      break;
    case 'webRTC':
      const res = await byWebRTC(url, webRTCOptions?.iceServer);
      reachable = res.reachable;
      testable = res.testable;
      break;
    case 'websocket':
      reachable = await byWebsocket(url);
      break;
  }

  return { testable, reachable };
};
