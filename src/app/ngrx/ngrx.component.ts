import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import * as act from './counter.actions';
import {Store} from '@ngrx/store';


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
  ngOnInit(): void {}

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
