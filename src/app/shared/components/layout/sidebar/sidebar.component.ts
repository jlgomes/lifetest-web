import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {Component, OnInit} from '@angular/core';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {NgbDropdownConfig, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SharedModule} from 'src/app/shared/shared.module';
import {AuthLocalStorageService} from "@core/domain/services/auth-local-storage.service";
import {MenuModel} from "@core/domain/models/menu-model";
import { ThemeService } from '@core/domain/services/theme.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    NgForOf,
    RouterLink,
    MatIconModule,
    NgbModule,
    SharedModule,
    RouterLinkActive,
    TranslateModule
  ],
  providers: [NgbDropdownConfig],
})
export class SidebarComponent implements OnInit {
  protected menus: any[] = [];
  protected tab: number = 0;
  protected rota: string = "";
  protected isExpanded: boolean = false;

  constructor(
    private _translate: TranslateService,
    private _authLocalStorageService: AuthLocalStorageService,
    private _themeService:ThemeService,
    configDropdown: NgbDropdownConfig,
  ) {
    configDropdown.placement = 'right';
  }

  ngOnInit(): void {
    const {profile} = this._authLocalStorageService.getAllLocalStorage();
    profile?.menus
      .filter(menu => menu.type == 'MENU')
      .sort((a, b) => a.sort - b.sort)
      .forEach((menu: MenuModel) => {
        this.menus.push({
          svg: menu.svg,
          label: `sidebar.${menu.name}`,
          icon: menu.icon,
          routerLink: menu.path,
        });
      });
  }

  isLightMode(): boolean {
    return this._themeService.isLightMode();
  }

  toggleThemeMode(): void {
    this._themeService.toggleThemeMode();
  }
}
