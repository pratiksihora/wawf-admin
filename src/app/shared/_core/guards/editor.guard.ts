import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, Router, RouterStateSnapshot } from '@angular/router';

// External Modules
import { of } from 'rxjs';

// Components
import { EditorComponent } from 'src/app/modules/business-base/workspace/editor/editor.component';

@Injectable({ providedIn: 'root' })
export class EditorDeactivateGuard implements CanDeactivate<EditorComponent> {
  canDeactivate(component: EditorComponent,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot, nextState: RouterStateSnapshot) {
    if (nextState.url.indexOf('publish') === -1) {
      const result = confirm('Please ensure that you have saved all your changes before leaving. Are you sure?');
      return of(result);
    }
    return of(true);
  }
} 