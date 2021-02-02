import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorAddDialogComponent } from './administrator-add-dialog.component';

describe('AdministratorAddDialogComponent', () => {
  let component: AdministratorAddDialogComponent;
  let fixture: ComponentFixture<AdministratorAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministratorAddDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministratorAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
