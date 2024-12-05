import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SlotModel } from '@core/domain/models/slot-model';
import { CameraWebSocketService } from '@core/domain/services/camera-web-socket.service';

@Component({
  selector: 'app-camera-view',
  templateUrl: './camera-view.component.html',
  styleUrls: ['./camera-view.component.scss']
})
export class CameraViewComponent implements OnInit, OnDestroy {
  protected loading: boolean = true;
  protected data!: SlotModel;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: SlotModel,
    public dialogRef: MatDialogRef<CameraViewComponent>,
    private ws: CameraWebSocketService,
  ) {
    this.data = data;
  }

  ngOnInit(): void {
    this.ws.initializeWebSocket(this.data.camUrl);

    const canvas: HTMLCanvasElement | null = document.getElementById('videoCanvas') as HTMLCanvasElement | null;
    const ctx = canvas?.getContext('2d');

    try {
      if (this.ws.webSocketClient) {
        this.ws.webSocketClient.onmessage = (event) => {
          this.loading = false;
          const encodedFrame = event.data;
          const decodedFrame = atob(encodedFrame);
          const arrayBuffer = new Uint8Array(decodedFrame.length);

          for (let i = 0; i < decodedFrame.length; i++) {
            arrayBuffer[i] = decodedFrame.charCodeAt(i);
          }

          const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });
          const img = new Image();

          img.onload = () => {
            ctx?.drawImage(img, 0, 0, canvas?.width ?? 0, canvas?.height ?? 0);
          };

          img.src = URL.createObjectURL(blob);
        };

      }

    } catch (error) {
      console.error('WebSocket error:', error);
    }
  }

  ngOnDestroy(): void {
    if (this.ws.webSocketClient) {
      this.ws.webSocketClient.close();
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
