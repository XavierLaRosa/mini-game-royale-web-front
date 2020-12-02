import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsCategoriesComponent } from './results-categories.component';

describe('ResultsCategoriesComponent', () => {
  let component: ResultsCategoriesComponent;
  let fixture: ComponentFixture<ResultsCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultsCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
