import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendTrialComponent } from './extend-trial.component';

describe('ExtendTrialComponent', () => {
  let component: ExtendTrialComponent;
  let fixture: ComponentFixture<ExtendTrialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtendTrialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExtendTrialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
