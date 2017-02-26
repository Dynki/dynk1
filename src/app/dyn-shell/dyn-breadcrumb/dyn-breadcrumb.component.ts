import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, NavigationEnd, Params, PRIMARY_OUTLET } from "@angular/router";
import "rxjs/add/operator/filter";

interface IBreadcrumb {
  label: string;
  params: Params;
  url: string;
}

@Component({
  selector: "dyn-breadcrumb",
  templateUrl: './dyn-breadcrumb.component.html',
  styleUrls: ['./dyn-breadcrumb.component.css']
})

export class BreadcrumbComponent implements OnInit {

  breadcrumbs: IBreadcrumb[];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    // this.breadcrumbService.breadcrumbChanged.subscribe(breadcrumb => { this.breadcrumbs = breadcrumb })
    this.breadcrumbs = [];
  }

  ngOnInit(){
    const ROUTE_DATA_BREADCRUMB: string = "breadcrumb";

    //subscribe to the NavigationEnd event
    this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
      //set breadcrumbs
      let root: ActivatedRoute = this.activatedRoute.root;
      this.breadcrumbs = this.getBreadcrumbs(root);
    });
  }

  private getBreadcrumbs(route: ActivatedRoute, url: string="", breadcrumbs: IBreadcrumb[]=[]): IBreadcrumb[] {
    const ROUTE_DATA_BREADCRUMB: string = "breadcrumb";

    //get the child routes
    let children: ActivatedRoute[] = route.children;

    //return if there are no more children
    if (children.length === 0) {
      return breadcrumbs;
    }

    //iterate over each children
    for (let child of children) {
      //verify primary route
      if (child.outlet !== PRIMARY_OUTLET) {
        continue;
      }

      //get the route's URL segment
      let routeURL: string = child.snapshot.url.map(segment => segment.path).join("/");

      url = '';

      for (let childUrl of child.snapshot.url){
        url += '/' + childUrl.path;


        //add breadcrumb
        let breadcrumb: IBreadcrumb = {
          label: child.snapshot.data['parents'].indexOf(childUrl.path) > -1 ? childUrl.path : child.snapshot.data['breadcrumb'],
          params: child.snapshot.params,
          url: url
        };
        breadcrumbs.push(breadcrumb);
      }

      //recursive
      return breadcrumbs;
    }
  }

}