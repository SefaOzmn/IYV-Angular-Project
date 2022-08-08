import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BagisGridComponent } from './bagis-grid.component';

describe('BagisGridComponent', () => {
  let component: BagisGridComponent;
  let fixture: ComponentFixture<BagisGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BagisGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BagisGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
