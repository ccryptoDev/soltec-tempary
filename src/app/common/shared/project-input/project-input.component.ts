import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-project-input',
  templateUrl: './project-input.component.html',
  styleUrls: ['./project-input.component.scss']
})
export class ProjectInputComponent implements AfterViewInit{
  @Input() name: string = '';
  @Input() value: string = '';
  @Input() error: boolean = false;
  @Input() placeholder: string = '';
  @Output() valueChange = new EventEmitter<string>();
  @Output() focus = new EventEmitter<void>();
  @Output() blur = new EventEmitter<void>();

  @ViewChild('inputField') inputField!: ElementRef;

  ngAfterViewInit() {

  }

  constructor(private el: ElementRef) {}

  onInputFocus() {

  }

  onInputBlur() {

  }

  onInputChange(value: string) {
    this.valueChange.emit(value);
  }
}
