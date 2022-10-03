import {
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output
} from '@angular/core';
import { Rating } from '@ngrx-nx-workshop/api-interfaces';

@Component({
  selector: 'ngrx-nx-workshop-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss']
})
export class StarsComponent {
  @HostBinding('class.can-rate')
  @Input()
  canRate = false;

  @Input() rated: number|undefined = 0;
  @Input() rating = 0;

  @Output() ratingChange = new EventEmitter<Rating>();

  mouseOver = false;
  starOver = 0;

  readonly availableOptions: Rating[] = [1, 2, 3, 4, 5];

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

  rate(star: Rating) {
    if (!this.canRate) {
      return;
    }
    this.rated = star;
    this.ratingChange.emit(star);
  }
}
