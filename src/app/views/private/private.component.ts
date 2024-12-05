import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { RegisterIconService } from '@core/domain/services/register-icon.service';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss'],
})
export class PrivateComponent implements OnInit {
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _iconRegister: RegisterIconService,
    @Inject(PLATFORM_ID)
    private _platformId: object
  ) {}

  ngOnInit(): void {
    const { redirectAfterRender = '' } = this._route.snapshot.data;
    if (redirectAfterRender && isPlatformBrowser(this._platformId)) {
      this._router.navigate([redirectAfterRender]);
    }
  }
}
