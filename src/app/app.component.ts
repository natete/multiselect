import {Component} from '@angular/core';
import {MultiselectItem} from './multiselect/multiselect-item.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  unselectedItems: Array<MultiselectItem> = [
    { id: 1, value: 'Asset Type' },
    { id: 2, value: 'Author' },
    { id: 3, value: 'Color depth' },
    { id: 5, value: 'Bitrate' },
    { id: 6, value: 'Language' },
    { id: 7, value: 'Number of pages' },
    { id: 8, value: 'License' }
  ];

  selectedItems: Array<MultiselectItem> = [
    { id: 4, value: 'Size' }
  ];

  onChangeSelection(selected: Array<MultiselectItem>): void {
    this.selectedItems = selected;
  }
}
