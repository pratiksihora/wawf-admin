import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateKeyDetailsComponent } from './update-key-details.component';

describe('UpdateKeyDetailsComponent', () => {
  let component: UpdateKeyDetailsComponent;
  let fixture: ComponentFixture<UpdateKeyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateKeyDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateKeyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
