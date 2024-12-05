import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { getMenuChildUtil } from "@core/infra/utils/get-menu-child-util";
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { appRoutes } from '@helpers/constants/path-rest-constants';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit {
  protected appRoutes = appRoutes;

  public cards: any[] = [];

  constructor(
    private _router: Router,
    private _translate: TranslateService,
    private titleService: Title,
  ) {
    const pageTitle = _translate.instant("page-title.control");
    this.titleService.setTitle(pageTitle);
  }

  ngOnInit(): void {
    getMenuChildUtil(this._router.url).forEach(menu => {
      this.cards.push(
        {
          label: `submenu.${menu.name}.title`,
          description: `submenu.${menu.name}.description`,
          routerLink: menu.path,
        }
      )
    });
  }
}
