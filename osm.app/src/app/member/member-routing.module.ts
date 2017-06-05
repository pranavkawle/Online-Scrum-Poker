import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginMemberComponent } from './login-member/login-member.component';

const routes: Routes = [
  { path: 'login', component: LoginMemberComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MemberRoutingModule { }
