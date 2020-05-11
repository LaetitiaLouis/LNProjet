import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpModifProfilComponent } from './pop-up-modif-profil.component';

describe('PopUpModifProfilComponent', () => {
  let component: PopUpModifProfilComponent;
  let fixture: ComponentFixture<PopUpModifProfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopUpModifProfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpModifProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
