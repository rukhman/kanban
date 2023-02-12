import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { FormModule } from './form/form.module';
import { DashboardService } from './dashboard.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardModule,
    FormModule,
    BrowserAnimationsModule,
    MatDialogModule,
  ],
  bootstrap: [AppComponent],
  providers: [DashboardService],
})
export class AppModule {}
