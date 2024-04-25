import { Component, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { ProjectsService } from '../../services/projects.service';
import { collapseAnimation, fadeInOnEnterAnimation } from "angular-animations";
import { ShareProjectModalComponent } from '../modals/share-project-modal/share-project-modal.component';
import { PermissionRequestModalComponent } from '../modals/permission-request-modal/permission-request-modal.component';
import { CreateInstanceModalComponent } from '../modals/create-instance-modal/create-instance-modal.component';
import { SuccessModalComponent } from '../modals/success-modal/success-modal.component';
import { ErrorModalComponent } from '../modals/error-modal/error-modal.component';
import { NgbModal, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { Instance, ProjectDetails, History, ProjectDetailData, ProjectMember } from '../../models/project.model';

import { projectsDetailDummy, projectsDetailDummy_1 } from '../../utils/projects-detail.dummy';
import { projectMembersDummy } from '../../utils/project-members.dummy';

type GeneralInfoKey = 'latitude' | 'longitude' | 'plantType' | 'power' | 'electronicType';
@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
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
export class ProjectDetailComponent {
  isSidebarCollapsed: boolean = false;
  isProjectConfigModalOpen: boolean = false;
  isProjectShareModalOpen: boolean = false;

  projectId: string | null = '';
  projectDetails: ProjectDetails = {
    name: "",
    description: "",
    latitude: 0,
    longitude: 0,
    plantType: "",
    trackerType: "",
    power: "",
    electronicType: ""
  };
  instances: Instance[] = [];
  histories: History[] = [];

  projectDetail: ProjectDetailData = {
    projectDetails: this.projectDetails,
    instances: [],
    history: []
  };

  tableColumns: string[] = ['Nombre', 'Descripción', 'Creador', 'Creado', 'Actualizado', 'Estado', ''];
  translatedColumn: Record<string, string> = {
    'Nombre': 'name',
    'Descripción': 'description',
    'Creador': 'creator',
    'Creado': 'createdDate',
    'Actualizado': 'updatedDate',
    'Estado': 'status'
  };


  generalInfoOrder: GeneralInfoKey[] = ['latitude', 'longitude', 'plantType', 'power', 'electronicType'];
  translatedGIColumn: Record<string, string> = {
    'latitude': 'Latitud',
    'longitude': 'Longitud',
    'plantType': 'Tipo de planta',
    'power': 'Potencia',
    'electronicType': 'Tipo electrónica'
  };

  projectMembers: ProjectMember[] = [];

  currentSortField: string = '';
  isSortAscending: boolean = true;

  permissions: string[] = ['Visor', 'Editor', 'Admin'];
  defaultPermission: string = 'Admin';
  // defaultPermission: string = 'Sin permiso';

  breadcrumbs: Array<{ label: string, url?: string }> = [];

  // pagination for instances and history
  page: number = 1;
  pageSize: number = 10;
  totalPages: number = 24000;

  his_page: number = 1;
  his_pageSize: number = 10;
  his_totalPages: number = 30;

  // checkbox
  selectedInstances: any[] = [];

  constructor(
    private route: ActivatedRoute,
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
    this.route.paramMap.subscribe(params => {
      this.projectId = params.get('id');
    });

    /**
     * get ProjectDetails information & shared members in this project
     */
    // if (this.projectId !== '') {
    //   this.projectsService.getProjectDetail(this.projectId as string).subscribe((projectDetails) => {
    //     this.projectDetail = projectDetails;
    //     this.projectDetails = projectDetails.projectDetails;
    //     this.instances = projectDetails.instances;
    //     this.histories = projectDetails.history;

    //     this.breadcrumbs = [
    //       { label: 'Projects', url: '/projects' },
    //       { label: this.projectDetails.name }
    //     ];

    //     this.isSidebarCollapsed = this.sharedService.getSidebarCollapseState();
    //   });

    //   this.projectsService.getProjectMembers(this.projectId as string).subscribe((projectMembers) => {
    //     this.projectMembers = projectMembers;
    //   });
    // }


    /**
     * fill up project details & project members by dummy (** delete after)
     */
    this.projectDetail = projectsDetailDummy;
    this.projectDetails = projectsDetailDummy.projectDetails;
    this.instances = projectsDetailDummy.instances;
    this.histories = projectsDetailDummy.history;

    this.breadcrumbs = [
      { label: 'Proyectos', url: '/projects' },
      { label: this.projectDetails.name }
    ];

    this.isSidebarCollapsed = this.sharedService.getSidebarCollapseState();

    this.projectMembers = projectMembersDummy;
    // this.projectMembers = [];
  }

  editInstance(id: string) {
    this.router.navigate(['/projects/', this.projectId, 'instances', id]);
  }

  downloadInstance(id: string) {

  }

  deleteInstance(id: string) {

  }

  getPropertyValue(instance: Instance, key: string): any {
    return instance[key as keyof Instance];
  }

  editProjectDetail(key: string, val: any) {

  }

  sort(field: string): void {
    if (field === this.currentSortField) {
      this.isSortAscending = !this.isSortAscending;
    } else {
      this.isSortAscending = true;
    }

    this.currentSortField = field;

    this.instances.sort((a: Instance, b: Instance) => {
      const aValue = a[field as keyof Instance];
      const bValue = b[field as keyof Instance];

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

  openProjectConfigModal() {
    this.isProjectConfigModalOpen = true;
  }

  openProjectShareModal() {
    const modalRef = this.modalService.open(ShareProjectModalComponent, {
      backdrop: 'static',
      centered: true,
      size: 'custom',
      windowClass: 'share-project-modal'
    });

    modalRef.componentInstance.projectId = this.projectId;
    modalRef.componentInstance.permissions = this.permissions;
    modalRef.componentInstance.defaultPermission = this.defaultPermission;
    modalRef.componentInstance.projectMembers = this.projectMembers;

    modalRef.result.then(
      (result) => {
        if (result.type === 'request_access') {
          this.accessRequest(this.defaultPermission, Number(this.projectId));
        }
      }
    );
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

          this.openSuccessModal().then();

          // this.openErrorModal(projectId, requestBody).then(
          //   (result) => {
          //     console.log('Error modal closed with result: ', result);
          //   },
          //   (reason) => {
          //     console.log('Error modal dismissed with reason: ', reason);
          //   }
          // );

          /**
           * Needs to be integrated with backend
           */
          // this.projectsService.accessRequest(projectId, requestBody).subscribe(
          //   (response) => {
          //     if (response?.success)
          //       this.openSuccessModal().then();
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

  closeProjectConfigModal() {
    this.isProjectConfigModalOpen = false;
  }

  onSearch(key: string) {

  }

  onFilter() {

  }

  onCreate() {
    const modalRef = this.modalService.open(CreateInstanceModalComponent, {
      centered: true,
      size: 'custom',
      windowClass: 'create-instance-modal'
    });
    modalRef.componentInstance.projectId = this.projectId;

    modalRef.result.then(
      (result) => {
        const instanceId = result;
        this.router.navigate(['/projects/', this.projectId, 'instances', instanceId]);
      },
      (reason) => {
        console.log('A modal dismissed');
      }
    );
  }

  toggleInstanceSelection(event: any, instanceId: string) {
    if (event.target.checked) {
      this.selectedInstances.push(instanceId);
    } else {
      this.selectedInstances = this.selectedInstances.filter(id => id !== instanceId);
    }
  }

  checkAllInstances(event: any) {
    if (event.target.checked) {
      this.selectedInstances = this.instances.map(instance => instance.id);
    } else {
      this.selectedInstances = [];
    }
}

  toggleSidebarCollapse() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
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
  openErrorModal(projectId: number, requestBody: any) {
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
}
