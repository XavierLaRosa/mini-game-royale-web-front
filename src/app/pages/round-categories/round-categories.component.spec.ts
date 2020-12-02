import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundCategoriesComponent } from './round-categories.component';

describe('RoundCategoriesComponent', () => {
  let component: RoundCategoriesComponent;
  let fixture: ComponentFixture<RoundCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoundCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
