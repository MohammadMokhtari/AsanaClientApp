import { environment } from './../../../../../environments/environment';
import { Component, Input, OnInit } from '@angular/core';
import { ProfileModel } from '../../models/profile.model';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss'],
})
export class ProfileDetailComponent implements OnInit {
  constructor() {}

  @Input() Account: ProfileModel | null;

  ngOnInit(): void {}
}
