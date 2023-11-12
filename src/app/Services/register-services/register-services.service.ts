import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RegisterServiceRespone } from 'src/app/Models/register-service/register-service-respone';
import { AppConfig } from 'src/app/config/AppConfig';

@Injectable({
  providedIn: 'root',
})
export class RegisterServicesService {
  constructor(private http: HttpClient, private router: Router) {}
  //lấy full đường dẫn
  private getFullUrl(endpoint: string): string {
    return `${AppConfig.baseUrl}/${endpoint}`;
  }
  registerService(register: any): Observable<void> {
    return this.http.post<void>(
      this.getFullUrl(`api/v1/register-service`),
      register
    );
  }
  getByUserId(id: number): Observable<RegisterServiceRespone[]> {
    return this.http.get<RegisterServiceRespone[]>(
      this.getFullUrl(`api/v1/register-service/${id}`)
    );
  }
}
