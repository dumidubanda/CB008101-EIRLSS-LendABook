import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideosCategoriesComponent } from './videos-categories.component';

describe('VideosCategoriesComponent', () => {
  let component: VideosCategoriesComponent;
  let fixture: ComponentFixture<VideosCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideosCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideosCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
