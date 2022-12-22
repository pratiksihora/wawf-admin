import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

// Services
import { AuthService } from 'src/app/api/services/auth/auth.service';

import { ApiAction } from 'src/app/shared/constants/models/api';
import { ApiModule } from 'src/app/api/enums/api-module.enum';
import { ApiUtil } from 'src/app/shared/_core/utils/api';
import { AUTH_API } from 'src/app/api/constants/auth/auth-api';
import { ChangeDetectorRef } from '@angular/core';
import { TokenUtil } from 'src/app/shared/_core/utils/token';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  // KeenThemes mock, change it to:
  defaultAuth: any = {
    email: 'admin@demo.com',
    password: 'demo',
  };
  loginForm: FormGroup;
  hasError: boolean;
  returnUrl: string;
  loading: boolean;

  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.initForm();
    // get return url from route parameters or default to '/'
    this.returnUrl =
      this.route.snapshot.queryParams['returnUrl'.toString()] || '/';
    document?.querySelectorAll('body')?.forEach((item) => {
      item.dataset.bg = "#1e1e2d";
    })
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.minLength(3),
          Validators.maxLength(320), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
        ]),
      ],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
    });
  }

  submit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.hasError = false;
    this.loading = true;
    const common: ApiAction = ApiUtil.configurePost({ module: ApiModule.API, url: AUTH_API.LOGIN })
    const loginSubscr = this.authService.authCommon(common, this.loginForm.value)
      .subscribe({
        next: (res) => {
          this.loading = false;
          TokenUtil.setUser(res.data);
          TokenUtil.setUniqueId(res.data.reseller_unique_id);
          TokenUtil.setAccessToken(res.data.token)
          this.router.navigate(['']);
          this.cdr.detectChanges();
        }, error: (err) => {
          console.log(err)
          this.loading = false;
          this.hasError = true;
          this.cdr.detectChanges();
        }
      });
    this.unsubscribe.push(loginSubscr);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
    document?.querySelectorAll('body')?.forEach((item) => {
      item.dataset.bg = "";
    })
  }
}
