import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss'],
})
export class ConfirmEmailComponent implements OnInit {
  responseData: { Token: string; UserId: string };
  isLoading: boolean = true;
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.responseData = {
      Token: this.route.snapshot.queryParams['Token'],
      UserId: this.route.snapshot.queryParams['UserId'],
    };
    if (!this.responseData.Token || !this.responseData.UserId) {
      this.isLoading = false;
      Swal.fire('درخواست نامعتبر می باشد', 'عملیات با شکست مواجه شد!', 'error');
    }
    this.authService
      .ConfirmEmail(this.responseData.Token, this.responseData.UserId)
      .subscribe(
        () => {
          this.router.navigate(['/']);
          Swal.fire(
            'تبریک',
            '<p>حساب کاربری شما با موفقیت فعال شد</p><small>اکنون می توانید وارد حساب کاربری خود شوید</small>',
            'success'
          );
        },
        (err) => {
          this.router.navigate(['/']);
          Swal.fire('درخواست نامعتبر می باشد!', '', 'error');
        }
      );
  }
}
