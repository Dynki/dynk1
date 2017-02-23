import { EventEmitter, Injectable } from '@angular/core';

import { BreadcrumbItem } from '../shared/dyn-breadcrumb.model';
/**
 * A service provides functions to get and set the breadcrumb of the app
 */
@Injectable()
export class BreadcrumbService {
  items: BreadcrumbItem[] = [];

  public breadcrumbChanged: EventEmitter<BreadcrumbItem[]> = new EventEmitter<BreadcrumbItem[]>();

  getBreadcrumb(): BreadcrumbItem[] {
    return this.items;
  }

  setBreadcrumb(breadcrumb: BreadcrumbItem[]): void {
    this.items = breadcrumb;
    this.breadcrumbChanged.next(this.items);
  }

}