import { Injectable } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';


@Injectable({
  providedIn: 'root'
})
export class RegisterIconService {

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('profile-lt', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/profile.svg'));
    iconRegistry.addSvgIcon('article-lt', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/article.svg'));
    iconRegistry.addSvgIcon('user-image-lt', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/user-image.svg'));
    iconRegistry.addSvgIcon('cancel-lt', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/cancel.svg'));
    iconRegistry.addSvgIcon('ping-lt', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/display-ping.svg'));
    iconRegistry.addSvgIcon('led-lt', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/display-led.svg'));
    iconRegistry.addSvgIcon('return-lt', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/return.svg'));
    iconRegistry.addSvgIcon('bolt-lt', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/power-cycle.svg'));
    iconRegistry.addSvgIcon('barcode-lt', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/barcode.svg'));
    iconRegistry.addSvgIcon('toolbox-lt', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/toolbox.svg'));
    iconRegistry.addSvgIcon('info', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/info.svg'));
    iconRegistry.addSvgIcon('maintenance-led', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/maintenance-led.svg'));
    iconRegistry.addSvgIcon('maintenance-ping', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/maintenance-ping.svg'));
    iconRegistry.addSvgIcon('file-download', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/file-download.svg'));
    iconRegistry.addSvgIcon('circle-check', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/check-circle.svg'));
  }
}
