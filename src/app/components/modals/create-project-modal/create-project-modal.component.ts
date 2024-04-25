import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TitleStrategy } from '@angular/router';
import {collapseAnimation, fadeInOnEnterAnimation} from "angular-animations";
import { ProjectsService } from '../../../services/projects.service';

@Component({
  selector: 'app-create-project-modal',
  templateUrl: './create-project-modal.component.html',
  styleUrls: ['./create-project-modal.component.scss'],
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
export class CreateProjectModalComponent {
  @Input() isSidebarCollapsed: boolean = false;
  @Input() isModalOpen: boolean = false;
  @Output() closeModalEvent: EventEmitter<void> = new EventEmitter<void>();

  name: string = '';
  description: string = '';
  latitude: string = '';
  longitude: string = '';
  plantType: string = '';
  trackerType: string = '';
  power: string = '';
  electronicType: string = '';

  // validation variables
  nameRequired: boolean = true;
  descriptionRequired: boolean = true;
  latitudeRequired: boolean = true;
  longitudeRequired: boolean = true;
  plantTypeRequired: boolean = true;
  trackerTypeRequired: boolean = true;
  powerRequired: boolean = true;
  electronicTypeRequired: boolean = true;

  allValid: boolean = false;

  constructor(
    private projectService: ProjectsService,
    private router: Router
  ) {}

  createProject() {
    if (!this.allValid)
      return;

    const requestBody = {
      'name': this.name,
      'description': this.description,
      'latitude': this.latitude,
      'longitude': this.longitude,
      'plantType': this.plantType,
      'trackerType': this.trackerType,
      'power': this.power,
      'electronicTpye': this.electronicType,
    }

    const newProjectId = 5;
    this.router.navigate( ['/projects', newProjectId] );

    // this.projectService.createProject(requestBody).subscribe(
    //   (response) => {
    //     const projectDetail = response.body;
    //     const newProjectId = projectDetail.id;
    //     this.router.navigate( ['/projects', newProjectId] );
    //   },
    //   (error) => {
    //     console.error('The error while creating new project', error);
    //   }
    // );
  }

  onInputChange(value: string, inputName: string) {
    switch (inputName) {
      case 'name':
        this.name = value;
        this.nameRequired = this.name.trim() === '';
        break;
      case 'latitude':
        this.latitude = value;
        this.latitudeRequired = this.latitude.trim() === '';
        break;
      case 'longitude':
        this.longitude = value;
        this.longitudeRequired = this.longitude.trim() === '';
        break;
      case 'plantType':
        this.plantType = value;
        this.plantTypeRequired = this.plantType.trim() === '';
        break;
      case 'trackerType':
        this.trackerType = value;
        this.trackerTypeRequired = this.trackerType.trim() === '';
        break;
      case 'power':
        this.power = value;
        this.powerRequired = this.power.trim() === '';
        break;
      case 'electronicType':
        this.electronicType = value;
        this.electronicTypeRequired = this.electronicType.trim() === '';
        break;
    }

    if (!this.nameRequired && !this.descriptionRequired && !this.latitudeRequired && !this.longitudeRequired &&
        !this.plantTypeRequired && !this.trackerTypeRequired && !this.powerRequired && !this.electronicTypeRequired) {
      this.allValid = true;
    }
  }

  onDescriptionChange(value: string) {
    this.description = value;
    this.descriptionRequired = this.description.trim() === '';
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.closeModalEvent.emit();
  }
}
