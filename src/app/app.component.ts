import {Component} from '@angular/core';
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

export class AppComponent {
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

  isLoggedIn() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit(): void {

    this.isLoggedIn().then(r => {
      this.me = r;
      console.log(r);
      console.log(r.displayName);
      console.log(r.photoURL);
    });
  }

  doFacebookLogin(): void {
    const provider = new firebase.auth.GoogleAuthProvider();

    this.afAuth.signInWithPopup(provider).then(r => {
      console.log(r);
    });

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


