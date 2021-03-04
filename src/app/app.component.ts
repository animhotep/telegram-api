import {Component, OnInit} from '@angular/core';
import {Hero, Task, User} from './task/task';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {AngularFireAuth} from '@angular/fire/auth';
import firebase from 'firebase/app';
import {first} from 'rxjs/operators';

const getObservable = (collection: AngularFirestoreCollection<Task>) => {
  const subject = new BehaviorSubject([]);
  collection.valueChanges({idField: 'id'}).subscribe((val: Task[]) => {
    subject.next(val);
  });
  return subject;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  me: User;
  hero: Hero;
  token = '755268878:AAFCRw_2VIC1v7zIn_F4ju7IWrAZCswP2IE';
  todo = getObservable(this.store.collection('todo'));

  constructor(
    private store: AngularFirestore,
    private http: HttpClient,
    public afAuth: AngularFireAuth
  ) {
  }

  ngOnInit(): void {
    this.afAuth.authState.pipe(first()).subscribe(r => this.me = r);
  }

  googleLogin(): void {
    const provider = new firebase.auth.GoogleAuthProvider();
    this.afAuth.signInWithPopup(provider).then(r => this.me = r.user);
  }

  logout(): void {
    this.afAuth.signOut().then(() => this.me = null);
  }

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
