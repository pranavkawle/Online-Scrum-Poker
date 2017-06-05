import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MemberService } from '../member.service';
import { OsmMember } from './../osm-member';

@Component({
  selector: 'osm-login-member',
  templateUrl: './login-member.component.html',
  styleUrls: ['./login-member.component.scss']
})
export class LoginMemberComponent implements OnInit {
  memberForm: FormGroup;
  member: OsmMember;

  constructor(private router: Router, private service: MemberService, private formBuilder: FormBuilder) {
    this.member = new OsmMember();
  }

  ngOnInit() {
    this.buildForm();
  }

  login() {
    this.prepareOsmMember();
    this.service.addMember(this.member).subscribe((result: number) => {
      this.member.id = result;
      this.router.navigate(['/join-room', result]);
    }, error => {
      console.log(error);
    });
  }

  private buildForm(): void {
    this.memberForm = this.formBuilder.group({
      'name': [this.member.name, [Validators.required]]
    });

    this.memberForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  private prepareOsmMember(): void {
    this.member.name = this.memberForm.controls.name.value;
  }

  onValueChanged(data?: any) {
    if (!this.memberForm) { return; }
    const form = this.memberForm;

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  formErrors = {
    'name': ''
  };

  validationMessages = {
    'name': {
      'required': 'Name is required.'
    }
  };
}
