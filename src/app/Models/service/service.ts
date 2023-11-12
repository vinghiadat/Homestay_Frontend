export class Service {
  constructor(
    public id: number,
    public name: string,
    public price: number,
    public description: string,
    public enable: boolean,
    public selected: boolean = false
  ) {}
}
