import { Component, ViewChild } from '@angular/core';
import { MdSidenav } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';

import { MenuItem } from './shared/dyn-menu-item.model';

const MENUITEMS: MenuItem[] = [
  { name: 'Customers', link: '/customers', icon: 'face' }
];

@Component({
  selector: 'shell',
  templateUrl: './dyn-shell.component.html',
  styleUrls: ['./dyn-shell.component.css'],
})

export class ShellComponent {

  @ViewChild('dynsidebar') public dynSideBar : MdSidenav;
  menuitems = MENUITEMS;

  constructor(iconRegistry: MdIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('face', sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/face.svg'));
    iconRegistry.addSvgIcon('event', sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/event.svg'));
    iconRegistry.addSvgIcon('save', sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/save.svg'));
  }

  onNotifyClicked(message: String): void {
    console.log('clicked');

    this.dynSideBar.toggle();
  }  
}

