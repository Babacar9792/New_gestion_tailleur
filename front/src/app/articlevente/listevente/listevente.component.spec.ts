import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeventeComponent } from './listevente.component';

describe('ListeventeComponent', () => {
  let component: ListeventeComponent;
  let fixture: ComponentFixture<ListeventeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeventeComponent]
    });
    fixture = TestBed.createComponent(ListeventeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
