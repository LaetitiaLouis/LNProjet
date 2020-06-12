import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailModifProfilComponent } from './detail-modif-profil.component';

describe('DetailModifProfilComponent', () => {
  let component: DetailModifProfilComponent;
  let fixture: ComponentFixture<DetailModifProfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailModifProfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailModifProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
