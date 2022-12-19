import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlSelectorComponent } from './control-selector.component';

describe('ControlSelectorComponent', () => {
  let component: ControlSelectorComponent;
  let fixture: ComponentFixture<ControlSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
