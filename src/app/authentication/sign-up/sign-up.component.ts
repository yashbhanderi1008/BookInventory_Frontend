import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUPComponent {
  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService, private router: Router) { }

  form!: FormGroup;
  submitted = false;
  error: string | null = null;
  userName!: string;
  password!: string;
  biography!: string;
  nationality!: string;

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      biography: ['', [Validators.required]],
      nationality: ['', [Validators.required]]
    });
  }
  ngOnChange() {
    console.log(this.error);

  }
  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.userName = this.form.value['userName'];
    this.password = this.form.value['password'];
    this.biography = this.form.value['biography'];
    this.nationality = this.form.value['nationality'];

    this.authService.register(this.userName, this.password, this.biography, this.nationality).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err) => {
        this.error = err.error.message
      },
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
}
