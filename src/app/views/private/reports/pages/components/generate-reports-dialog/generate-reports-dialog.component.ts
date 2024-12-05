import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogModel } from '@core/domain/models/dialog-model';

@Component({
  selector: 'app-generate-reports-dialog',
  templateUrl: './generate-reports-dialog.component.html',
  styleUrls: ['./generate-reports-dialog.component.scss']
})
export class GenerateReportsDialogComponent implements OnInit {
  recoveryForm!: FormGroup;
  id?: string;
  title!: string;
  subtitle?: string;
  disabled: boolean = false;
  selectOptionsProfile: any[] = [
    { id: 1, name: 'SEMANAL' },
    { id: 2, name: 'QUINZENAL' },
    { id: 3, name: 'MENSAL' },
    { id: 4, name: 'TRIMESTRAL' },
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    protected data: DialogModel<any>,
    private dialogRef: MatDialogRef<GenerateReportsDialogComponent>,
    private fb: FormBuilder,
  ) {
    this.recoveryForm = this.initForm();
    this.id = this.data?.id;
    this.title = this.data?.title ?? "";
    this.subtitle = this.data?.subtitle;
    this.disabled = this.data?.disabled ?? false;
  }

  initForm(): FormGroup {
    return (this.recoveryForm = this.fb.group({
      period: ['', [Validators.required]],
    }));
  }

  onSubmit(): void {

  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {

  }

}
