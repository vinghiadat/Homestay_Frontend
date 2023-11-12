import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './customer/login/login.component';
import { SignupComponent } from './customer/signup/signup.component';
import { HomeComponent } from './customer/home/home.component';
import { ContactComponent } from './customer/contact/contact.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { RoomdetailsComponent } from './customer/list-room/roomtype/roomdetails/roomdetails.component';
import { ListRoomComponent } from './customer/list-room/list-room.component';
import { HistoryComponent } from './customer/history/history.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'room-types', component: ListRoomComponent },
  { path: 'rooms/:id', component: RoomdetailsComponent },
  { path: 'history', component: HistoryComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
