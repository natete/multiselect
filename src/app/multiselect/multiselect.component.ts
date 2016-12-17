import {Component, Input, ChangeDetectionStrategy, EventEmitter} from '@angular/core';
import {MultiselectItem} from './multiselect-item.interface';
import {Output} from '@angular/core/src/metadata/directives';

@Component({
  selector: 'app-multiselect',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.scss']
})
export class MultiselectComponent {

  @Input() unselectedItems: Array<MultiselectItem> = [];
  @Input() selectedItems: Array<MultiselectItem> = [];
  @Output() onChangeSelection = new EventEmitter<Array<MultiselectItem>>();

  constructor() {
  }

  /**
   * Toggle highlight status of an unselected item. Takes into account shift key to
   * allow multiple selection.
   * @param item the item to be toggled.
   * @param event the click event.
   */
  toggleHighlightUnselectedItem(item: MultiselectItem, event: MouseEvent): void {
    this.toggleHighlightItem(item, event.shiftKey, this.unselectedItems);
  }

  /**
   * Toggle highlight status of an selected item. Takes into account shift key to
   * allow multiple selection.
   * @param item the item to be toggled.
   * @param event the click event.
   */
  toggleHighlightSelectedItem(item: MultiselectItem, event: MouseEvent): void {
    this.toggleHighlightItem(item, event.shiftKey, this.selectedItems);
  }

  /**
   * Adds the highlighted items to the selected array and emits the change event.
   */
  addHighlightedItems(): void {
    this.moveItems('unselectedItems', 'selectedItems');

    this.onChangeSelection.emit(this.selectedItems);
  }

  /**
   * Remove the highlighted items from the selected array and emits the change event.
   */
  removeHighlightedItems(): void {
    this.moveItems('selectedItems', 'unselectedItems');

    this.onChangeSelection.emit(this.selectedItems);
  }

  dropOnSelectedSuccess(event: MultiselectItem): void {
    console.log(event);
  }

  /**
   * Toggle highlight status of an item. Takes into account shift key to
   * allow multiple selection.
   * @param item the item to be toggled.
   * @param isShiftHold true if shift key was hold when the click event occurred.
   * @param items the array of items to which the clicked item belongs.
   */
  private toggleHighlightItem(item: MultiselectItem, isShiftHold: boolean, items: Array<MultiselectItem>): void {
    if (isShiftHold && !item.highlighted) {
      let filteredItems = items.filter((it) => it.highlighted || it === item);

      let initSelectionIndex = filteredItems.indexOf(item) - 1;
      let initSelectionItem = initSelectionIndex >= 0 ? filteredItems[initSelectionIndex] : items[0];

      let indexOfInitSelection = items.indexOf(initSelectionItem);
      let indexOfClicked = items.indexOf(item);

      items.forEach((it, index) => {
        if (index >= indexOfInitSelection && index <= indexOfClicked) {
          it.highlighted = true;
        }
      });
    } else {
      item.highlighted = !item.highlighted;
    }
  }

  /**
   * Moves the highlighted items from the source array to the target array.
   * @param sourceArray the name of the source array.
   * @param targetArray the name of the target array.
   */
  private moveItems(sourceArray: string, targetArray: string): void {
    this[targetArray] = this[targetArray].concat(this[sourceArray].filter((item) => item.highlighted));

    this[sourceArray] = this[sourceArray].filter((item) => !item.highlighted);

    this[targetArray].forEach((item) => item.highlighted = false);
  }
}
