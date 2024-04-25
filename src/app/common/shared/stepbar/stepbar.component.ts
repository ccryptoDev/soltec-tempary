import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stepbar',
  templateUrl: './stepbar.component.html',
  styleUrls: ['./stepbar.component.scss']
})
export class StepbarComponent {
  @Input() currentStep: number = 1;
  @Input() steps: number[] = [];
  @Input() labels: string[] = [];
}
