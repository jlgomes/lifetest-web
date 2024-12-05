import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProfileService } from "@core/domain/services/profile.service";
import { DialogModel } from '@core/domain/models/dialog-model';
import { FormErrorUtil } from "@core/infra/utils/form-error-util";
import { ErrorModel } from "@core/domain/models/error-model";
import { ProfileForm } from "@core/domain/forms/profile-form";
import { MenuCustomModel } from "@core/domain/models/menu-custom-model";
import { MenuService } from "@core/domain/services/menu.service";
import { AuthLocalStorageService } from "@core/domain/services/auth-local-storage.service";
import { menuNode } from '@core/domain/models/menu-node-model';
import { ToastService } from '@core/domain/services/toast.service';
import { TranslateService } from '@ngx-translate/core';
import { TypeToastEnum } from '@core/domain/enums/type-toast-enum';
import { ProfileModel } from '@core/domain/models/profile-model';


@Component({
  selector: 'app-clients-dialog-form',
  templateUrl: './profile-modal-form.component.html',
  styleUrls: ['./profile-modal-form.component.scss']
})
export class ProfileModalFormComponent implements OnInit {
  private profile!: ProfileModel;
  protected recoveryForm!: FormGroup;
  protected title!: string;
  protected disabled: boolean = false;
  protected isLoading: boolean = false;
  protected menus: menuNode[] = [];
  protected menuIds: Set<string> = new Set([]);
  protected routesIds: Set<string> = new Set([]);

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: DialogModel<ProfileModel>,
    private dialogRef: MatDialogRef<ProfileModalFormComponent>,
    private fb: FormBuilder,
    private _profileService: ProfileService,
    private _formErrorUtil: FormErrorUtil,
    private _menuService: MenuService,
    private _authLocalStorageService: AuthLocalStorageService,
    private _translate: TranslateService,
    private _toast: ToastService,
  ) {
    this.profile = data.element;
    this.recoveryForm = this.initForm();
    this.title = this.data?.title ?? "";
    this.disabled = this.data?.disabled ?? false;
  }

  ngOnInit(): void {
    this.view();
    this.getMenus();
  }

  initForm(): FormGroup {
    if (this.profile)
      return (this.recoveryForm = this.fb.group({
        name: [this.profile.name, [Validators.required]],
      }));
    else return (this.recoveryForm = this.fb.group({
      name: ['', [Validators.required]],
    }));
  }

  private view() {
    if (this.profile) {
      this.profile.routes.forEach((route) => {
        this.routesIds.add(route.id)
      });
      this.profile.menus.forEach((menu) => {
        this.menuIds.add(menu.id)
        if (menu.parent) {
          this.menuIds.add(menu.parent.id)
        }
      });
    }
  }

  protected onSubmit() {
    if (this._formErrorUtil.isInvalidForm(this.recoveryForm)) return;
    if (this.isLoading) return;
    const formValue: ProfileForm = {
      name: this.recoveryForm.value.name,
      status: true,
      menuIds: Array.from(this.menuIds),
      routesIds: Array.from(this.routesIds)
    }

    this.isLoading = true;
    if (this.profile) {
      this._profileService.update(this.profile.id, formValue).subscribe({
        next: (value) => {
          this.dialogRef.close();
          this.recoveryForm.reset();
          this._authLocalStorageService.updateProfile(value);
          this.isLoading = false;
          const toastMessage = this._translate.instant("toasts.edit-profile");
          this._toast.show(toastMessage, TypeToastEnum.SUCCESS);
        },
        error: (err: ErrorModel) => {
          this._formErrorUtil.errorHandle(err, this.recoveryForm);
          this.isLoading = false;
        }
      });
    } else {
      this._profileService.save(formValue).subscribe({
        next: () => {
          this.dialogRef.close();
          this.recoveryForm.reset();
          this.isLoading = false;
          const toastMessage = this._translate.instant("toasts.register-profile");
          this._toast.show(toastMessage, TypeToastEnum.SUCCESS);
        },
        error: (err: ErrorModel) => {
          this._formErrorUtil.errorHandle(err, this.recoveryForm);
          this.isLoading = false;
        }
      });
    }
  }

  private getMenus() {
    this._menuService.findAll().subscribe(value => {
      value.sort((a, b) => a.sort - b.sort);
      this.listNodes(value);
    })
  }

  private listNodes(menus: MenuCustomModel[]) {
    menus.forEach(menu => {
      let nodeItem: menuNode = { id: '', name: '' };
      nodeItem.id = menu.id;
      nodeItem.name = menu.name;
      if (menu.children.length > 0) {
        nodeItem.children = [];
        menu.children.forEach(submenu => {
          let subItem: menuNode = { id: '', name: '' };
          subItem.id = submenu.id;
          subItem.name = submenu.name;
          if (submenu.routers.length > 0) {
            subItem.children = [];
            submenu.routers.forEach(route => {
              let routeItem: menuNode = { id: '', name: '' };
              routeItem.id = route.id;
              routeItem.name = route.description;
              subItem.children?.push(routeItem);
            });
          }
          nodeItem.children?.push(subItem);
        });
      }
      this.menus.push(nodeItem);
    });
  }

  protected onAddMenu(valor: string) {
    this.menuIds.add(valor);
  }

  protected onAddRoute(valor: string) {
    this.routesIds.add(valor);
  }

  protected onRemoveMenu(valor: string) {
    this.menuIds.delete(valor);
  }

  protected onRemoveRoute(valor: string) {
    this.routesIds.delete(valor);
  }

  protected closeDialog() {
    this.dialogRef.close();
  }

}
