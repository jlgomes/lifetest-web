import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import {NgbDropdownConfig, NgbDropdownModule,} from '@ng-bootstrap/ng-bootstrap';
import {SharedModule} from '../../../shared.module';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {delay, map, Observable, startWith} from 'rxjs';
import {Title} from '@angular/platform-browser';
import {AuthLocalStorageService} from "@core/domain/services/auth-local-storage.service";
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {NotificationsButtonComponent} from '@shared/components/notifications-button/notifications-button.component';
import { appRoutes } from '@helpers/constants/path-rest-constants';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    MatIconModule,
    NgbDropdownModule,
    NgForOf,
    SharedModule,
    MatBadgeModule,
    TranslateModule,
    MatButtonModule,
    MatButtonModule,
    MatMenuModule,
    NotificationsButtonComponent
  ],
  providers: [NgbDropdownConfig],
})
export class ToolbarComponent implements OnInit {
  protected items: any[] = [];
  protected lang: string = "pt";
  $title: Observable<string>;
  username: string | null = JSON.parse(localStorage.getItem("user") + "").name;
  funcao: string | null = JSON.parse(localStorage.getItem("profile") + "").code;
  alerts: number = 0;

  constructor(
    private _authLocalStorageService: AuthLocalStorageService,
    private _translate: TranslateService,
    private _route: Router,
    public titleService: Title,
    configDropdown: NgbDropdownConfig
  ) {
    configDropdown.placement = 'bottom-left';
    this.$title = this._route.events.pipe(
      startWith(this._translate.instant(titleService.getTitle())),
      delay(0),
      map(() => this._translate.instant(titleService.getTitle()))
    );
  }

  /**
   * Method to exit the system
   * * logout()
   */
  logout(): void {
    this._authLocalStorageService.logOutSystem();
    this._route.navigate([appRoutes.LOGIN]);
  }

  /**
   * Method to change the system translation.
   * * selectLanguage()
   * @param value
   */
  selectLanguage(value: any): void {
    this._translate.setDefaultLang(value.lang);
    this._translate.use(value.lang);
  }

  ngOnInit(): void {
    this.lang = this._translate.currentLang;
    this.items = [
      {
        label: 'Nome Sobrenome',
        tooltip: 'Nome Sobrenome',
      },
      {
        label: 'Logout',
        command: () => {
          this.logout();
        },
      },
    ];
  }
}
