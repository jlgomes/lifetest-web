import Config from '../config.json';

export const environment = {
  production: true,
  API_URL: Config.API_URL,
  BASE_URL: Config.BASE_URL,
  WEBSOCKET: Config.WEBSOCKET,
  WEBSOCKET_CAMERA: Config.WEBSOCKET_CAMERA,
};
