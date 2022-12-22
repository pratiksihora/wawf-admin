import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageCopyComponent } from './message-copy.component';

describe('MessageCopyComponent', () => {
  let component: MessageCopyComponent;
  let fixture: ComponentFixture<MessageCopyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageCopyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageCopyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
