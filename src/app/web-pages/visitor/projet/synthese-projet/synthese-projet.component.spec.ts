import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SyntheseProjetComponent } from './synthese-projet.component';

describe('SyntheseProjetComponent', () => {
  let component: SyntheseProjetComponent;
  let fixture: ComponentFixture<SyntheseProjetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SyntheseProjetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SyntheseProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
