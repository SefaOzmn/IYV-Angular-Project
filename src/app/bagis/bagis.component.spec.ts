import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BagisComponent } from './bagis.component';

describe('BagisComponent', () => {
  let component: BagisComponent;
  let fixture: ComponentFixture<BagisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BagisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BagisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
