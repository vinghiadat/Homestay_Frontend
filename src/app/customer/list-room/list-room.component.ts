import { Component } from '@angular/core';
import { Roomtype } from 'src/app/Models/roomtype/roomtype';
import { RoomtypeService } from 'src/app/Services/roomtype/roomtype.service';

@Component({
  selector: 'app-list-room',
  templateUrl: './list-room.component.html',
  styleUrls: ['./list-room.component.css'],
})
export class ListRoomComponent {
  listRoomType: Roomtype[] = [];
  constructor(private roomTypeService: RoomtypeService) {}
  getAllRoomType(): void {
    this.roomTypeService.getAllRoomType().subscribe({
      next: (response: any) => {
        this.listRoomType = response;
        console.log(this.listRoomType);
      },
      error: (error) => {
        if (error.status === 401) {
          console.log('Thất bại');
        }
      },
    });
  }
  ngOnInit(): void {
    this.getAllRoomType();
  }
}
