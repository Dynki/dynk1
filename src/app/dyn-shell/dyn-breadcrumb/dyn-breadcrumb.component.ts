import { Component } from "@angular/core";
import "rxjs/add/operator/filter";

import { BreadcrumbItem } from '../shared/dyn-breadcrumb.model';
import { BreadcrumbService } from './dyn-breadcrumb.service';

@Component({
  selector: "dyn-breadcrumb",
  templateUrl: './dyn-breadcrumb.component.html'
})
export class BreadcrumbComponent {

  breadcrumbs: BreadcrumbItem[];

  constructor(
    private breadcrumbService: BreadcrumbService
  ) {
    this.breadcrumbService.breadcrumbChanged.subscribe(breadcrumb => { this.breadcrumbs= breadcrumb })
  }
}