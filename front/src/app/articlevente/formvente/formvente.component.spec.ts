import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormventeComponent } from './formvente.component';

describe('FormventeComponent', () => {
  let component: FormventeComponent;
  let fixture: ComponentFixture<FormventeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormventeComponent]
    });
    fixture = TestBed.createComponent(FormventeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
