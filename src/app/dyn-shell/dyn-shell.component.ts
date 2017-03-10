import { Component, ViewChild, NgZone } from '@angular/core';
import { MdSidenav } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';

import { MenuItem } from './shared/dyn-menu-item.model';
import { AuthService } from '../dyn-auth/shared/dyn-auth.service';

const MENUITEMS: MenuItem[] = [
  { name: 'Customers', link: '/customers', icon: 'face' }
];

@Component({
  selector: 'shell',
  templateUrl: './dyn-shell.component.html',
  styleUrls: ['./dyn-shell.component.scss'],
})

export class ShellComponent {

  @ViewChild('dynsidebar') public dynSideBar : MdSidenav;
  menuitems = MENUITEMS;
  isLoggedIn = false;

  constructor(iconRegistry: MdIconRegistry, sanitizer: DomSanitizer, private auth: AuthService, private _ngZone: NgZone) {
    iconRegistry.addSvgIcon('face', sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/face.svg'));
    iconRegistry.addSvgIcon('event', sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/event.svg'));
    iconRegistry.addSvgIcon('save', sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/save.svg'));
    iconRegistry.addSvgIcon('facebook', sanitizer.bypassSecurityTrustResourceUrl('assets/img/facebook-box.svg'));
    iconRegistry.addSvgIcon('twitter', sanitizer.bypassSecurityTrustResourceUrl('assets/img/twitter.svg'));
    iconRegistry.addSvgIcon('google', sanitizer.bypassSecurityTrustResourceUrl('assets/img/google.svg'));

    auth.getAuthenticated().subscribe(e => this.isLoggedIn = e);

    window.onresize = (e) => {
      this.checkMenu();
    };
    this.checkMenu();
  }

  onNotifyClicked(message: String): void {
    console.log('clicked');

    this.dynSideBar.toggle();
  } 

  checkMenu() {
    this._ngZone.run(() => {
      if (this.dynSideBar){
        var w = window.innerWidth;
        if (w > 768) {
          this.dynSideBar.mode = "side";
        } else {
          this.dynSideBar.mode = "over";
        }
      }
    });
  }
}