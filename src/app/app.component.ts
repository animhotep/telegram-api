import {Component, OnInit} from '@angular/core';
import {Hero, Task, User} from './task/task';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {AngularFireAuth} from '@angular/fire/auth';
import firebase from 'firebase/app';
import {first, take, timeout} from 'rxjs/operators';

const getObservable = (collection: AngularFirestoreCollection<Task>) => {
  const subject = new BehaviorSubject([]);
  collection.valueChanges({idField: 'id'}).subscribe((val: Task[]) => {
    subject.next(val);
  });
  return subject;
};

interface MyUser extends firebase.User {
  role: '';
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  me: MyUser;
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
    this.afAuth.authState.pipe(first()).subscribe(r => this.getUser(r?.uid));
  }

  private getUser(uid: string): void {
    if (!uid) {
      this.me = null;
      return;
    }
    this.store.collection('users', ref => ref.where('uid', '==', uid))
      .valueChanges()
      .subscribe((r: any) => this.me = r[0]);
  }

  googleLogin(): void {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then(r => this.getUser(r.user.uid));
  }

  logout(): void {
    firebase.auth().signOut().then(() =>  setTimeout(() => this.me = null, 400));
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
        title: new Date(),
        description: '123123123'
      }
    );
  }
}


