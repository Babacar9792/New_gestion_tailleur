import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemventeComponent } from './itemvente.component';

describe('ItemventeComponent', () => {
  let component: ItemventeComponent;
  let fixture: ComponentFixture<ItemventeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemventeComponent]
    });
    fixture = TestBed.createComponent(ItemventeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
