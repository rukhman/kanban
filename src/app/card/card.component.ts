import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DashboardService } from '../dashboard.service';
import { FormComponent } from '../form/form.component';
import { Status, Task } from '../types';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  color = '#F3C300';
  __status: Status = 'new';
  @Input() set status(status: Status) {
    switch (status) {
      case 'new':
        this.color = '#F3C300';
        break;
      case 'process':
        this.color = '#EA7645';
        break;
      case 'done':
        this.color = '#6DBC69';
        break;
    }
    this.__status = status;
  }
  get status(): Status {
    return this.__status;
  }
  @Input() task: Task | null = null;

  constructor(
    private dialog: MatDialog,
    private dashboardService: DashboardService
  ) {}
  edit(): void {
    this.dialog.open(FormComponent, {
      height: '60vh',
      width: '70vh',
      disableClose: true,
      data: {
        mode: 'edit',
        task: this.task,
      },
    });
  }

  delete(): void {
    if (this.task && this.status) {
      this.dashboardService.deleteFromState(this.status, this.task);
    }
  }

  watch(): void {
    this.dialog.open(FormComponent, {
      height: '60vh',
      width: '70vh',
      disableClose: true,
      data: {
        mode: 'watch',
        task: this.task,
      },
    });
  }
}
