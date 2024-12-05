import { Component, Input, OnInit } from '@angular/core';
import { GenericObject } from '@shared/types/generic-object-type';
import _ from 'lodash';

// Object attributes are database relationships.
// Changes in the current object doesn't mean that
// the relationship attributes would change (it would be a brand new event).
// So there is no need to show nested objects in the comparison

@Component({
  selector: 'app-comparison-table',
  templateUrl: './comparison-table.component.html',
  styleUrls: ['./comparison-table.component.scss']
})
export class ComparisonTableComponent implements OnInit {
  @Input() public oldData!: GenericObject;
  @Input() public newData!: GenericObject;
  protected keys!: string[];

  ngOnInit(): void {
    this.keys = Object.keys(this.newData);
  }

  // Deep object comparison implemented if needed in the future
  isItemDifferent(key: string): boolean {
    if (this.isObject(this.newData[key]) && this.isObject(this.oldData[key])) {
      return !_.isEqual(this.newData[key], this.oldData[key])
    } else {
      return this.newData[key] !== this.oldData[key];
    }
  }

  isObject(item: GenericObject): boolean {
    return _.isObject(item);
  }
}
