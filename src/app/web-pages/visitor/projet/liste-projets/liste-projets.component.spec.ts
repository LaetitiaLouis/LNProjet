import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeProjetsComponent } from './liste-projets.component';

describe('ListeProjetsComponent', () => {
  let component: ListeProjetsComponent;
  let fixture: ComponentFixture<ListeProjetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeProjetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeProjetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
