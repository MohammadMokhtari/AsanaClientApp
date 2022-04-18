import { User } from './../../../../../modules/auth/models/user';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-top-header-user-area',
  templateUrl: './top-header-user-area.component.html',
  styleUrls: ['./top-header-user-area.component.scss'],
})
export class TopHeaderUserAreaComponent implements OnInit, OnDestroy {
  private userSub: Subscription;

  isAuthenticated: boolean = false;
  user: User | null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userSub = this.authService.CurrentUser.subscribe((user) => {
      this.isAuthenticated = !!user;
      this.user = user;
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
