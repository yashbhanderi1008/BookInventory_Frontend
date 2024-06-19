import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthenticationService, private tokenService: TokenService) { }

  form!: FormGroup;
  submitted = false;
  error: string | null = null;
  roles: string[] = ['User', 'Admin'];
  userName!: string;
  password!: string;
  role!: string;

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      role: ['User']
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.userName = this.form.value['userName']
    this.password = this.form.value['password']
    this.role = this.form.value['role']

    if (this.role === 'User') {
      this.authService.loginAuthor(this.userName, this.password).subscribe({
        next: (response) => {
          this.tokenService.setToken(response.data);
        },
        error: (err) => {
          this.error = err.error.message
        }
      })
    } else {
      this.authService.loginAdmin(this.userName, this.password).subscribe({
        next: (response) => {
          this.tokenService.setToken(response.data)
          this.router.navigate(['/pages/admin'])
        },
        error: (err) => {
          this.error = err.error.message
        }
      })
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
}
