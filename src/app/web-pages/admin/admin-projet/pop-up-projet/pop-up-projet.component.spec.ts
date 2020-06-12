import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpProjetComponent } from './pop-up-projet.component';

describe('PopUpProjetComponent', () => {
  let component: PopUpProjetComponent;
  let fixture: ComponentFixture<PopUpProjetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopUpProjetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
