import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
  styleUrls: ['./infinite-scroll.component.scss']
})
export class InfiniteScrollComponent implements OnInit, OnDestroy {

  @Input() options = {};
  @Output() scrolled = new EventEmitter();
  @ViewChild('anchor', {static: true}) anchor: ElementRef<HTMLElement>;

  private observer: IntersectionObserver;

  constructor(private host: ElementRef) { }

  get element() {
    return this.host.nativeElement;
  }

  ngOnInit() {
    const options = {
      root: null,
      ...this.options
    };

    this.observer = new IntersectionObserver(([entry]) => {
      return entry.isIntersecting && this.scrolled.emit();
    }, options);

    this.observer.observe(this.anchor.nativeElement);
  }

  ngOnDestroy() {
    this.observer.unobserve(this.anchor.nativeElement);
  }

}
