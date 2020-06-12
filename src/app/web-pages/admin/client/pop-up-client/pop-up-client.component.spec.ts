import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpClientComponent } from './pop-up-client.component';

describe('PopUpClientComponent', () => {
  let component: PopUpClientComponent;
  let fixture: ComponentFixture<PopUpClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopUpClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
