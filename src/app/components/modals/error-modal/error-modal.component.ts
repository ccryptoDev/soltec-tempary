import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.scss']
})
export class ErrorModalComponent {
  @Input() projectId: number = 0;
  @Input() requestBody: any = {};

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {

  }

  onResend() {

  }
}
