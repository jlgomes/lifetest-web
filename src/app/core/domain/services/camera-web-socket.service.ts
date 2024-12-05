import { Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { ToastService } from "./toast.service";
import { TypeToastEnum } from "../enums/type-toast-enum";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
  providedIn: 'root',
})
export class CameraWebSocketService {
  public webSocketClient: WebSocket | null = null;

  constructor(
    private _toast: ToastService,
    private _translate: TranslateService,
  ) { }

  initializeWebSocket(url: string): void {
    this.webSocketClient = new WebSocket(environment.WEBSOCKET_CAMERA);

    this.webSocketClient.onopen = () => {
      // Send parameters to the server
      console.log("Camera connection url: ", url);
      const params = { camUrl: url };
      this.webSocketClient?.send(JSON.stringify(params));
    };

    this.webSocketClient.onclose = () => {
      console.log('WebSocket connection closed');
    };

    this.webSocketClient.onerror = (error) => {
      console.error('WebSocket error:', error);
      const errorMessage = this._translate.instant("errors.camera-connection");
      this._toast.show(errorMessage, TypeToastEnum.ERROR);
    };
  }
}

