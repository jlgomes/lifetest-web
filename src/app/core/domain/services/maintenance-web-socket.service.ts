import { Injectable } from '@angular/core';
import { MaintenanceTelemetryForm } from '../forms/maintenance-telemetry-form';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceWebSocketService {
  protected slots: MaintenanceTelemetryForm[] = [];

  constructor() {
  }

  scan(): void {
    this.slots = [];
    const numbersOfRacks = 2;
    const numberOfSlots = 48;
    for (let i = 1; i <= numbersOfRacks; i++) {
      const position = i;
      for (let j = 1; j <= numberOfSlots; j++) {
        // Put 0 on the left at slot names under 10
        let number = (j < 10) ? `0${j}` : `${j}`;
        const slot: MaintenanceTelemetryForm = {
          slot: number,
          position: position,
          tempSensor: (Math.random() < 0.992),
          heater: (Math.random() < 0.992),
          camera: (Math.random() < 0.992),
        }
        this.slots.push(slot);
      }
    }
  }

  getTelemetry(): MaintenanceTelemetryForm[] {
    this.scan();
    return this.slots;
  }
}
