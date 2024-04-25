import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-permission-request-modal',
  templateUrl: './permission-request-modal.component.html',
  styleUrls: ['./permission-request-modal.component.scss']
})
export class PermissionRequestModalComponent {
  @Input() permissions: string[] = [];
  @Input() currentPermission: string = '';
  selectedPermission: string = '';
  description: string = '';

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.selectedPermission = this.currentPermission;
  }

  sendRequest() {
    if (this.selectedPermission !== this.currentPermission) {
      this.activeModal.close({ permission: this.selectedPermission, description: this.description });
    } else {
      console.error('Please select other permission');
    }
  }

  onItemSelected(selectedItem: string) {
    this.selectedPermission = selectedItem;
  }
}
