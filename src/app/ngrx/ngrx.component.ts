import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, concat, from, merge, observable, Observable, of} from 'rxjs';
import * as act from './counter.actions';
import {Store} from '@ngrx/store';
import {map, mergeMap, reduce, tap} from 'rxjs/operators';


@Component({
  selector: 'app-ngrx',
  templateUrl: './ngrx.component.html',
  styleUrls: ['./ngrx.component.scss']
})
export class NgrxComponent implements OnInit {
  count$: Observable<number>;

  constructor(private store: Store<{ count: number }>) {
    this.count$ = store.select('count');
  }

  ngOnInit(): void {
    const source = () => from([1, 2, 3, 4, 5]);
    source().pipe(
      tap(val => console.log('Value:' + val)),
      map(val => val + '>>>')
    ).subscribe(console.log);

  }

  increment(): void {
    this.store.dispatch(act.increment());
  }

  decrement(): void {
    this.store.dispatch(act.decrement());
  }

  multi(): void {
    this.store.dispatch(act.multi());
  }

  reset(): void {
    this.store.dispatch(act.reset());
  }

}
