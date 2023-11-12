import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/Models/room/room';
import { User } from 'src/app/Models/user/user';
import { AuthService } from 'src/app/Services/auth/auth.service';
import Swal from 'sweetalert2';
import { UserService } from '../../Services/user/user.service';
import { ContractService } from '../../Services/contract/contract.service';
import { Contract } from 'src/app/Models/contract/contract';
import { ServiceService } from 'src/app/Services/service/service.service';
import { Service } from 'src/app/Models/service/service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterServicesService } from 'src/app/Services/register-services/register-services.service';
import { RegisterServiceRespone } from 'src/app/Models/register-service/register-service-respone';
import { NavigationEnd, Router } from '@angular/router';
import { VNPayService } from 'src/app/Services/vnpay/vnpay.service';
import { formatDate } from '@angular/common';
import { Roomtype } from 'src/app/Models/roomtype/roomtype';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {
  myForm!: FormGroup;
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private contractService: ContractService,
    private serviceService: ServiceService,
    private formBuilder: FormBuilder,
    private register: RegisterServicesService,
    private router: Router,
    private VNPay: VNPayService
  ) {
    this.myForm = this.formBuilder.group({
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
    });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Cuộn lên đầu trang khi chuyển trang
        window.scrollTo(0, 0);
      }
    });
  }
  selectedContractId!: number;
  registerResponse: RegisterServiceRespone[] = [];
  services: Service[] = [];
  imageUrls: string[] = [];
  errorMessage: string = '';
  user!: User;
  rById!: Room;
  roomType!: Roomtype;
  room: Room[] = [];
  contracts: Contract[] = [];
  fromDate: Date | null = null;
  toDate: Date | null = null;
  selectedServices: Service[] = [];

  ngOnInit(): void {
    this.serviceService.getAllServices().subscribe({
      next: (response: Service[]) => {
        this.services = response;
        this.services.map((s) => (s.selected = false));
      },
      error: (error) => {},
    });
    this.userService
      .getUserByUsername(this.authService.getUsername())
      .subscribe({
        next: (response: User) => {
          this.user = response;
          if (this.user && this.user.id) {
            this.getAllContractByUserId(this.user.id);
            this.getRegister(this.user.id);
          }
        },
        error: (error) => {},
      });
  }
  getRegister(id: number) {
    this.register.getByUserId(id).subscribe({
      next: (response: RegisterServiceRespone[]) => {
        this.registerResponse = response;
      },
      error: (error) => {},
    });
  }
  getAllContractByUserId(id: number) {
    this.contractService.getContractByUserId(id).subscribe({
      next: (response: Contract[]) => {
        this.contracts = response;
      },
      error: (error) => {},
    });
  }
  cancelBooking(id: number) {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Vâng, tôi xóa!',
      cancelButtonText: 'Đóng',
    }).then((result) => {
      if (result.isConfirmed) {
        this.contractService.deleteContract(id).subscribe({
          next: (response: void) => {
            Swal.fire(
              'Thành công',
              'Bạn đã xóa lịch đặt phòng này thành công',
              'success'
            );
            if (this.user && this.user.id) {
              this.getAllContractByUserId(this.user.id);
            }
          },
          error: (error) => {
            Swal.fire('Thất bại', error.error.message, 'error');
          },
        });
      }
    });
  }
  registerService() {
    if (this.selectedServices.length == 0) {
      Swal.fire(
        'Có lỗi xảy ra',
        'Vui lòng chọn dịch vụ bạn muốn đăng ký',
        'error'
      );
      return;
    }
    if (this.fromDate == null) {
      Swal.fire(
        'Có lỗi xảy ra',
        'Vui lòng chọn ngày bắt đầu sử dụng dịch vụ',
        'error'
      );
      return;
    }
    if (this.toDate == null) {
      Swal.fire(
        'Có lỗi xảy ra',
        'Vui lòng chọn ngày kết thúc sử dụng dịch vụ',
        'error'
      );
      return;
    }
    let i = 0;
    this.selectedServices.map((s) => {
      i++;
      let register = {
        customer: {
          id: this.user.id,
        },
        service: {
          id: s.id, // ID của khách hàng (User) đã tồn tại
        },
        contract: {
          id: this.selectedContractId,
        },

        fromDate: this.fromDate,
        toDate: this.toDate,
      };
      this.register.registerService(register).subscribe({
        next: (response: any) => {
          if (i == this.selectedServices.length) {
            Swal.fire(
              'Thành công',
              'Bạn đã đăng ký dịch vụ thành công',
              'success'
            );
            this.getRegister(this.user.id!);
            // Reset form
            this.myForm.reset();

            // Đặt giá trị mặc định cho các trường
            this.selectedServices = [];
            this.fromDate = null;
            this.toDate = null;
          }
        },
        error: (error) => {
          Swal.fire('Thất bại', error.error.message, 'error');
        },
      });
    });
  }
  addService(s: Service) {
    if (s.selected == false) {
      this.selectedServices.push(s);
    } else {
      const index = this.selectedServices.indexOf(s);
      if (index !== -1) {
        this.selectedServices.splice(index, 1);
      }
    }
    s.selected = !s.selected;
  }
  checkRegisterServiceDate(c: Contract): boolean {
    const currentDate = new Date();

    if (
      formatDate(currentDate, 'yyyy-MM-dd', 'en') >
      formatDate(c.checkoutDate, 'yyyy-MM-dd', 'en')
    ) {
      return false; // Ẩn nội dung nếu ngày hiện tại lớn hơn ngày kết thúc của contract.
    }

    return true; // Hiển thị nội dung nếu ngày hiện tại nhỏ hơn hoặc bằng ngày kết thúc của contract.
  }
  isWithinContractDateRange(register: RegisterServiceRespone): boolean {
    for (const contract of this.contracts) {
      if (
        register.fromDate >= contract.checkinDate &&
        register.toDate <= contract.checkoutDate
      ) {
        return true;
      }
    }
    return false;
  }
  getContractId(contract: Contract) {
    this.selectedContractId = contract.id;
  }
  paymentContract(c: Contract) {
    this.VNPay.getPayment(c.totalPrice, c.id).subscribe({
      next: (response: string) => {
        window.location.href = response;
      },
      error: (error) => {
        Swal.fire('Có lỗi!', error.error.message, 'error');
      },
    });
  }
  paymentService(r: RegisterServiceRespone) {
    this.VNPay.getPaymentService(r.totalPrice, r.id).subscribe({
      next: (response: string) => {
        window.location.href = response;
      },
      error: (error) => {
        Swal.fire('Có lỗi!', error.error.message, 'error');
      },
    });
  }
}
