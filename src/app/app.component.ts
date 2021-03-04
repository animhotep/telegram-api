import {Component} from '@angular/core';
import {Hero, Task} from './task/task';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';


const getObservable = (collection: AngularFirestoreCollection<Task>) => {
  const subject = new BehaviorSubject([]);
  collection.valueChanges({idField: 'id'}).subscribe((val: Task[]) => {
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
  hero: Hero;

  constructor(
    private store: AngularFirestore,
    private http: HttpClient
  ) {
  }

  token = '755268878:AAFCRw_2VIC1v7zIn_F4ju7IWrAZCswP2IE';
  todo = getObservable(this.store.collection('todo'));
  inProgress = this.store.collection('inProgress').valueChanges({idField: 'id'});
  done = this.store.collection('done').valueChanges({idField: 'id'});

  getMe(): void {
    console.log(this.token);

    this.http.get<Hero>(`https://api.telegram.org/bot${this.token}/getMe`)
      .toPromise()
      .then(r => {
        this.hero = r;
        console.log(r.result);
      });
  }

  newTask(): void {
    this.store.collection('todo').add({
        title: 'sadfasdfdsf',
        description: '123123123'
      }
    );
  }
}


