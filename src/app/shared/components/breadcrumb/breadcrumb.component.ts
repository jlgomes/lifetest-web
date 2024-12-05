import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent {
  @Input() breadcrumbTitle: string = '';
  @Input() route: string = '';
  @Input() subtitle: string = '';

  constructor(private _router: Router) {}

  navigateToRoute() {
    this._router.navigate([this.route]);
  }
}
