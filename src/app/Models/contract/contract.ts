import { User } from "../user/user";

export class Contract {
    constructor(
        public id: number,
        public roomType: string,
        public numberRoom: number,
        public totalPrice: number,
        public createdDate: Date | null,
        public checkinDate: Date,
        public checkoutDate: Date,
        public customer: User,
        public admin: User | null,
        public status: number | null,
        public note: string | null
    ){}
}
