import { Component, Input } from '@angular/core';
import { GenericObject } from '@shared/types/generic-object-type';
import _ from 'lodash';


@Component({
  selector: 'app-attribute-table',
  templateUrl: './attribute-table.component.html',
  styleUrls: ['./attribute-table.component.scss']
})
export class AttributeTableComponent {
  @Input() data!: GenericObject;

  isObject(item: GenericObject): boolean {
    return _.isObject(item);
  }

}
