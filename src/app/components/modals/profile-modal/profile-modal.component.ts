import { Component, Input, ElementRef, EventEmitter, Output, HostListener } from '@angular/core';
import {collapseAnimation, fadeInOnEnterAnimation} from "angular-animations";
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-profile-modal',
  templateUrl: './profile-modal.component.html',
  styleUrls: ['./profile-modal.component.scss'],
  animations: [
    fadeInOnEnterAnimation({
      duration: 650,
      delay: 200
    }),
    fadeInOnEnterAnimation({
      anchor: 'enter',
      duration: 750
    }),
    collapseAnimation()
  ],
})
export class ProfileModalComponent {
  @Input() isSidebarCollapsed: boolean = false;
  @Input() isModalOpen: boolean = false;
  @Input() userData: any = {};
  @Output() closeModalEvent: EventEmitter<void> = new EventEmitter<void>();

  firstName: string = '';
  lastName: string = '';
  email: string = '';
  bio: string = '';
  oldPassword: string = '';
  newPassword: string = '';
  showOldPassword: boolean = false;
  showNewPassword: boolean = false;

  constructor(private el: ElementRef, private authService: AuthService) { }

  // @HostListener('document:click', ['$event'])
  // onDocumentClick(event: Event): void {
  //   if (!this.el.nativeElement.contains(event.target)) {
  //     this.closeModal();
  //   }
  // }

  ngOnInit(): void {
    this.initializeUserData();
  }

  toggleOldPasswordVisibility() {
    this.showOldPassword = !this.showOldPassword;
  }

  toggleNewPasswordVisibility() {
    this.showNewPassword = !this.showNewPassword;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.closeModalEvent.emit();
  }

  exitWithoutSave() {
    this.initializeUserData();
    this.oldPassword = '';
    this.newPassword = '';
    this.closeModal();
  }

  exitWithSave() {
    const user = {
      'name': this.firstName,
      'lastName': this.lastName,
      'bio': this.bio,
      'oldPassword': this.oldPassword,
      'newPassword': this.newPassword
    }

    this.closeModal();

    // this.authService.updateProfile(user).subscribe(
    //   (response) => {
    //     // do something
    //     this.closeModal();
    //   },
    //   (error) => {
    //     console.log('Error while updating user profile: ', error);
    //   }
    // );
  }

  initializeUserData() {
    this.firstName = this.userData.firstName;
    this.lastName = this.userData.lastName;
    this.email = this.userData.email;
    this.bio = this.userData.bio;
  }

  get modalClasses(): string {
    return this.isSidebarCollapsed ? 'profile-modal custom-modal-full-height sidebarCollapsed' : 'profile-modal custom-modal-full-height';
  }
}
