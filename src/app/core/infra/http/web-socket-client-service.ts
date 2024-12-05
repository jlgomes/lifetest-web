import SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { environment } from "@environments/environment";

export class WebSocketClientService {

  private readonly stompClient: Stomp.Client;

  constructor(
    private onMessage: Function,
    private topic: string,
    private callbackError?: Function,
  ) {
    const ws = new SockJS(`${environment.WEBSOCKET}/connect`);
    this.stompClient = Stomp.over(ws);
    // to not log all data into the console
    this.stompClient.debug = () => { };
    const errorCallback = callbackError ?? this.onError;
    this.connect(errorCallback);
  }


  private connect(errorCallback: Function) {
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe(this.topic, (event: any) => {
        this.onMessage(JSON.parse(event.body));
      });
    }, errorCallback.bind(this));
  }

  private onError(error: any) {
    console.error(error);
    setTimeout(() => {
      this.connect(this.onError);
    }, 3000);
  }

  public stop() {
    if (this.stompClient.connected) {
      this.stompClient.disconnect(() => {
        console.log("WebSocket connection stopped.");
      });
    }
  }
}
