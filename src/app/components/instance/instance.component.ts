import { Component, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SelectInstanceModalComponent } from '../modals/select-instance-modal/select-instance-modal.component';
import { SharedService } from '../../services/shared.service';
import { ProjectsService } from '../../services/projects.service';
// import { collapseAnimation, fadeInOnEnterAnimation } from "angular-animations";
import { Instance, ProjectDetails, History, ProjectDetailData } from '../../models/project.model';
import * as InstanceModel from '../../models/instance.model';
import { TrackerDrawComponent } from '../tracker-draw/tracker-draw.component'
import { InstanceTracker, InstanceTrackerDrawList, TrackerInformation } from '../../models/instance.model';
import { projectsDetailDummy } from '../../utils/projects-detail.dummy';
import { instanceDummy, instanceDummy_1, instanceTrackerDummy, instanceTrackerDrawDummy } from '../../utils/instance.dummy';
// import {Store} from '@ngrx/store';
// import {Store} from '@ngrx/Store'
import { BehaviorSubject } from 'rxjs';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-instance',
  templateUrl: './instance.component.html',
  styleUrls: ['./instance.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class InstanceComponent {
  @ViewChild('layoutFileInput') layoutFileInput!: ElementRef;
  @ViewChild('typoFileInput') typoFileInput!: ElementRef;
  @ViewChild('myCanvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit(): void {
    // Access the canvas context and draw the rectangle here
    const ctx = this.canvas.nativeElement.getContext('2d');
    if (ctx) {
      ctx.fillStyle = 'black';  // Set the background color to black
      ctx.fillRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);  // Fill the entire canvas with black
      ctx.fillStyle = 'white';  // Set the fill color for the rectangle
      ctx.fillRect(50, 50, 150, 100);  // Draw a white rectangle at position (50, 50) with width 150 and height 100
    }
  }
  isSidebarCollapsed: boolean = false;
  isHistoryCollapsed: boolean = false;
  isToggleChecked: boolean = false;
  showingCreateForm: boolean = false;
  isSelectInstanceModalOpen: boolean = false;
  isStep2flag: boolean = false;

  trackers_block_names: any[] = []
  trackers_block_names_right: any[] = []
  // trackerInformation: TrackerInformation[] = [
  //   {
  //     "tracker_id": 0,
  //     "name": "",
  //     "point_SW": [],
  //     "point_SE": [],
  //     "point_NW": [],
  //     "point_NE": []
  //   }
  // ]
  instanceTrackerDrawDummy: InstanceTrackerDrawList = {
    "trackers_count": 0,
    "slaves_count": 0,
    "possible_trackers_count": 0,
    "trackers": [],
    "possible_trackers": []
  }
  // step2Response = new BehaviorSubject<any>({})
  // step2ResponseObservable$ = this.step2Response.asObservable()
  instanceTrackers: InstanceTracker = {
    is_cardan: false,
    tracker_tags: [],
    tracker_tags_and_texts: []
  }

  currentSortField: string = '';
  isSortAscending: boolean = true;
  breadcrumbs: Array<{ label: string, url?: string }> = [];

  projectId: string | null = '';
  instanceId: string | null = '';
  ischecked: boolean = false;
  // project information
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

  projectDetail: ProjectDetailData = {
    projectDetails: this.projectDetails,
    instances: [],
    history: []
  };

  instancesInProject: Instance[] = [];

  // instance information
  instanceFiles: InstanceModel.InstanceFile[] = [];
  coordinateSets: InstanceModel.CoordinateSet[] = [];
  history: InstanceModel.History[] = [];
  instance: InstanceModel.Instance = {
    name: '',
    description: '',
    trackerWidth: 0,
    trackers: 0,
    bifila: 0,
    bracktrackingGroups: 0,
    files: [],
    coordinateSets: [],
    history: [],
  };

  tableColumns: string[] = ['Archivo', 'Creado', ''];
  translatedColumn: Record<string, string> = {
    'Archivo': 'fileName',
    'Creado': 'createdAt'
  }

  // step bar
  currentStep: number = 1;
  steps: number[] = [1, 2, 3, 4, 5, 6];
  stepCompletionStatus: boolean[] = [false, false, false, false, false, false];
  stepLabels: string[] = [
    '',
    'Carga de archivos',
    'Lectura de layout',
    'Lectura de topografia',
    'Cruzar los archivos',
    'Calcular backtracking',
    'Calcular pendiente'
  ];

  // file uploader
  layoutFileQueue: InstanceModel.FileQueueItem[] = [];
  typoFileQueue: InstanceModel.FileQueueItem[] = [];
  layoutFileError: boolean = false;
  typoFileError: boolean = false;

  // paginator
  totalPages: number = 1;
  page: number = 1;

  // variables retured from modal
  selectedInstanceFromModal: string = '';
  selectedFilesFromModal: InstanceModel.InstanceFile[] = [];

  constructor(
    private route: ActivatedRoute,
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
      this.projectId = params.get('projectId');
      this.instanceId = params.get('instanceId');
    });

    // Get project and instance information
    // if (this.projectId !== '' && this.instanceId !== '') {
    //   this.projectsService.getProjectDetail(this.projectId as string).subscribe((projectDetails) => {
    //     this.projectDetail = projectDetails;
    //     this.projectDetails = projectDetails.projectDetails;
    //   });

    //   this.projectsService.getInstance(this.projectId as string, this.instanceId as string).subscribe((instance) => {
    //     this.instance = instance;
    //     this.files = instance.files;
    //     this.history = instance.history;
    //   });

    //   // do breadcrumb and sidebar collapse
    // }

    this.projectDetail = projectsDetailDummy;
    this.projectDetails = projectsDetailDummy.projectDetails;
    this.instancesInProject = this.projectDetail.instances;

    this.instance = instanceDummy_1;

    this.instanceFiles = this.instance.files;
    this.history = this.instance.history;
    this.coordinateSets = this.instance.coordinateSets;

    this.breadcrumbs = [
      { label: 'Projects', url: '/projects' },
      { label: this.projectDetails.name, url: '/projects/' + this.projectId },
      { label: this.instance.name }
    ];

    this.isSidebarCollapsed = this.sharedService.getSidebarCollapseState();
  }

  startCalc() {
    this.showingCreateForm = !this.showingCreateForm;
  }

  downloadDoc() {

  }

  toggleHistoryCollapse() {
    this.isHistoryCollapsed = !this.isHistoryCollapsed;
  }

  toggleSidebarCollapse() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  onShare() {

  }

  onConfig() {

  }

  downloadFile() {

  }

  openSelectInstanceModal() {
    const modalRef = this.modalService.open(SelectInstanceModalComponent, {
      backdrop: 'static',
      centered: true,
      size: 'custom',
      windowClass: 'select-instance-modal'
    });

    modalRef.componentInstance.projectId = this.projectId;
    modalRef.componentInstance.instances = this.instancesInProject;

    modalRef.result.then(
      (result) => {
        this.selectedInstanceFromModal = result.selectedInstance;
        this.selectedFilesFromModal = result.selectedFiles;
      },
      (reason) => {
        console.log('The select-instance-modal dismissed with a reason: ', reason);
      }
    );
  }

  goToNextStep(): void {
    if (this.currentStep < this.steps.length) {
      if (this.currentStep === 2 && this.isStep2flag === false) {
        this.currentStep--
        this.isStep2flag = true
      }
      this.currentStep++; 
      if (this.currentStep === 2) {
        if (this.isStep2flag == true) {
          this.instanceTrackerDrawDummy = instanceTrackerDrawDummy;
          console.log(this.instanceTrackerDrawDummy, 'aaaaaa');
        } else
          this.instanceTrackers = instanceTrackerDummy;
        // this.projectsService.getInstanceID('ins5').subscribe((instanceTracker) => {
        //   this.instanceTrackers = instanceTracker;
        // })
      }
      // if(this.currentStep === 2 && this.isStep2flag == true) {
      //   // this.instanceTrackersDraw = instanceTrackerDrawDummy;

      // }
      if (this.currentStep === 3) {
        // if(this.isStep2flag == false) {
        //   this.currentStep = 2;
        //   this.isStep2flag = true;
        // }
      }
    }
  }
  onSelectedTrackers(item: any, d: string) {

    if (d == '1') {
      if (this.trackers_block_names?.includes(item)) {
        let _trackers_block_names = this.trackers_block_names.filter(i => i !== item);
        this.trackers_block_names = _trackers_block_names
      } else {
        this.trackers_block_names.push(item)
      }
    } else if (d == '2') {
      if (this.trackers_block_names_right?.includes(item)) {
        let _trackers_block_names = this.trackers_block_names_right.filter(i => i !== item);
        this.trackers_block_names_right = _trackers_block_names
      } else {
        this.trackers_block_names_right.push(item)
      }
    }
    this.updateStepCompletionStatus(2, this.trackers_block_names.length > 0 || this.trackers_block_names_right.length > 0);

  }
  goToPrevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  handleDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  handleDrop(event: DragEvent, target: string): void {
    event.preventDefault();
    event.stopPropagation();

    const files = event.dataTransfer?.files;
    if (!files || !files.length)
      return;

    if (target === 'layout') {
      if (files && files.length) {
        this.processFile(files[0], ['.dxf'], 'layout');
      }
    } else {
      for (let i = 0; i < files.length; i++) {
        this.processFile(files[i], ['.xls', '.xlsx', '.txt', '.csv'], 'typo');
      }
    }
  }

  onSingleFileChange(event: any): void {
    this.processFile(event.target.files[0], ['.dxf'], 'layout');
  }

  onMultipleFileChange(event: any): void {
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.processFile(files[i], ['.xls', '.xlsx', '.txt', '.csv'], 'typo');
    }
  }

  processFile(file: File, allowedFormats: string[], target: string): void {
    const isValidFormat = allowedFormats.some(format => file.name.toLowerCase().endsWith(format));
    const fileQueueItem: InstanceModel.FileQueueItem = {
      file: file,
      error: !isValidFormat,
      progress: 0
    };
    if (target === 'layout') {
      this.setLayoutFileQueue([...this.layoutFileQueue, fileQueueItem]);
    }
    else {
      this.setTypoFileQueue([...this.typoFileQueue, fileQueueItem]);
    }

    this.uploadFile(fileQueueItem);
  }

  uploadFile(fileQueueItem: InstanceModel.FileQueueItem): void {
    const progressInterval = setInterval(() => {
      if (fileQueueItem.progress < 100) {
        fileQueueItem.progress += 10;
      } else {
        clearInterval(progressInterval);
      }
    }, 20);
  }

  removeFile(fileQueueItem: InstanceModel.FileQueueItem, target: string): void {
    if (target === 'layout') {
      this.setLayoutFileQueue(this.layoutFileQueue.filter(item => item !== fileQueueItem));
      this.resetLayoutFileInput();
    } else {
      this.setTypoFileQueue(this.typoFileQueue.filter(item => item !== fileQueueItem));
    }
  }

  formatBytes(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  resetLayoutFileInput(): void {
    if (this.layoutFileInput)
      this.layoutFileInput.nativeElement.value = '';
  }

  cancel() {
    this.showingCreateForm = !this.showingCreateForm;
    this.currentStep = 1;
  }

  setLayoutFileQueue(value: InstanceModel.FileQueueItem[]) {
    this.layoutFileQueue = value;
    this.layoutFileError = this.layoutFileQueue.some(item => item.error === true);
    this.updateStepCompletionStatus(1, this.layoutFileQueue.length > 0 && this.typoFileQueue.length > 0 && !this.layoutFileError && !this.typoFileError);
    this.canAdvanceToNextStep();
  }

  setTypoFileQueue(value: InstanceModel.FileQueueItem[]) {
    this.typoFileQueue = value;
    this.typoFileError = this.typoFileQueue.some(item => item.error === true);
    this.updateStepCompletionStatus(1, this.layoutFileQueue.length > 0 && this.typoFileQueue.length > 0 && !this.layoutFileError && !this.typoFileError);
    this.canAdvanceToNextStep();
  }

  updateStepCompletionStatus(step: number, status: boolean): void {
    this.stepCompletionStatus[step - 1] = status;
  }

  canAdvanceToNextStep(): boolean {
    return this.stepCompletionStatus[this.currentStep - 1];
    // Check if all previous steps are completed
    if (this.currentStep !== 1) {
      for (let i = 0; i < this.currentStep - 1; i++) {
        if (!this.stepCompletionStatus[i]) {
          return false;
        }
      }
    }

    if (this.currentStep === 1) {
      return this.stepCompletionStatus[this.currentStep - 1];
    }

    // do here for the other steps
    return false;
  }

  sort(field: string): void {
    if (field === this.currentSortField) {
      this.isSortAscending = !this.isSortAscending;
    } else {
      this.isSortAscending = true;
    }

    this.currentSortField = field;

    this.instanceFiles.sort((a: InstanceModel.InstanceFile, b: InstanceModel.InstanceFile) => {
      const aValue = a[field as keyof InstanceModel.InstanceFile];
      const bValue = b[field as keyof InstanceModel.InstanceFile];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return this.isSortAscending ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      } else if (typeof aValue === 'number' && typeof bValue === 'number') {
        return this.isSortAscending ? aValue - bValue : bValue - aValue;
      } else {
        return 0;
      }
    });
  }


  didDrop(event: any) {
    const { todo, done } = event
    this.instanceTrackerDrawDummy.possible_trackers = [...done]
    this.instanceTrackerDrawDummy.trackers = [...todo]
  }

  toggleSwitch() {
    this.isToggleChecked = !this.isToggleChecked;
  }
}
