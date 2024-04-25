import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  toggleCollapse = new EventEmitter<void>();
  sidebarCollapsed: boolean = false;

  setSidebarCollapseState(state: boolean) {
    this.sidebarCollapsed = state;
    // this.toggleCollapse.emit();
  }

  getSidebarCollapseState(): boolean {
    return this.sidebarCollapsed;
  }
}
