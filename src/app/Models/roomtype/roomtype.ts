import { Image } from '../image/image';

export class Roomtype {
  constructor(
    public id: number,
    public name: string,
    public numberOfAdult: number,
    public numberOfChild: number,
    public bedType: string,
    public price: number,
    public isFull: boolean,
    public enable: boolean,
    public createdDate: string,
    public updatedDate: string,
    public images: Image[]
  ) {}
}
