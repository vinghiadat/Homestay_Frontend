import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, tap } from 'rxjs';
import { Auth } from 'src/app/Models/auth/auth';
import { AppConfig } from 'src/app/config/AppConfig';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  //lấy full đường dẫn
  private getFullUrl(endpoint: string): string {
    return `${AppConfig.baseUrl}/${endpoint}`;
  }

  //Lấy role
  getRoles(username: string): Observable<string[]> {
    return this.http.get<string[]>(
      this.getFullUrl(`api/v1/user/role/${username}`)
    );
  }

  //set user gán giá trị dùng trong lúc đang nhập thành công
  setUsername(username: string): void {
    localStorage.setItem('username', JSON.stringify(username));
  }

  //get user 
  getUsername(): string {
    const userString = localStorage.getItem('username');
    return userString != null ? JSON.parse(userString) : null;
  }

  //đăng xuất
  logout(): void {
    
      localStorage.removeItem('username');
      localStorage.removeItem('accessToken');
  }

  //đăng nhập
  login(auth: Auth): void {
    this.http
      .post(this.getFullUrl('api/v1/user/login'), auth)
      .pipe(
        tap((response: any) => {
          console.log(response);
          if (response.accessToken) {
            //Lưu trữ user nếu cần dùng
            this.setUsername(auth.getUsername());
            // lưu trữ token
            localStorage.setItem('accessToken', response.accessToken);
            //Kiểm duyệt vai trò
            this.getRoles(auth.getUsername()).subscribe((roles) => {
              if (roles.includes('CUSTOMER')) {
                this.router.navigate(['/home']);
              } else {
                this.router.navigate(['/admin']);
              }
            });
          }
        }),
        catchError((error) => {
          if (error.status === 401) {
            console.log('Thất bại');
          }
          throw error;
        })
      )
      .subscribe();
  }
}
