import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLicenceKeyComponent } from './create-licence-key.component';

describe('CreateLicenceKeyComponent', () => {
  let component: CreateLicenceKeyComponent;
  let fixture: ComponentFixture<CreateLicenceKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateLicenceKeyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateLicenceKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
