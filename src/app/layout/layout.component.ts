import { Component, EventEmitter, Output } from '@angular/core';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  isSidebarCollapsed: boolean = false;

  constructor(private sharedService: SharedService) {}

  ngOnInit() {
    this.sharedService.toggleCollapse.subscribe(() => {
      this.onToggleSidebarCollapse();
    });
  }

  onToggleSidebarCollapse() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}
