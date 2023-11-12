import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from 'src/app/config/AppConfig';

import { Observable, catchError, tap } from 'rxjs';
import { Service } from 'src/app/Models/service/service';
@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  constructor(private http: HttpClient, private router: Router) {}
  //lấy full đường dẫn
  private getFullUrl(endpoint: string): string {
    return `${AppConfig.baseUrl}/${endpoint}`;
  }
  getAllServices(): Observable<Service[]> {
    return this.http.get<Service[]>(this.getFullUrl(`api/v1/service`));
  }
}
