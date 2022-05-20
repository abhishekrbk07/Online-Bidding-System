import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllbiddingComponent } from './allbidding.component';

describe('AllbiddingComponent', () => {
  let component: AllbiddingComponent;
  let fixture: ComponentFixture<AllbiddingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllbiddingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllbiddingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
