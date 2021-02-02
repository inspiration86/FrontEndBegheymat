import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSideBannerDialogComponent } from './add-side-banner-dialog.component';

describe('AddSideBannerDialogComponent', () => {
  let component: AddSideBannerDialogComponent;
  let fixture: ComponentFixture<AddSideBannerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSideBannerDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSideBannerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
