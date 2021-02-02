import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAdministratorsComponent } from './admin-administrators.component';

describe('AdminAdministratorsComponent', () => {
  let component: AdminAdministratorsComponent;
  let fixture: ComponentFixture<AdminAdministratorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAdministratorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAdministratorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
