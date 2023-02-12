import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { CardModule } from '../card/card.module';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    CardModule,
    NgScrollbarModule,
    DragDropModule,
  ],
  exports: [DashboardComponent],
})
export class DashboardModule {}
