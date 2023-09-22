import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomdetailsComponent } from './roomdetails.component';

describe('RoomdetailsComponent', () => {
  let component: RoomdetailsComponent;
  let fixture: ComponentFixture<RoomdetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomdetailsComponent]
    });
    fixture = TestBed.createComponent(RoomdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
