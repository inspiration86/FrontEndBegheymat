import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTrackOrdersComponent } from './admin-track-orders.component';

describe('AdminTrackOrdersComponent', () => {
  let component: AdminTrackOrdersComponent;
  let fixture: ComponentFixture<AdminTrackOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTrackOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTrackOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
