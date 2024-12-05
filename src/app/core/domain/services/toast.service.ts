import {Injectable} from '@angular/core';
import {TypeToastEnum} from "@core/domain/enums/type-toast-enum";
import {HotToastService} from "@ngneat/hot-toast";

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private _toast: HotToastService) {
  }


  show(
    message: string,
    type: TypeToastEnum,
  ) {
    switch (type) {
      case TypeToastEnum.SUCCESS:
        this._toast.success(message);
        break;
      case TypeToastEnum.INFO:
        this._toast.info(message);
        break;
      case TypeToastEnum.ERROR:
        this._toast.error(message);
        break;
      case TypeToastEnum.WARNING:
        this._toast.warning(message);
        break;
    }


  }
}
