import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltreProjetsComponent } from './filtre-projets.component';

describe('FiltreProjetsComponent', () => {
  let component: FiltreProjetsComponent;
  let fixture: ComponentFixture<FiltreProjetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltreProjetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltreProjetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
