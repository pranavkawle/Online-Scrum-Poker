import { TestBed, inject } from '@angular/core/testing';

import { LoginMemberService } from './login-member.service';

describe('LoginMemberService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginMemberService]
    });
  });

  it('should be created', inject([LoginMemberService], (service: LoginMemberService) => {
    expect(service).toBeTruthy();
  }));
});
