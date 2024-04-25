import { Component, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { collapseAnimation, fadeInOnEnterAnimation } from "angular-animations";
import { ProjectsService } from '../../../services/projects.service';
import * as InstanceModel from '../../../models/instance.model';
import { instanceDummy } from '../../../utils/instance.dummy';

@Component({
  selector: 'app-select-instance-modal',
  templateUrl: './select-instance-modal.component.html',
  styleUrls: ['./select-instance-modal.component.scss'],
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
export class SelectInstanceModalComponent {
  @Input() projectId: string = '';
  @Input() instances: any[] = [];

  isFileForm: boolean = false;
  selectedInstance: string = '';
  selectedFiles: string[] = [];

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

  constructor(
    public activeModal: NgbActiveModal,
    private projectsService: ProjectsService
  ) {}

  toggleInstanceId(event: any, selectedId: string) {
    this.selectedInstance = selectedId;
  }

  onSelectInstance() {
    // this.projectsService.getInstance(this.projectId, this.selectedInstance).subscribe(
    //   (response) => {
    //     this.instanceFiles = response.instanceFiles;
    //     this.isFileForm = true;
    //   },
    //   (error) => {
    //     console.log('error while requesting instance data: ', error);
    //   }
    // );

    this.instanceFiles = instanceDummy.files;
    this.isFileForm = true;
  }

  toggleFileId(event: any, fileId: string) {
    if (event.target.checked) {
      this.selectedFiles.push(fileId);
    } else {
      this.selectedFiles = this.selectedFiles.filter(id => id !== fileId);
    }
  }

  checkAllFiles(event: any) {
    if (event.target.checked) {
      this.selectedFiles = this.instanceFiles.map(file => file.id);
    } else {
      this.selectedFiles = [];
    }
  }

  onSelectFiles() {
    this.activeModal.close({
      selectedInstance: this.selectedInstance,
      selectedFiles: this.instanceFiles.filter(file => this.selectedFiles.includes(file.id)),
    });
  }

  closeModal() {

  }
}
