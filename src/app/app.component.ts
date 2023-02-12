import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'kanban';

  constructor(private dashBoardService: DashboardService) {}
  ngOnInit() {
    this.dashBoardService.initApp();
  }
}
