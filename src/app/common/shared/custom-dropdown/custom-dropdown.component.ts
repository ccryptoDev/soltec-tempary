import { Component, Input, Output, EventEmitter, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-custom-dropdown',
  templateUrl: './custom-dropdown.component.html',
  styleUrls: ['./custom-dropdown.component.scss']
})
export class CustomDropdownComponent implements OnInit{
  @Input() items: string[] = [];
  @Input() defaultItem: string = '';
  @Output() itemSelected = new EventEmitter<string>();

  isOpen: boolean = false;
  selectedItem: string = '';
  isArrowReversed: boolean = false;

  ngOnInit(): void {
    this.selectedItem = this.defaultItem;
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
    this.isArrowReversed = this.isOpen;
  }

  selectItem(item: string) {
    this.selectedItem = item;
    this.itemSelected.emit(item);

    this.isOpen = false;
    this.isArrowReversed = this.isOpen;
  }

  @HostListener('document:click', ['$event'])
  clickOutsideDropdown(event: Event) {
    if (!this.isOpen) return;

    const targetElement = event.target as HTMLElement;
    if (!targetElement.closest('.custom-dropdown')) {
      this.isOpen = false;
      this.isArrowReversed = false;
    }
  }
}
