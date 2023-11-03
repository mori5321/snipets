import { CookieSerializeOptions, parse, serialize } from 'cookie';

export type Cookie = { [key: string]: string };
export type SetCookieValue = string | Record<string, string | number>;

export const parseCookies = (cookieStr: string): Cookie => parse(cookieStr);

export const serializeCookie = (
  name: string,
  value: SetCookieValue,
  options: CookieSerializeOptions,
): string | Error => {
  const val = serializeValue(value);
  if (val instanceof Error) {
    return val;
  }

  return serialize(name, val, options);
};

const serializeValue = (value: SetCookieValue): string | Error => {
  if (value instanceof Object) {
    return JSON.stringify(value);
  }

  if (typeof value === 'string') {
    return value;
  }

  return new Error('Invalid Cookie Format. Cookie must be string or object.');
};

