const BASE_URL_DEBUG = 'http://127.0.0.1:8080/v2';
const BASE_URL_PROD = 'http://api.makise-amadeus.xyz/v2';
const BASE_URL_WS_DEBUG = 'ws://127.0.0.1:8080/ws';
const BASE_URL_WS_PROD = 'ws://api.makise-amadeus.xyz/ws';
export const BASE_URL = process.env.NODE_ENV === 'production' ? BASE_URL_PROD : BASE_URL_DEBUG;
export const BASE_URL_WS = process.env.NODE_ENV === 'production' ? BASE_URL_WS_PROD : BASE_URL_WS_DEBUG;
export const BANGUMI_BASE_URL = 'https://api.bgm.tv';