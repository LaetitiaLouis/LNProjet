import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpCreaAdminComponent } from './pop-up-crea-admin.component';

describe('PopUpCreaAdminComponent', () => {
  let component: PopUpCreaAdminComponent;
  let fixture: ComponentFixture<PopUpCreaAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopUpCreaAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpCreaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
