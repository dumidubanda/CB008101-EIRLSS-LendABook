import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UtilService} from '../../../services/util.service';
import {CashServiceService} from '../../../services/cash-service.service';
import {AUTH_APIS} from '../../../lookups/apis.lookups';
import {ChangeDetectorService} from '../../../services/change-detector';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  hide = true;
  userInfo: any;
  loading;
  formGroup: FormGroup;
  constructor(private fb: FormBuilder, private  uti: UtilService, private cash: CashServiceService,
              private changeDetectorService: ChangeDetectorService) {}
  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.formGroup = this.fb.group({
      email: ['', [Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  submit(): void{
    if ( this.formGroup.invalid) { return; }
    this.loading = true;
    this.uti.postRequest(AUTH_APIS.login, this.formGroup.value).subscribe(value => {
        this.userInfo = value;
        this.cash.setSessionData('user', value);
        this.changeDetectorService.emitUserInfoChanges();
        this.uti.navigate('../../home');
      },
      error => this.uti.alert('Error While Login', this)
    );
  }


  navigate(path): void{
    this.uti.navigate(path);
  }
}
