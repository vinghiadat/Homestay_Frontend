import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user/user';
import { UserService } from 'src/app/Services/user/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  form: any;
  constructor(
    fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this.form = fb.group({
      username: ['', [Validators.required]],
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      birthday: ['', [Validators.required]],
      gender: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    if (localStorage.getItem('accessToken')) {
      this.router.navigate(['/home']);
    }
  }
  onSignUp() {
    this.userService.signUp(
      new User(
        null,
        this.form.value.username,
        this.form.value.name,
        this.form.value.password,
        this.form.value.phone,
        this.form.value.email,
        this.form.value.gender,
        this.form.value.birthday
      )
    ).subscribe({
      next: (response: void) => {
        Swal.fire("Thành công",'Đăng ký thành công','success');
        this.form.reset();
      },
      error: (error) => {
Swal.fire("Thất bại",error.error.message,'error')
      }
    })
  }
}
