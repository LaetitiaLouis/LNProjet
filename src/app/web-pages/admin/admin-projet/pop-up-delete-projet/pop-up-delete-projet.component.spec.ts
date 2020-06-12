import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpDeleteProjetComponent } from './pop-up-delete-projet.component';

describe('PopUpDeleteProjetComponent', () => {
  let component: PopUpDeleteProjetComponent;
  let fixture: ComponentFixture<PopUpDeleteProjetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopUpDeleteProjetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpDeleteProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
