import { Component, Input, ElementRef, EventEmitter, Output } from '@angular/core';
import {collapseAnimation, fadeInOnEnterAnimation} from "angular-animations";
import { ProjectsService } from '../../../services/projects.service';

@Component({
  selector: 'app-project-config-modal',
  templateUrl: './project-config-modal.component.html',
  styleUrls: ['./project-config-modal.component.scss'],
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
export class ProjectConfigModalComponent {
  @Input() isSidebarCollapsed: boolean = false;
  @Input() isModalOpen: boolean = false;
  @Input() projectDetail: any = {};
  @Input() projectId: string | null = '';
  @Output() closeModalEvent: EventEmitter<void> = new EventEmitter<void>();

  name: string = '';
  description: string = '';
  latitude: number = 0;
  longitude: number = 0;
  plantType: string = '';
  trackerType: string = '';
  power: string = '';
  electronicType: string = '';

  constructor(
    private el: ElementRef,
    private projectService: ProjectsService
  ) {}

  ngOnInit(): void {
    this.initializeUserData();
  }

  exitWithoutSave() {
    this.initializeUserData();
    this.closeModal();
  }

  exitWithSave() {
    const requestBody = {
      name: this.name,
      description: this.description,
      latitude: this.latitude,
      longitude: this.longitude,
      plantType: this.plantType,
      trackerType: this.trackerType,
      power: this.power,
      electronicType: this.electronicType
    }

    this.closeModal();

    // this.projectService.updateProjectDetail(this.projectId, requestBody).subscribe(
    //   (response) => {

    //   },
    //   (error) => {

    //   }
    // );
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.closeModalEvent.emit();
  }

  initializeUserData() {
    this.name = this.projectDetail.name;
    this.description = this.projectDetail.description;
    this.latitude = this.projectDetail.latitude;
    this.longitude = this.projectDetail.longitude;
    this.plantType = this.projectDetail.plantType;
    this.trackerType = this.projectDetail.trackerType;
    this.power = this.projectDetail.power;
    this.electronicType = this.projectDetail.electronicType;
  }
}
