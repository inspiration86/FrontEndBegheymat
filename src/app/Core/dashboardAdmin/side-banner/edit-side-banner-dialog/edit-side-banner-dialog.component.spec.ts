import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSideBannerDialogComponent } from './edit-side-banner-dialog.component';

describe('EditSideBannerDialogComponent', () => {
  let component: EditSideBannerDialogComponent;
  let fixture: ComponentFixture<EditSideBannerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSideBannerDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSideBannerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
