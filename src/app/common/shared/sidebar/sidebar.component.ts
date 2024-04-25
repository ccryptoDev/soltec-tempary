import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../services/shared.service';
import { AuthService } from '../../../services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfileModalComponent } from '../../../components/modals/profile-modal/profile-modal.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  isSidebarCollapsed: boolean = false;
  isProfileModalOpen: boolean = false;
  userData: any = {};

  constructor(
    private router: Router,
    private sharedService: SharedService,
    private modalService: NgbModal,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    // this.userData = JSON.parse(this.authService.getUserProfile() as string);
    this.userData = {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@email.com",
      "bio": "product owner"
    };
  }

  onToggleCollapse() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
    this.sharedService.setSidebarCollapseState(this.isSidebarCollapsed);
    this.sharedService.toggleCollapse.emit();
  }

  openProfileModal() {
    this.isProfileModalOpen = true;
  }

  closeProfileModal() {
    this.isProfileModalOpen = false;
  }

  clickMenu(menuItem: string) {
    this.router.navigate(['/projects']);
  }
}
