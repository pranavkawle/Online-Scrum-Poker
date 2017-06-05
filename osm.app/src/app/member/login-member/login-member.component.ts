import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators  } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginMemberService } from './login-member.service';
import { OsmMember } from './../osm-member';

@Component({
  selector: 'osm-login-member',
  templateUrl: './login-member.component.html',
  styleUrls: ['./login-member.component.scss']
})
export class LoginMemberComponent implements OnInit {
  memberForm = new FormGroup ({
    name: new FormControl('', Validators.required)
  });

  constructor(private router: Router, private service: LoginMemberService) { }

  ngOnInit() {
  }

  login() {
    let member = new OsmMember();
    member.name = this.memberForm['name'];
    this.service.addMember(member).subscribe(result => {
      console.log(member);
      this.router.navigate(['/join-room'], { queryParams: { member: member }});
    });
  }
}
