import { Component } from '@angular/core';
import {Task} from './task/task';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {BehaviorSubject, Observable} from 'rxjs';


const getObservable = (collection: AngularFirestoreCollection<Task>) => {
  const subject = new BehaviorSubject([]);
  collection.valueChanges({ idField: 'id' }).subscribe((val: Task[]) => {
    console.log(val);
    subject.next(val);
  });
  return subject;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  constructor(private store: AngularFirestore) {}

  todo = getObservable(this.store.collection('todo'));
  inProgress = this.store.collection('inProgress').valueChanges({ idField: 'id' });
  done = this.store.collection('done').valueChanges({ idField: 'id' });


  newTask(): void {
    this.store.collection('todo').add({
        title: 'sadfasdfdsf',
        description: '123123123'
      }
    );
  }
}


