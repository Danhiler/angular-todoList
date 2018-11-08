import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CountByPipe} from './pipes/count-by.pipe';
import { FocusBlurDirective } from './directives/focusBlur/focus-blur.directive';

@NgModule({
  declarations: [CountByPipe, FocusBlurDirective],
  imports: [
    CommonModule
  ],
  exports: [
    CountByPipe,
    FocusBlurDirective
  ]
})
export class SharedModule {
}
