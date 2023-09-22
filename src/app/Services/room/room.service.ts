import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Room } from 'src/app/Models/room/room';
import { AppConfig } from 'src/app/config/AppConfig';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class RoomService {
  constructor(private http: HttpClient, private router: Router) {}
  listQuantity: number[] = [];
  //lấy full đường dẫn
  private getFullUrl(endpoint: string): string {
    return `${AppConfig.baseUrl}/${endpoint}`;
  }
  getAllRoomByRoomType_Id(id: number): Observable<Room[]> {
    return this.http.get<Room[]>(this.getFullUrl(`api/v1/room/${id}`));
  }
}
