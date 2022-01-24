import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksCategoriesComponent } from './books-categories.component';

describe('BooksCategoriesComponent', () => {
  let component: BooksCategoriesComponent;
  let fixture: ComponentFixture<BooksCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooksCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
