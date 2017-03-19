import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../dyn-auth/shared/dyn-auth.service';

@Component({
  selector: 'dyn-userprofile-banner',
  templateUrl: './dyn-userprofile-banner.component.html',
  styleUrls: ['./dyn-userprofile-banner.component.scss']
})

export class UserProfileBannerComponent implements OnInit {

  username: string;

  constructor(public authService: AuthService) {
  }

  ngOnInit(){
    this.username = this.authService.currentUserName;

  }

}
