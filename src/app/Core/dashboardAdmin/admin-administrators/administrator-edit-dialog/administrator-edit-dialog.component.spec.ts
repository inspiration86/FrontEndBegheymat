import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorEditDialogComponent } from './administrator-edit-dialog.component';

describe('AdministratorEditDialogComponent', () => {
  let component: AdministratorEditDialogComponent;
  let fixture: ComponentFixture<AdministratorEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministratorEditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministratorEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
