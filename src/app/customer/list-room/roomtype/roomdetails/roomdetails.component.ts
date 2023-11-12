import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contract } from 'src/app/Models/contract/contract';
import { Room } from 'src/app/Models/room/room';
import { Roomtype } from 'src/app/Models/roomtype/roomtype';
import { User } from 'src/app/Models/user/user';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { ContractService } from 'src/app/Services/contract/contract.service';
import { ImageService } from 'src/app/Services/image/image.service';
import { RoomService } from 'src/app/Services/room/room.service';
import { RoomtypeService } from 'src/app/Services/roomtype/roomtype.service';
import { UserService } from 'src/app/Services/user/user.service';
import Swal from 'sweetalert2';

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
    private router: Router,
    private authService: AuthService,
    private userService : UserService,
    private contractService: ContractService
  ) {}
  checkin!: Date;
  checkout!: Date;
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
  r!: Room;
   showModal: boolean = false;
  roomType!: Roomtype;
  room: Room[] = [];
  user!: User;
  ngOnInit(): void {
    this.userService.getUserByUsername(this.authService.getUsername())
    .subscribe({
      next: (response: User) => {
        this.user = response;
      },
      error: (error) => {
        Swal.fire("Có lỗi",error.error.message,"error");
      }
    })
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
  openModal(r: Room) {
    this.r = r;
  }
  handleAccept() {
    console.log(localStorage.getItem("username"))
    if(!localStorage.getItem("username")) {
      Swal.fire('Có lỗi',"Bạn vui lòng đăng nhập để đặt phòng","error");
      return;
    }
    if(this.checkin == undefined || this.checkout == undefined) {
      Swal.fire("Có lỗi","Vui lòng chọn ngày đến và ngày đi","error");
      return;
    }
    
    this.contractService.addContract(
      new Contract(0,this.roomType.name,this.r.numberRoom,0,new Date(),this.checkin,this.checkout,this.user,null,0,'')

    ).subscribe({
      next: (response: any)=> {
        Swal.fire('THÀNH CÔNG', "BẠN ĐÃ ĐẶT PHÒNG THÀNH CÔNG","success");
      },
      error:(error) => {
Swal.fire('Thất bại', error.error.message,"error");
      }
    })
  }
}
 