import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthValidation } from '../../../utils/auth-validation';
import { ProjectsService } from '../../../services/projects.service';
import { ProjectMember } from '../../../models/project.model';
import { SuccessModalComponent } from '../success-modal/success-modal.component';
import { ErrorModalComponent } from '../error-modal/error-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PermissionRequestModalComponent } from '../permission-request-modal/permission-request-modal.component';

@Component({
  selector: 'app-share-project-modal',
  templateUrl: './share-project-modal.component.html',
  styleUrls: ['./share-project-modal.component.scss']
})
export class ShareProjectModalComponent {
  @Input() projectId: string = '';
  @Input() permissions: [] = [];
  @Input() defaultPermission: string = '';
  @Input() projectMembers: ProjectMember[] = [];

  selectedPermission: string = '';

  isValid: boolean = false;
  email: string = '';

  emailRequired: boolean = true;
  emailFormatError: boolean = true;

  constructor(
    public activeModal: NgbActiveModal,
    private projectService: ProjectsService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.selectedPermission = this.defaultPermission;
  }

  requestAccess() {
    this.activeModal.close({
      type: 'request_access'
    });
  }

  onShare() {
    if (this.emailRequired && this.emailFormatError)
      return;

    const requestBody = {
      email: this.email,
      permission: this.selectedPermission
    };

    /**
     * Commented until integrated with backend
     */
    // this.projectService.shareProjectMembers(this.projectId, requestBody).subscribe(
    //   (response) => {
    //     if (response.success) {  // in case of success
    //       const newMember = response.body;
    //       this.openSuccessModal().then(
    //         (result) => {
    //           // Update members list after sharing successfully
    //           this.projectMembers.push(newMember);

    //           // Initialize email and permission after sharing a project
    //           this.email = '';
    //           this.selectedPermission = this.defaultPermission;
    //           this.emailRequired = true;
    //           this.emailFormatError = true;
    //         }
    //       );
    //     } else { // in case of error
    //       /**
    //        * confirm the logic in case of error
    //        */
    //       this.openErrorModal(this.projectId, requestBody);
    //     }
    //   },
    //   (error) => {
    //     console.error('Error while sharing a project: ', error);
    //     // this.openErrorModal(this.projectId, requestBody);
    //   }
    // );

    this.openSuccessModal().then(
      (result) => {
        // Update members list after sharing successfully
        this.projectMembers.push({
          profileImg: '',
          firstName: 'Mario',
          lastName: 'Ayerve',
          permission: this.selectedPermission
        });

        // Initialize email and permission after sharing a project
        this.email = '';
        this.selectedPermission = this.defaultPermission;
        this.emailRequired = true;
        this.emailFormatError = true;
      }
    );

  }

  updateEmailValidation() {
    this.emailRequired = this.email.trim() === '';
    this.emailFormatError = AuthValidation.validateEmail(this.email) === false;
  }

  onItemSelected(selectedItem: string) {
    this.selectedPermission = selectedItem;
  }

  permissionChanged(changedPermission: string) {
    console.log(changedPermission);
    // do logic when asking for changing permission in case of the shared user
    // it should call the service to change the permission of the shared user
  }

  openSuccessModal() {
    const modalRef = this.modalService.open(SuccessModalComponent, {
      backdrop: 'static',
      centered: true,
      size: 'custom',
      windowClass: 'success-modal custom-modal-center'
    });

    return modalRef.result;
  }

  /**
   * Need to confirm the logic in case of Error
   */
  openErrorModal(projectId: string, requestBody: any) {
    const errorModalRef = this.modalService.open(ErrorModalComponent, {
      centered: true,
      size: 'custom',
      windowClass: 'error-modal custom-modal-center'
    });

    errorModalRef.componentInstance.projectId = projectId;
    errorModalRef.componentInstance.requestBody = requestBody;

    errorModalRef.result.then(
      (result) => {
        console.log('Success modal closed with result: ', result);
      },
      (reason) => {
        console.log('Error modal dismissed with reason: ', reason);
      }
    );
  }

  onClose() {
    this.activeModal.close({
      type: 'clicked_cross'
    });
  }
}
