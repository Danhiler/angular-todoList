import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Itask} from '../../interfaces/iTask';
import { faTrash ,faEdit} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {
  @Input() listItem: Itask;
  @Input() isEdited: boolean;

  @Output() removeTask: EventEmitter<string> = new EventEmitter<string>();
  @Output() selectTaskToUpdate: EventEmitter<string> = new EventEmitter<string>();
  @Output() updateEditedTask: EventEmitter<Itask> = new EventEmitter<Itask>();

  private newTaskValue: string;
  faTrash = faTrash;
  faEdit = faEdit;

  constructor() {
  }

  ngOnInit() {
    this.newTaskValue = this.listItem.value;
  }

  deleteTask() {
    this.removeTask.emit(this.listItem.id);
  }

  editTask() {
    this.selectTaskToUpdate.emit(this.listItem.id);
  }

  saveEdited() {
    this.updateEditedTask.emit(this.listItem);
  }
}
