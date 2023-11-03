import { CookieSerializeOptions } from 'cookie';
import { IncomingMessage, ServerResponse } from 'http';
import {
  parseCookies,
  serializeCookie,
  type Cookie,
  type SetCookieValue,
} from './cookie';
export { type Cookie } from './cookie';

const SET_COOKIE_HEADER = 'Set-Cookie';

export const getCookie = (
  req: IncomingMessage,
  name: string,
): string | null => {
  const cookies = getCookies(req);
  return cookies[name] ?? null;
};

const getCookies = (req: IncomingMessage): Cookie =>
  parseCookies(req.headers?.cookie || '');

export const setCookie = (
  res: ServerResponse,
  name: string,
  value: SetCookieValue,
  options: CookieSerializeOptions,
): void => {
  const cookie = serializeCookie(name, value, options);
  if (cookie instanceof Error) {
    throw cookie;
  }

  res.setHeader(SET_COOKIE_HEADER, cookie);
};

