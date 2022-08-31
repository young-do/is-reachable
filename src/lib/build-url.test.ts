import { buildUrl } from './build-url';
import { describe, expect, it } from 'vitest';

describe('when no pathname', () => {
  it('general url', () => {
    const result = buildUrl({ hostname: 'example.com' });
    const expected = 'https://example.com';
    expect(expected).toBe(result);
  });

  it('localhost url', () => {
    const result = buildUrl({ hostname: 'localhost', port: '8080' });
    const expected = 'http://localhost:8080';
    expect(expected).toBe(result);
  });

  it('ip url', () => {
    const result = buildUrl({ hostname: '127.0.0.1', port: '8080' });
    const expected = 'http://127.0.0.1:8080';
    expect(expected).toBe(result);
  });

  it('websocket url', () => {
    const result = buildUrl({ hostname: 'example.com', isWebsocket: true });
    const expected = 'wss://example.com';
    expect(expected).toBe(result);
  });
});

describe('when pathname exists', () => {
  it('general url', () => {
    const result = buildUrl({ hostname: 'example.com', pathname: '/rest' });
    const expected = 'https://example.com/rest';
    expect(expected).toBe(result);
  });

  it('localhost url', () => {
    const result = buildUrl({
      hostname: 'localhost',
      pathname: '/rest',
      port: '8080',
    });
    const expected = 'http://localhost:8080/rest';
    expect(expected).toBe(result);
  });

  it('ip url', () => {
    const result = buildUrl({
      hostname: '127.0.0.1',
      pathname: '/rest',
      port: '8080',
    });
    const expected = 'http://127.0.0.1:8080/rest';
    expect(expected).toBe(result);
  });

  it('websocket url', () => {
    const result = buildUrl({
      hostname: 'example.com',
      pathname: '/rest',
      isWebsocket: true,
    });
    const expected = 'wss://example.com/rest';
    expect(expected).toBe(result);
  });
});
