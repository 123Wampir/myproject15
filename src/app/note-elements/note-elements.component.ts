import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Note } from '../shared/note.model';
import { MyNotesService } from '../shared/services/my-notes.service';

@Component({
  selector: 'app-note-elements',
  templateUrl: './note-elements.component.html',
  styleUrls: ['./note-elements.component.css']
})
export class NoteElementsComponent implements OnInit {

  noteForm!: FormGroup;
  onEdit = false;
  @Input() note!: Note;
  @Output() DeleteNote = new EventEmitter<number>();
  @Output() ChangeNote = new EventEmitter<Note>();

  constructor(
    public MyNotesService: MyNotesService, private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    const controls = {
      noteTitle: [null, [Validators.required, Validators.maxLength(100)]],
      noteText: [null, [Validators.required, Validators.maxLength(1000)]],
      noteType: [null, [Validators.required]],
      noteCreateDate: [null],
      noteCreateTime: [null],
    };
    this.noteForm = this.fb.group(controls);
    if (this.note)
      this.noteForm.patchValue(this.note);
  }

  onDeleteNote() {
    console.log(this.MyNotesService.notes);
    this.DeleteNote.emit(this.note.id);
  }
  onChangeNote() {
    let note = this.noteForm.value;
    console.log(this.noteForm.value);
    this.ChangeNote.emit(note);
  }
}
