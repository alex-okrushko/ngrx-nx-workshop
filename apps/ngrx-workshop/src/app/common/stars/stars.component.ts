import {
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'ngrx-nx-workshop-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss']
})
export class StarsComponent {
  @HostBinding('class.can-rate')
  @Input()
  canRate = false;

  @Input() rated = 0;
  @Input() rating = 0;

  @Output() ratingChange = new EventEmitter<number>();

  mouseOver = false;
  starOver = 0;

  @HostListener('mouseenter')
  onMouseEnter() {
    this.mouseOver = this.canRate;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.mouseOver = false;
  }

  starMouseEnter(star: number) {
    this.starOver = this.canRate ? star : 0;
  }

  starMouseLeave() {
    this.starOver = 0;
  }

  rate(star: number) {
    if (!this.canRate) {
      return;
    }
    this.rated = star;
    this.ratingChange.emit(star);
  }
}
