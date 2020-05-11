import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpClientDeleteComponent } from './pop-up-client-delete.component';

describe('PopUpClientDeleteComponent', () => {
  let component: PopUpClientDeleteComponent;
  let fixture: ComponentFixture<PopUpClientDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopUpClientDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpClientDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
