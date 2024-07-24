import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { custom_axios } from '../axious/AxiosSetup';
import { ApiConstants } from '../api/ApiConstants';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  signUpForm: FormGroup;

  constructor(private toastr: ToastrService, private router: Router) {
    this.signUpForm = new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    });
  }

  async SubmitSignUpForm() {
    if (this.signUpForm.invalid) {
      this.toastr.error('Please fill out all required fields.', 'Error');
      return;
    }

    if (this.signUpForm.value.password !== this.signUpForm.value.confirmPassword) {
      this.toastr.error('Passwords do not match.', 'Error');
      return;
    }

    try {
      const response = await custom_axios.post(ApiConstants.USER.SignUp(), {
        firstname: this.signUpForm.value.firstname,
        lastname: this.signUpForm.value.lastname,
        email: this.signUpForm.value.email,
        password: this.signUpForm.value.password
      });

      if (response.data) {
        this.toastr.success('Signup successful!', 'Success');
        this.signUpForm.reset();
        this.router.navigate(['/active']); // Navigate to 'active' route after successful signup
      }
    } catch (error) {
      this.toastr.error('Signup failed. Please try again later.', 'Error');
      console.error('Signup Error:', error);
    }
  }
}
