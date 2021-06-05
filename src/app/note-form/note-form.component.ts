import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormsModule } from '@angular/forms';
import { Note, NoteType } from 'src/app/shared/note.model'
import { MyNotesService } from '../shared/services/my-notes.service';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.css']
})
export class NoteFormComponent implements OnInit {

  noteForm!:FormGroup;

  constructor(public MyNotesService: MyNotesService,private fb:FormBuilder) { }

  @Input() note!: Note;
  @Output() CreateNote=new EventEmitter<Note>();
  @Output() ChangeNote=new EventEmitter<Note>();
  @Output() CreateNoteType=new EventEmitter<NoteType>();
  @Output() DeleteNoteType=new EventEmitter<number>();

  ngOnInit(): void {
    const controls={
      noteTitle:[null,[Validators.required,Validators.maxLength(100)]],
      noteText:[null,[Validators.required,Validators.maxLength(1000)]],
      noteType:[null,[Validators.required]],
      newType:[null],
      noteCreateDate:[null],
      noteCreateTime:[null],
    };
    this.noteForm=this.fb.group(controls);
    console.log();
  }

  onCreateNote() {
    if (this.noteForm.value!=0) {
      let note = new Note(this.noteForm.value["noteTitle"],this.noteForm.value["noteText"],this.noteForm.value["noteType"]);
      this.noteForm.value["noteCreateDate"]=note.noteCreateDate;
      this.noteForm.value["noteCreateTime"]=note.noteCreateTime;
      this.CreateNote.emit(this.noteForm.value);
      this.clearData();
    }
    else alert("Название заметки обязательное поле");
  }
  onTypeCreate(){
    if(this.noteForm.value["newType"]!="" && this.noteForm.value["newType"]!=null)
    {
      console.log(this.noteForm.value["newType"]);
      let newType:NoteType={type:this.noteForm.value["newType"]};
      this.CreateNoteType.emit(newType);
      this.clearData();
    }
  }
  onTypeDelete(){
    console.log(this.noteForm.value["noteType"]);
    if(this.noteForm.value["noteType"]!=0 && this.noteForm.value["noteType"]!=null)
    {
      this.DeleteNoteType.emit(this.noteForm.value["noteType"]);
    }
  }
  clearData() {
    this.noteForm.reset();
  }
}
