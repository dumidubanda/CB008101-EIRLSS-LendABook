import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadingAreaComponent } from './uploading-area.component';

describe('UploadingAreaComponent', () => {
  let component: UploadingAreaComponent;
  let fixture: ComponentFixture<UploadingAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadingAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadingAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
