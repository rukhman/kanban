import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DashboardService } from '../dashboard.service';
import { Mode, Task, TransferFormData } from '../types';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  isButtonPressed = false;
  mode: Mode = 'create';
  task: Task | null = null;
  constructor(
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TransferFormData,
    private fb: FormBuilder,
    private dashboardService: DashboardService
  ) {}

  formState = this.fb.group({
    id: -1,
    name: ['', Validators.required],
    description: ['', Validators.required],
    status: ['new', Validators.required],
  });

  ngOnInit(): void {
    if (this.data?.mode) {
      this.mode = this.data.mode;
    }
    if (this.data?.task) {
      this.task = this.data.task;
      this.setForm(this.data.task);
    }
  }

  setForm(task: Task): void {
    this.formState.setValue(task);
    if (this.mode === 'edit' && task.status === 'process') {
      this.formState.get('name')?.disable();
      this.formState.get('description')?.disable();
    }
    if (this.mode === 'watch') {
      this.formState.disable();
    }
  }

  close() {
    this.dialogRef.close();
  }

  save(): void {
    this.isButtonPressed = true;
    if (this.formState.valid) {
      const status = this.formState.get('status')?.value || 'new';
      switch (status) {
        case 'new':
          this.dashboardService.deleteFromEverywhere((<Task>this.task)?.id);
          this.dashboardService.addTask(status, <Task>this.formState.value);
          break;
        case 'process':
          this.dashboardService.deleteFromEverywhere((<Task>this.task)?.id);
          this.dashboardService.addTask(status, <Task>this.formState.value);
          break;
        case 'done':
          this.dashboardService.deleteFromEverywhere((<Task>this.task)?.id);
          this.dashboardService.addTask(status, <Task>this.formState.value);
          break;
      }
      this.dialogRef.close();
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
