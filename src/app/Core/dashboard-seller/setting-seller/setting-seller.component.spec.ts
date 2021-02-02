import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingSellerComponent } from './setting-seller.component';

describe('SettingSellerComponent', () => {
  let component: SettingSellerComponent;
  let fixture: ComponentFixture<SettingSellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingSellerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
