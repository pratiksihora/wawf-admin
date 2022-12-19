import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableToogleComponent } from './table-toogle.component';

describe('TableToogleComponent', () => {
  let component: TableToogleComponent;
  let fixture: ComponentFixture<TableToogleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableToogleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableToogleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
