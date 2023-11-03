import { IncomingMessage, ServerResponse } from 'http';
import { getCookie, setCookie } from './index';

describe('getCookie', () => {
  it('succeed to get cookie from request', () => {
    const mockRequest = { headers: { cookie: 'foo=bar' } } as IncomingMessage;
    const value = getCookie(mockRequest, 'foo');

    expect(value).toEqual('bar');
  });

  it('returns null if target cookie is not found', () => {
    const mockRequest = { headers: { cookie: 'foo=bar' } } as IncomingMessage;
    const value = getCookie(mockRequest, 'hee');

    expect(value).toEqual(null);
  });

  it('returns null if any cookie has not been set', () => {
    const mockRequest = { headers: {} } as IncomingMessage;
    const value = getCookie(mockRequest, 'foo');

    expect(value).toEqual(null);
  });
});

describe('setCookie', () => {
  it('succeed to write cookie in response', () => {
    const mockRequest = {} as IncomingMessage;
    const mockResponse = new ServerResponse(mockRequest);

    setCookie(mockResponse, 'hoge', 'fuga', {});

    const val = mockResponse.getHeader('Set-Cookie');
    expect(val).toBe('hoge=fuga');
  });
});

