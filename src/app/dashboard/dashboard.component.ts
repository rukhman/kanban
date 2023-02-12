import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DashboardService } from '../dashboard.service';
import { FormComponent } from '../form/form.component';
import { Status, Task } from '../types';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  previousStatus: number | null = null;
  ngOnInit(): void {}
  constructor(
    private dialog: MatDialog,
    public dashboardService: DashboardService
  ) {}
  createTask(): void {
    this.dialog.open(FormComponent, {
      height: '60vh',
      width: '70vh',
      disableClose: true,
    });
  }

  drop(event: CdkDragDrop<Task[]>, status: number): void {
    if (!this.previousStatus || status < this.previousStatus) {
      return;
    }

    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.dashboardService.getCorrectStatusEverywhere();
    }
    this.previousStatus = null;
    this.dashboardService.saveState();
  }
}
