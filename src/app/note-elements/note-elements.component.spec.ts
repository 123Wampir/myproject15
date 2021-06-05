import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteElementsComponent } from './note-elements.component';

describe('NoteElementsComponent', () => {
  let component: NoteElementsComponent;
  let fixture: ComponentFixture<NoteElementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoteElementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
