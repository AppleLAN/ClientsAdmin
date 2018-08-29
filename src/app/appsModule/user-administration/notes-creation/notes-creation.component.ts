import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-notes-creation',
  templateUrl: './notes-creation.component.html',
  styleUrls: ['./notes-creation.component.scss']
})
export class NotesCreationComponent implements OnInit {
  @Input()
  notes;
  @Output()
  notesChange = new EventEmitter();

  showNew = false;
  newNote = '';

  constructor() {}

  ngOnInit() {}

  showNewNotes() {
    this.showNew = true;
  }

  add() {
    this.notes.push(this.newNote);
    this.notesChange.emit(this.notes);
    this.newNote = '';
    this.showNew = false;
  }

  remove(element) {
    this.notes = this.notes.filter(e => e !== element);
    this.notesChange.emit(this.notes);
  }
}
