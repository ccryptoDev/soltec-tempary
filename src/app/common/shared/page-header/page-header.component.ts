import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent {
  @Input() pageName: string = '';
  @Input() description: string = '';
  @Output() search = new EventEmitter<string>();
  @Output() filter = new EventEmitter<void>();
  @Output() create = new EventEmitter<void>();

}
