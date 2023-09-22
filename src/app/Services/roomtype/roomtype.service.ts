import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Roomtype } from 'src/app/Models/roomtype/roomtype';
import { AppConfig } from 'src/app/config/AppConfig';

@Injectable({
  providedIn: 'root',
})
export class RoomtypeService {
  constructor(private http: HttpClient, private router: Router) {}
  //lấy full đường dẫn
  private getFullUrl(endpoint: string): string {
    return `${AppConfig.baseUrl}/${endpoint}`;
  }
  getAllRoomType(): Observable<Roomtype[]> {
    return this.http.get<Roomtype[]>(this.getFullUrl(`api/v1/roomtype`));
  }
  getRoomTypeById(id: number): Observable<Roomtype> {
    return this.http.get<Roomtype>(this.getFullUrl(`api/v1/roomtype/${id}`));
  }
}
