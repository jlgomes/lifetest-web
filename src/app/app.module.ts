import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { PrivateModule } from './views/private/private.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { provideHotToastConfig } from "@ngneat/hot-toast";

import { Injector, APP_INITIALIZER } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LOCATION_INITIALIZED } from '@angular/common';
import { Language, LanguageService } from '@core/domain/services/language.service';
import { provideEnvironmentNgxMask } from 'ngx-mask';

export function appInitializerFactory(translate: TranslateService, injector: Injector) {
  return () => new Promise<any>((resolve: any) => {
    const locationInitialized = injector.get(LOCATION_INITIALIZED, Promise.resolve(null));
    locationInitialized.then(() => {
      const languageService = new LanguageService(translate);
      const lang: Language = languageService.getLanguage() ?? 'pt';
      translate.setDefaultLang(lang)
      translate.use(lang).subscribe(() => {
        console.info(`Successfully initialized '${lang}' language.'`);
      }, err => {
        console.error(`Problem with '${lang}' language initialization.'`);
      }, () => {
        resolve(null);
      });
    });
  });
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    NgbModule,
    PrivateModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    provideHotToastConfig(),
    provideEnvironmentNgxMask(),
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [TranslateService, Injector],
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})

export class AppModule {
  constructor() {
  }
}

