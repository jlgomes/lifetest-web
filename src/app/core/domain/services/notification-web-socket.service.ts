import { WebSocketClientService } from "@core/infra/http/web-socket-client-service";
import { NotificationCustomHeaderModel } from "@core/domain/models/notification-custom-header-model";

export class NotificationWebSocketService {

  private webSocketClient: WebSocketClientService;

  constructor(onMessage: (slots: NotificationCustomHeaderModel) => void, callbackError?: Function) {
    this.webSocketClient = new WebSocketClientService(onMessage, "/notifications", callbackError);
  }

  public stop() {
    this.webSocketClient.stop();
  }
}
