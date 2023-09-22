import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './customer/login/login.component';
import { SignupComponent } from './customer/signup/signup.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './customer/home/home.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HeaderComponent } from './customer/header/header.component';
import { FooterComponent } from './customer/footer/footer.component';
import { ContactComponent } from './customer/contact/contact.component';
import { IntroduceComponent } from './customer/introduce/introduce.component';

import { HttpClientModule } from '@angular/common/http';
import { NotFoundComponent } from './not-found/not-found.component';
import { ListRoomComponent } from './customer/list-room/list-room.component';
import { CheckinCheckoutComponent } from './customer/checkin-checkout/checkin-checkout.component';
import { BookingComponent } from './src/app/customer/booking/booking.component';
import { RoomComponent } from './customer/list-room/roomtype/room.component';
import { RoomdetailsComponent } from './customer/list-room/roomtype/roomdetails/roomdetails.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ContactComponent,
    IntroduceComponent,
    NotFoundComponent,
    ListRoomComponent,
    ListRoomComponent,
    CheckinCheckoutComponent,
    BookingComponent,
    RoomComponent,
    RoomdetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
