import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from 'src/app/Models/room/room';
import { Roomtype } from 'src/app/Models/roomtype/roomtype';
import { ImageService } from 'src/app/Services/image/image.service';
import { RoomService } from 'src/app/Services/room/room.service';
import { RoomtypeService } from 'src/app/Services/roomtype/roomtype.service';

@Component({
  selector: 'app-roomdetails',
  templateUrl: './roomdetails.component.html',
  styleUrls: ['./roomdetails.component.css'],
})
export class RoomdetailsComponent {
  constructor(
    private roomListService: RoomtypeService,
    private route: ActivatedRoute,
    private imageService: ImageService,
    private roomService: RoomService,
    private router: Router
  ) {}
  imageUrls: string[] = [];
  errorMessage: string = '';
  // ngOnInit(): void {
  //   console.log(this.roomType);
  //   this.roomType.images.forEach((image) => {
  //     this.imageService.getImage(image.name).subscribe((response) => {
  //       this.imageUrls.push(URL.createObjectURL(response.body!));
  //     });
  //   });
  // }
  roomType!: Roomtype;
  room: Room[] = [];
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      //RoomType
      this.roomListService.getRoomTypeById(id).subscribe({
        next: (response: Roomtype) => {
          this.roomType = response;
          if (this.roomType.enable === false) {
            // Sử dụng router.navigateByUrl để chuyển hướng ngay lập tức.
            this.router.navigateByUrl('/rooms');
            return;
          }
          this.roomType.images.forEach((image) => {
            this.imageService.getImage(image.name).subscribe((response) => {
              this.imageUrls.push(URL.createObjectURL(response.body!));
            });
          });
        },
        error: (error) => {
          if (error.error) {
            this.errorMessage = 'Không có loại phòng này. Quay lại ';
          }
        },
      });

      //Danh sách room
      this.roomService.getAllRoomByRoomType_Id(id).subscribe({
        next: (response: Room[]) => {
          this.room = response;
        },
        error: (error) => {
          if (error.error) {
            this.errorMessage = 'Không có loại phòng này. Quay lại ';
          }
        },
      });
    });
  }
  handleReservation(id: number) {}
}
