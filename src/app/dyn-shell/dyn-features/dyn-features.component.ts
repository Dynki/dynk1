import { Component, OnInit } from "@angular/core";
import { Injectable }              from '@angular/core';
import { Http, Response }          from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router }      from '@angular/router';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { DynFeature } from './shared/dyn-feature.model';

@Component({
  selector: "dyn-home",
  templateUrl: './dyn-features.component.html',
  styleUrls: ['./dyn-features.component.scss']
})

export class FeaturesComponent implements OnInit {

    private featuresUrl = './app/dyn-shell/dyn-features/shared/dyn-features.json';  // URL to web API
    private features: DynFeature[];
 
    constructor (private http: Http, private router: Router) {}
   
    ngOnInit(){
      this.getFeatures().subscribe(features => this.features = features);
    }

    getFeatures (): Observable<DynFeature[]> {
        return this.http.get(this.featuresUrl)
                     .map(this.extractData)
                     .catch(this.handleError);
    }

    goHome(){
      this.router.navigate(['/']);
    }

    private extractData(res: Response) {
 
      let body = res.json();
      return body.data || { };
    }
 
    private handleError (error: Response | any) {
      // In a real world app, we might use a remote logging infrastructure
      let errMsg: string;
      if (error instanceof Response) {
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      } else {
        errMsg = error.message ? error.message : error.toString();
      }
      console.error(errMsg);
      return Observable.throw(errMsg);
    }
}