import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailProjetComponent } from './detail-projet.component';

describe('DetailProjetComponent', () => {
  let component: DetailProjetComponent;
  let fixture: ComponentFixture<DetailProjetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailProjetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
