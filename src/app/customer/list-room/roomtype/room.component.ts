import { Component, Input, OnInit } from '@angular/core';
import { Roomtype } from 'src/app/Models/roomtype/roomtype';
import { ImageService } from 'src/app/Services/image/image.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
})
export class RoomComponent implements OnInit {
  constructor(private imageService: ImageService) {}
  @Input() roomType!: Roomtype;
  @Input() i!: number;

  imageUrls: string[] = [];
  ngOnInit(): void {
    console.log(this.roomType);
    this.roomType.images.forEach((image) => {
      this.imageService.getImage(image.name).subscribe((response) => {
        this.imageUrls.push(URL.createObjectURL(response.body!));
      });
    });
  }
}
