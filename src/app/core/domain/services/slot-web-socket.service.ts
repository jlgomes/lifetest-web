import { WebSocketClientService } from "@core/infra/http/web-socket-client-service";
import { SlotModel } from "@core/domain/models/slot-model";

export class SlotWebSocketService {

  private webSocketClient: WebSocketClientService

  constructor(onMessage: (slots: SlotModel[]) => void, callbackError?: Function) {
    this.webSocketClient = new WebSocketClientService(onMessage, "/slots", callbackError);
  }

  public stop() {
    this.webSocketClient.stop();
  }
}
