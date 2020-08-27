import { Injectable, Type } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IActivity } from './shared/activity';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  url: string = 'https://www.boredapi.com/api/activity';

  constructor(private http: HttpClient) { 
  }

  getRandomActivity(): Observable<IActivity | HttpErrorResponse> {
    return this.http.get<IActivity>(this.url)
        .pipe(
          catchError(error => throwError(error))
        );
  }

  queryActivity(queriedActivity: IActivity): Observable<IActivity | HttpErrorResponse> {
    
    let queryUrl: string = '?';    
    let queryTypes: string;
    let queryParticipants: string;
    let queryPrice: string;
    let queryAccessibility: string;


    if(queriedActivity.type !== 'default'){

      queryTypes = `type=${queriedActivity.type}`;

    }
    
    if(queriedActivity.participants != 0){

      queryParticipants =`participants=${queriedActivity.participants.toString()}`;

    }

    if(queriedActivity.price){
      queryPrice = `minprice=${queriedActivity.price[0]}&maxprice=${queriedActivity.price[1]}`;
    }
    
    if(queriedActivity.accessibility){
      queryAccessibility = `minaccessibility=${queriedActivity.accessibility[0]}&maxaccessibility=${queriedActivity.accessibility[1]}`;
    }


    if(queryAccessibility == null && queryParticipants == null && queryPrice == null && queryPrice == null){
      
      return this.getRandomActivity();

    }
    else{

      if(queryTypes != null){
        queryUrl += queryTypes;
      }
      if(queryParticipants != null){
        queryUrl += '&' + queryParticipants;
      }
      if(queryPrice != null){
        queryUrl += '&' + queryPrice;
      }
      if(queryAccessibility != null){
        queryUrl += '&' + queryAccessibility;
      }

      console.log(queryUrl);
      
      return this.http.get<IActivity>(this.url + queryUrl)
        .pipe(
          catchError(error => throwError(error))
        );

    }
  }
}
