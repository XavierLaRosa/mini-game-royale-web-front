import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitCategoriesComponent } from './submit-categories.component';

describe('SubmitCategoriesComponent', () => {
  let component: SubmitCategoriesComponent;
  let fixture: ComponentFixture<SubmitCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
