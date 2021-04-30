import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SigninRequestPayload} from './signin.request.payload';
import {AuthService} from '../shared/auth.service';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {throwError} from 'rxjs';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  loginForm: FormGroup;
  signingRequestPayload: SigninRequestPayload;
  registerSuccessMessage: string;
  isError: boolean;


  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute, private router: Router, private toastr: ToastrService) {
    this.signingRequestPayload = {
      username: '',
      password: ''
    };
  }


  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

    this.activatedRoute.queryParams
      .subscribe(params => {
        if (params.registered !== undefined && params.registered === 'true') {
          this.toastr.success('Signup Successful');
          this.registerSuccessMessage = 'Please Check your inbox for activation email '
            + 'activate your account before you Login!';
        }
      });
  }

  login() {

    this.signingRequestPayload.username=this.loginForm.get('username' ).value;
    this.signingRequestPayload.password=this.loginForm.get('password' ).value;

    this.authService.signin(this.signingRequestPayload).subscribe(data => {
      this.isError = false;
      this.router.navigateByUrl('');
      this.toastr.success('Login Successful');
    }, error => {
      this.isError = true;
      throwError(error);
    });
  }
}
