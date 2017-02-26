import { Component, Output, EventEmitter } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MdIconRegistry} from '@angular/material';

@Component({
  selector: 'dyn-toolbar',
  templateUrl: './dyn-toolbar.component.html',
  styleUrls: ['./dyn-toolbar.component.css']
})

export class ToolbarComponent {

  @Output() notify: EventEmitter<string> = new EventEmitter<string>();

  constructor(iconRegistry: MdIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('thumbs-up', sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/exit.svg'));
    iconRegistry.addSvgIcon('menu', sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/menu.svg'));
  }

  onClick(): void {
    this.notify.emit('toggle sidebar');
  }
}
