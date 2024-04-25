import { Component, Input, Output, EventEmitter, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-permission-dropdown',
  templateUrl: './permission-dropdown.component.html',
  styleUrls: ['./permission-dropdown.component.scss']
})
export class PermissionDropdownComponent {
  @Input() permissions: string[] = [];
  @Input() defaultPermission: string = '';
  @Output() permissionChanged = new EventEmitter<string>();

  isOpen: boolean = false;
  changedPermission: string = '';
  isArrowReversed: boolean = false;

  ngOnInit(): void {
    this.changedPermission = this.defaultPermission;
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
    this.isArrowReversed = this.isOpen;
  }

  selectItem(permission: string) {
    if (permission !== 'remove permission') {
      this.changedPermission = permission;
      this.permissionChanged.emit(permission);
    } else {
      // api to remove the permission
    }

    this.isOpen = false;
    this.isArrowReversed = this.isOpen;
  }

  @HostListener('document:click', ['$event'])
  clickOutsideDropdown(event: Event) {
    if (!this.isOpen) return;

    const targetElement = event.target as HTMLElement;
    if (!targetElement.closest('.permission-dropdown')) {
      this.isOpen = false;
      this.isArrowReversed = false;
    }
  }
}
