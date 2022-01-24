import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UtilService} from '../../services/util.service';
import {AUTH_APIS, PLANS_APIS} from '../../lookups/apis.lookups';
import {CashServiceService} from '../../services/cash-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  hide = true;
  userInfo: any;
  loading;
  formGroup: FormGroup;
  plans: any[];
  constructor(private fb: FormBuilder, private  uti: UtilService, private cash: CashServiceService) {}
  ngOnInit(): void {
    this.userInfo = this.cash.getSessionData('user') || {};
    this.getPlans();
  }

  createForm(userInfo): void {
    this.formGroup = this.fb.group({
      id: [userInfo.id, [Validators.required]],
      firstName: [userInfo.firstName, [Validators.required]],
      lastName: [userInfo.lastName, [Validators.required]],
      email: [userInfo.email, [Validators.email]],
      password: [userInfo.password, [Validators.required]],
      plan: [userInfo.plan ? userInfo.plan.id : '', [Validators.required]],
    });
  }

  submit(): void{
    if ( this.formGroup.invalid) { return; }
    this.loading = true;
    const request = this.formGroup.value;
    if( request.plan && request.plan.id){
      request.plan.id = this.formGroup.value.plan;
    } else {
      request.plan = {id: this.formGroup.value.plan};
    }
    this.uti.putResource(AUTH_APIS.profile, request).subscribe(value => {
        this.userInfo = value;
        this.cash.setSessionData('user', value);
        this.uti.alert('Profile Info Saved successfully', this, 20000);
     },
      error => this.uti.alert('Error While Saving Profile Info', this)
    );
  }

  getPlans(): void{
    this.loading = true;
    this.uti.getRequest(PLANS_APIS.url).subscribe(value => {
      this.plans = value;
      this.plans.forEach(plan => plan.selected = this.userInfo.plan.id === plan.id );
      this.loading = false;
      this.createForm(this.userInfo);
    }, error => {
      this.uti.alert('Error getting Plans!', this);
      this.createForm(this.userInfo);
    });
  }
  selectPlan(plan): void{
    this.formGroup.controls['plan'].setValue(plan.id);
    this.plans.forEach(plan => plan.selected = false);
    plan.selected = true;
  }
}
