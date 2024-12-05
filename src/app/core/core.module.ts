import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientService } from '@core/infra/http/http-client-service';

@NgModule({
  imports: [HttpClientModule],
  exports: [HttpClientModule],
  providers: [
    HttpClientService,
  ],
})
export class CoreModule {}
