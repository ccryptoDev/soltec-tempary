import { Component, Input, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectsService } from '../../../services/projects.service';

@Component({
  selector: 'app-create-instance-modal',
  templateUrl: './create-instance-modal.component.html',
  styleUrls: ['./create-instance-modal.component.scss']
})
export class CreateInstanceModalComponent {
  @Input() projectId: string = '';

  name: string = '';
  description: string = '';

  nameRequired: boolean = true;
  descriptionRequired: boolean = true;

  constructor(
    public activeModal: NgbActiveModal,
    private projectService: ProjectsService
  ) { }

  onNameChange(name: string) {
    this.name = name;
    this.nameRequired = this.name.trim() === '';
  }

  onDescriptionChange(value: string) {
    this.description = value;
    this.descriptionRequired = this.description.trim() === '';
  }

  createInstance() {
    if (this.nameRequired && this.descriptionRequired)
      return;

    const requestBody = {
      name: this.name,
      description: this.description
    };

    // return instanceID after creating instance
    this.activeModal.close('1');
    // this.projectService.createInstance(this.projectId, requestBody).subscribe(

    // );
  }
}
