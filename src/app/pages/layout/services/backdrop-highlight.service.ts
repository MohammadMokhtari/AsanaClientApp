import { ContentChild, EventEmitter, Injectable } from '@angular/core';
import { backdropDirective } from '../directives/backdrop.directive';

@Injectable({
  providedIn: 'root',
})
export class BackDropService {
  public backdropSelected = new EventEmitter<boolean>();
}
