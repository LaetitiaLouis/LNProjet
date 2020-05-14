import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpDeleteMessageComponent } from './pop-up-delete-message.component';

describe('PopUpDeleteMessageComponent', () => {
  let component: PopUpDeleteMessageComponent;
  let fixture: ComponentFixture<PopUpDeleteMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopUpDeleteMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpDeleteMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
