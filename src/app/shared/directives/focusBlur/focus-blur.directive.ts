import {Directive, ElementRef, Input, OnChanges} from '@angular/core';

@Directive({
  selector: '[focus-blur]'
})
export class FocusBlurDirective implements OnChanges {
  @Input('focus-blur') state: boolean;
  private el: ElementRef;

  constructor(el: ElementRef) {
    this.el = el;
  }

  ngOnChanges() {
    if (this.state) {
      this.el.nativeElement.focus();
    } else {
      this.el.nativeElement.blur();
    }
  }
}
