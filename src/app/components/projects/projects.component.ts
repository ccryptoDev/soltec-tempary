import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { ProjectsService } from '../../services/projects.service';
import { Project } from '../../models/project.model';
import { collapseAnimation, fadeInOnEnterAnimation } from "angular-animations";
import { NgbModal, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { PermissionRequestModalComponent } from '../modals/permission-request-modal/permission-request-modal.component';
import { SuccessModalComponent } from '../modals/success-modal/success-modal.component';
import { ErrorModalComponent } from '../modals/error-modal/error-modal.component';
import { CreateProjectModalComponent } from '../modals/create-project-modal/create-project-modal.component';
import { ActiveColumnDirective } from '../../utils/active-column.directive';
import { ArrowPosition } from '../../common/tooltip/tooltip.enums';
import { projectsDummy } from '../../utils/projects.dummy';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    fadeInOnEnterAnimation({
      duration: 400,
      delay: 120
    }),
    fadeInOnEnterAnimation({
      anchor: 'enter',
      duration: 750
    }),
    collapseAnimation()
  ],
})
export class ProjectsComponent {
  isSidebarCollapsed: boolean = false;
  isCreateProjectModalOpen: boolean = false;

  projects: Project[] = [];
  permissions: string[] = ['Admin', 'Visor', 'Editor', 'Sin permiso'];
  tableColumns: string[] = ['Nombre', 'Descripción', 'Creador', 'Fecha de creación', 'Actualizado', 'Permiso', ''];
  translatedColumn: Record<string, string> = {
    'Nombre': 'name',
    'Descripción': 'description',
    'Creador': 'creator',
    'Fecha de creación': 'createdDate',
    'Actualizado': 'updatedDate',
    'Permiso': 'permission'
  }

  currentSortField: string = '';
  isSortAscending: boolean = true;

  ArrowPosition: typeof ArrowPosition = ArrowPosition;

  // pagination parameters
  page: number = 1;
  pageSize: number = 10;
  totalPages: number = 24000;

  constructor(
    private router: Router,
    private sharedService: SharedService,
    private projectsService: ProjectsService,
    private modalService: NgbModal
  ) {
    this.sharedService.toggleCollapse.subscribe(() => {
      this.toggleSidebarCollapse();
    });
  }

  ngOnInit(): void {
    // this.projectsService.getProjects().subscribe((projects) => {
    //   this.projects = projects;
    // });
    this.projects = projectsDummy;
    this.isSidebarCollapsed = this.sharedService.getSidebarCollapseState();
  }

  editProject(projectId: number) {
    this.router.navigate(['/projects', projectId]);
  }

  accessRequest(permission: string, projectId: number) {
    const modalRef = this.modalService.open(PermissionRequestModalComponent, {
      centered: true,
      size: 'custom',
      windowClass: 'access-request-modal'
    });
    modalRef.componentInstance.permissions = this.permissions;
    modalRef.componentInstance.currentPermission = permission;

    modalRef.result.then(
      (result) => {
        if (result) {
          const requestBody = {
            reason: result.description,
            permission: result.permission,
          };

          this.openSuccessModal().then(
            (result) => {
              console.log('Success modal closed with result: ', result);
            },
            (reason) => {
              console.log('Success modal dismissed with reason: ', reason);
            }
          );

          // this.openErrorModal(projectId, requestBody).then(
          //   (result) => {
          //     console.log('Error modal closed with result: ', result);
          //   },
          //   (reason) => {
          //     console.log('Error modal dismissed with reason: ', reason);
          //   }
          // );

          // commented for now
          // this.projectsService.accessRequest(projectId, requestBody).subscribe(
          //   (response) => {
          //     if (response?.success)
          //       this.openSuccessModal();
          //     else
          //       this.openErrorModal(projectId, requestBody);
          //   },
          //   (error) => {
          //     console.error('Error sending access request: ', error);
          //   }
          // );
        }
      },
      (reason) => {
        console.log('Modal dismissed with reason: ', reason);
      }
    );
  }

  openSuccessModal() {
    const successModalRef = this.modalService.open(SuccessModalComponent, {
      centered: true,
      size: 'custom',
      windowClass: 'success-modal custom-modal-center'
    });

    return successModalRef.result;
  }

  openErrorModal(projectId: number, requestBody: any) {
    const errorModalRef = this.modalService.open(ErrorModalComponent, {
      centered: true,
      size: 'custom',
      windowClass: 'error-modal custom-modal-center'
    });

    errorModalRef.componentInstance.projectId = projectId;
    errorModalRef.componentInstance.requestBody = requestBody;

    return errorModalRef.result;
  }

  downloadProject(project: Project) {

  }

  deleteProject(project: Project) {

  }


  paginate(event: any): void {

  }

  sort(field: string): void {
    if (field === this.currentSortField) {
      this.isSortAscending = !this.isSortAscending;
    } else {
      this.isSortAscending = true;
    }

    this.currentSortField = field;

    this.projects.sort((a: Project, b: Project) => {
      const aValue = a[field as keyof Project];
      const bValue = b[field as keyof Project];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return this.isSortAscending ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      } else if (typeof aValue === 'number' && typeof bValue === 'number') {
        return this.isSortAscending ? aValue - bValue : bValue - aValue;
      } else {
        // Handle other data types or mixed types if necessary
        return 0;
      }
    });
  }

  getPropertyValue(project: Project, key: string): any {
    return project[key as keyof Project];
  }

  onCreate() {
    this.isCreateProjectModalOpen = true;
  }

  closeCreateProjectModal() {
    this.isCreateProjectModalOpen = false;
  }

  onSearch(key: string) {

  }

  onFilter() {

  }

  onPageChange(page: number) {
    this.page = page;
  }

  toggleSidebarCollapse() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}
