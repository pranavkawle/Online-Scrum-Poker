import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule  } from '@angular/forms';

import { LoginMemberComponent } from './login-member/login-member.component';
import { MemberRoutingModule } from './member-routing.module';
import { MemberService } from './member.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MemberRoutingModule
  ],
  declarations: [LoginMemberComponent],
  exports: [LoginMemberComponent],
  providers: [MemberService]
})
export class MemberModule { }