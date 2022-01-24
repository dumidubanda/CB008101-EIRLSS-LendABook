import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UtilService} from '../../../services/util.service';
import {AUTH_APIS, PLANS_APIS} from '../../../lookups/apis.lookups';
import {CashServiceService} from '../../../services/cash-service.service';
import {APP_CURRENCY} from '../../../lookups/app.lookups';
import {ChangeDetectorService} from '../../../services/change-detector';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  APP_CURRENCY = APP_CURRENCY;
  hide = true;
  userInfo: any;
  plans: any[];
  loading;
  formGroup: FormGroup;
  constructor(private fb: FormBuilder, private  uti: UtilService, private cash: CashServiceService,
              private changeDetectorService: ChangeDetectorService) {}
  ngOnInit(): void {
    this.getPlans();
  }

  createForm(): void {
    this.formGroup = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.email]],
      password: ['', [Validators.required]],
      plan: ['', [Validators.required]],
    });
  }

  submit(): void{
    if ( this.formGroup.invalid) { return; }
    this.loading = true;
    const request = this.formGroup.value;
    if ( request.plan && request.plan.id){
      request.plan.id = this.formGroup.value.plan;
    } else {
      request.plan = {id: this.formGroup.value.plan};
    }
    this.uti.putResource(AUTH_APIS.register, request).subscribe(value => {
        this.userInfo = value;
        this.cash.setSessionData('user', value);
        this.changeDetectorService.emitUserInfoChanges();
        this.uti.navigate('../home');
        this.uti.alert('Profile Info Saved successfully', this, 20000);
        this.loading = false;
      },
      error => this.uti.alert('Error While Saving Profile Info', this)
    );
  }

  getPlans(): void{
    this.loading = true;
    this.uti.getRequest(PLANS_APIS.url).subscribe(value => {
      this.plans = value;
      this.loading = false;
      this.createForm();
    }, error => {
      this.uti.alert('Error getting Plans!', this);
      this.createForm();
    });
  }
  selectPlan(plan): void{
    this.formGroup.controls['plan'].setValue(plan.id);
    this.plans.forEach(plan => plan.selected = false);
    plan.selected = true;
  }


  navigate(path): void{
    this.uti.navigate(path);
  }

  convertToWeeks(value): string{
    return value >= 7 ? ( (value / 7) % 1 !== 0 ? value + ' days' : value / 7 + ' weeks' ) : value + ' days';
  }

}
