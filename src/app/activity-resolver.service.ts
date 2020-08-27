import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { Observable, of } from 'rxjs';

import { IActivity } from 'src/app/shared/activity';
import { ApiService } from 'src/app/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ActivityResolverService implements Resolve<IActivity | HttpErrorResponse>{

  constructor(private api: ApiService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IActivity | HttpErrorResponse> { 
    return this.api.getRandomActivity()
      .pipe(
        catchError(err => of(err))
      );
  }
}
