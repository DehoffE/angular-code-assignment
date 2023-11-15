import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from "@angular/core";
import { CategoriesFilterValueItem } from "./types";

@Component({
  selector: 'app-categories-filter',
  templateUrl: 'categories-filter.component.html',
  styleUrls: ['categories-filter.component.scss']
})
export class CategoriesFilterComponent {
  @Input() placeholder = '';
  @Input() filters: CategoriesFilterValueItem[] | null = [];
  @Input() emptyValue: CategoriesFilterValueItem = {
    label: 'Не выбрано',
    value: null
  };

  @Output() valueSelected = new EventEmitter<CategoriesFilterValueItem>();

  @HostListener('window:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpened = false;
    }
  }

  selectedFilter: CategoriesFilterValueItem | undefined;
  isOpened = false;

  constructor(private readonly elementRef: ElementRef) {}

  onClickFilterField(): void {
    this.isOpened = !this.isOpened;
  }

  onSelectValue(filter: CategoriesFilterValueItem): void {
    this.isOpened = false;
    this.selectedFilter = this.selectedFilter?.value === filter.value ? this.emptyValue : filter;
    this.valueSelected.emit(this.selectedFilter);
  }
}
