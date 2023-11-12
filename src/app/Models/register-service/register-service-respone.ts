import { Contract } from '../contract/contract';

export class RegisterServiceRespone {
  constructor(
    public id: number,
    public serviceName: string,
    public totalPrice: number,
    public fromDate: Date,
    public contractId: number,
    public toDate: Date,
    public status: boolean
  ) {}
}
