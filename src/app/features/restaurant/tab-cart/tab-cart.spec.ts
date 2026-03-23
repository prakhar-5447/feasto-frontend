import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabCart } from './tab-cart';

describe('TabCart', () => {
  let component: TabCart;
  let fixture: ComponentFixture<TabCart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabCart],
    }).compileComponents();

    fixture = TestBed.createComponent(TabCart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
