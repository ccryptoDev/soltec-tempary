import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-auth-input',
  templateUrl: './auth-input.component.html',
  styleUrls: ['./auth-input.component.scss'],
})
export class AuthInputComponent implements AfterViewInit{
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() name: string = '';
  @Input() value: string = '';
  @Input() error: boolean = false;
  @Output() valueChange = new EventEmitter<string>();
  @Output() focus = new EventEmitter<void>();
  @Output() blur = new EventEmitter<void>();
  @Output() passwordChange = new EventEmitter<string>();
  @Output() emailChange = new EventEmitter<string>();
  @Output() firstnameChange = new EventEmitter<string>();
  @Output() lastnameChange = new EventEmitter<string>();

  showPassword: boolean = true;
  @ViewChild('inputField') inputField!: ElementRef;
  @ViewChild('placeholderLabel') placeholderLabel!: ElementRef;

  ngAfterViewInit() {
    this.updatePlaceholderCoverWidth();
  }

  constructor(private el: ElementRef) {}

  onInputFocus() {
    const placeholder = this.el.nativeElement.querySelector('.placeholder');
    placeholder?.classList.add('active');
    this.updatePlaceholderCoverWidth();
  }

  onInputBlur() {
    const placeholder = this.el.nativeElement.querySelector('.placeholder');
    if (!this.value) {
      placeholder?.classList.remove('active');
      this.inputField?.nativeElement.classList.remove('existLetter');
    } else {
      if (!this.inputField.nativeElement.classList.contains('existLetter')) {
        this.inputField.nativeElement.classList.add('existLetter');
      }
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    this.type = this.showPassword ? 'password' : 'text';
  }

  updatePlaceholderCoverWidth() {
    const inputWidth = this.inputField.nativeElement.offsetWidth;
    const labelWidth = this.placeholderLabel.nativeElement.offsetWidth;
    const placeholderCoverWidth = inputWidth - labelWidth - 18;
    const placeholderCover = this.el.nativeElement.querySelector('.placeholder-cover');
    if (placeholderCover) {
      placeholderCover.style.width = `${placeholderCoverWidth}px`;
    }
  }

  onInputChange(value: string) {
    this.valueChange.emit(value);

    if (this.type === 'password') {
      this.passwordChange.emit(value);
    } else if (this.name == 'email') {
      this.emailChange.emit(value);
    } else if (this.name == 'firstname') {
      this.firstnameChange.emit(value);
    } else if (this.name == 'lastname') {
      this.lastnameChange.emit(value);
    }
  }
}
