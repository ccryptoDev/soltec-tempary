import { Component, Input, EventEmitter, Output } from '@angular/core';
import { BreadcrumbService } from '../../../services/breadcrumb.servce';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {
  @Input() breadcrumbs: Array<{ label: string, url?: string }> = [];
  @Input() currentPath: string = '';
  @Output() shareBtnEvent = new EventEmitter<void>();
  @Output() configBtnEvent = new EventEmitter<void>();

  constructor(private breadcrumbService: BreadcrumbService) {
    this.breadcrumbs = this.breadcrumbService.breadcrumbs;
  }

  onShareBtn() {
    this.shareBtnEvent.emit();
  }

  onConfigBtn() {
    this.configBtnEvent.emit();
  }
}
