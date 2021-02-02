import { TestBed } from '@angular/core/testing';

import { GuardsAdminGuard } from './guards-admin.guard';

describe('GuardsAdminGuard', () => {
  let guard: GuardsAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GuardsAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
