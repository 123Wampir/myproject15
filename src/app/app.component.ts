import { Component, IterableDiffers, OnInit } from '@angular/core';
import { Note, NoteType } from './shared/note.model';
import { HttpNoteService } from './shared/services/http-note.service';
import { MyNotesService } from './shared/services/my-notes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    public MyNotesService: MyNotesService,
    private HttpNoteService: HttpNoteService
  ) { }

  title = 'project15';

  ngOnInit() {
    this.getData();
    console.log("this.MyNotesService.notes");
  }
  async getData() {
    try {
      this.MyNotesService.noteType = await this.HttpNoteService.getNoteType();
      this.MyNotesService.notes = await this.HttpNoteService.getNotes();
    } catch (err) {
      console.error(err);
    } finally {
       console.log(this.MyNotesService.notes);
       console.log(this.MyNotesService.noteType);
     }
  }
  async onCreateNote(note: Note) {
    try {
      await this.HttpNoteService.postNote(note);
    } catch (err) { console.error(err) }
    finally { this.getData(); }
  }

  async onDeleteNote(id: number) {
    try {
      await this.HttpNoteService.deleteNote(id);
    } catch (err) { console.error(err) }
    finally {
      this.getData();
      console.log(this.MyNotesService.notes);
    }
  }

  async onChangeNote(id: number, note: Note) {
    try {
      await this.HttpNoteService.putNote(id, note);
    } catch (err) { console.error(err) }
    finally { this.getData(); }
  }

  async onCreateNoteType(type:NoteType){
    try {
      await this.HttpNoteService.postNoteType(type);
    } catch (err) { console.error(err) }
    finally { this.getData(); }
  }
  async onDeleteNoteType(id:number){
    try {
      for (let item of this.MyNotesService.notes)
      {
        if (item.noteType==id)
        {
          console.log(item);      
          await this.onDeleteNote(item.id);
        }
      }
      await this.HttpNoteService.deleteNoteType(id);
    } catch (err) { console.error(err) }
    finally { this.getData(); }
  }
}
