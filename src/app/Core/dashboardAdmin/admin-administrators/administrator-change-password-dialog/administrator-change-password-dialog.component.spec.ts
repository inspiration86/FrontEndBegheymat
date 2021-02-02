import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorChangePasswordDialogComponent } from './administrator-change-password-dialog.component';

describe('AdministratorChangePasswordDialogComponent', () => {
  let component: AdministratorChangePasswordDialogComponent;
  let fixture: ComponentFixture<AdministratorChangePasswordDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministratorChangePasswordDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministratorChangePasswordDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
