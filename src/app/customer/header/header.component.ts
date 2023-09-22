import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  isLogin: boolean = false;
  ngOnInit(): void {
    if (localStorage.getItem('accessToken')) {
      this.isLogin = true;
    }
  }
  handleLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
