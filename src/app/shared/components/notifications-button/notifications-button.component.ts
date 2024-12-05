import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { NotificationCustomHeaderModel } from "@core/domain/models/notification-custom-header-model";
import { NotificationWebSocketService } from "@core/domain/services/notification-web-socket.service";
import { CommonModule, NgForOf } from "@angular/common";
import { NotificationSlotModel } from '@core/domain/models/notification-slot-model';
import { TranslateModule } from '@ngx-translate/core';
import { NotificationDatePipe } from './pipes/notification-date.pipe';
import { Router } from '@angular/router';
import { appRoutes } from '@helpers/constants/path-rest-constants';

@Component({
  selector: 'app-notifications-button',
  templateUrl: './notifications-button.component.html',
  styleUrls: ['./notifications-button.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatBadgeModule,
    NgForOf,
    TranslateModule,
    NotificationDatePipe,
  ],
})
export class NotificationsButtonComponent implements OnInit, OnDestroy {
  private notificationWebSocketService!: NotificationWebSocketService;
  public notifications?: NotificationCustomHeaderModel;

  constructor(private _router: Router) {}

  ngOnInit(): void {
    this.notificationWebSocketService = new NotificationWebSocketService((data) => {
      this.notifications = data;
    });
  }

  ngOnDestroy(): void {
    this.notificationWebSocketService?.stop();
  }

  pingErrorList(data: NotificationSlotModel) {
    const pings: (boolean | undefined)[] = [
      data.slot.test?.lastPingError?.pingP1,
      data.slot.test?.lastPingError?.pingP2,
      data.slot.test?.lastPingError?.pingP3,
      data.slot.test?.lastPingError?.pingP4,
    ];

    const errorPorts = pings
      .map((ping, index) => (ping ? null : `P${index + 1}`))
      .filter(Boolean);

    return errorPorts.join(', ');
  }

  ledErrorList(data: NotificationSlotModel) {
    const leds: string[] = [];

    if (!data.slot.test?.lastLedError?.ledPower)
      leds.push('Power');
    if (!data.slot.test?.lastLedError?.led2G)
      leds.push('2G');
    if (!data.slot.test?.lastLedError?.led5G)
      leds.push('5G');

    return leds.join(', ');
  }

  navigateToNotifications() {
    this._router.navigate([appRoutes.NOTIFICATIONS]);
  }
}
