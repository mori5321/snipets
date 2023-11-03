import { parseCookies, serializeCookie } from './cookie';

describe('parseCookies', () => {
  it('succeed to parse cookies if valid cookie passed', () => {
    const cookie = parseCookies('foo=bar');

    expect(cookie).toStrictEqual({
      foo: 'bar',
    });
  });

  it('succeed to parse cookies if valid cookie with some options passed', () => {
    const cookie = parseCookies(
      'foo=bar; Domain=zoolake.jp; SameSite=Lax; Expires="Mon, 11 Apr 2022 05:40:59 GMT"; HttpOnly',
    );

    expect(cookie).toStrictEqual({
      foo: 'bar',
      Domain: 'zoolake.jp',
      SameSite: 'Lax',
      Expires: 'Mon, 11 Apr 2022 05:40:59 GMT',
    });
  });

  it('succeed to parse & return empty object if empty string is passed', () => {
    const cookie = parseCookies('');

    expect(cookie).toStrictEqual({});
  });
});

describe('serializeCookie', () => {
  it('succeed to seralize string cookie', () => {
    const cookie = serializeCookie('hoge', 'fuga', {});
    expect(cookie).toBe('hoge=fuga');
  });

  it('succeeds to seralize object cookie', () => {
    const cookie = serializeCookie('hoge', { user: 'maru' }, {});
    expect(cookie).toBe('hoge=%7B%22user%22%3A%22maru%22%7D');
  });

  it('succeeds to serailze cookie with options', () => {
    const cookie = serializeCookie(
      'hoge',
      { user: 'maru' },
      {
        domain: 'zoolake.jp',
        httpOnly: true,
      },
    );

    expect(cookie).toBe(
      'hoge=%7B%22user%22%3A%22maru%22%7D; Domain=zoolake.jp; HttpOnly',
    );
  });
});

