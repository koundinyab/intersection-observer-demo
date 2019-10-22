import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as faker from 'faker';
import { timer } from 'rxjs';
import { mapTo } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'iodemo';
  searchSet = [];
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  data = [];
  count = 30;

  ngOnInit() {
    this.isLoading$.next(true);
    const count = 30;
    const mockAssets = [];
    for (let a = 0; a < count; a++) {
      mockAssets.push({
        assetId: faker.random.number(),
        showname: faker.name.findName(),
        text: faker.lorem.sentence()
      });
    }
    this.searchSet = mockAssets;
    this.isLoading$.next(false);
  }

  onScroll() {
    this.isLoading$.next(true);
    this.fetchData().subscribe(searchSet => {
      Array.prototype.push.apply(this.searchSet, searchSet);
      this.isLoading$.next(false);
    });
  }

  fetchData() {
    const count = 30;
    const mockScrollAssets = [];
    for (let a = 0; a < count; a++) {
      mockScrollAssets.push({
        assetId: faker.random.number(),
        showname: faker.name.findName(),
        text: faker.lorem.sentence()
      });
    }
    return timer(300).pipe(mapTo(
      mockScrollAssets
    ));
  }
}
