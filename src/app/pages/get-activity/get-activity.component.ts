import { Component, OnInit, Input } from '@angular/core';
import { IActivity } from 'src/app/shared/activity';
import { ApiService } from 'src/app/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import swal from'sweetalert2';

@Component({
  selector: 'get-activity',
  templateUrl: './get-activity.component.html',
  styleUrls: ['./get-activity.component.scss']
})
export class GetActivityComponent implements OnInit{

  @Input() activity: IActivity;

  @Input() activityQuery: Observable<IActivity>;

  query: IActivity;

  error;

  constructor(private api:ApiService) { }

  ngOnInit(): void {

    this.activityQuery.
      subscribe(
         act => {this.query = act}
      );
  }

  ngOnChanges(): void {
    
  }
  refresh(): void {

    if(this.query != null){
      this.api.queryActivity(this.query)
          .subscribe(
            act => {this.handleNewActivity(act)}
          );
    }
    else{
      this.api.getRandomActivity()
          .subscribe(
            act => {this.handleNewActivity(act)}
          );
    }
    
  }


  handleNewActivity(activity: IActivity | HttpErrorResponse): void {
    if(activity instanceof HttpErrorResponse){
      this.error = HttpErrorResponse.name;
      console.log(activity);
    }
    else if(activity.error != null){
      this.error = activity.error;
      console.log('Error: ' + activity.error);
      console.log(activity);
      swal.fire(
            'Oops...',
            activity.error,
            'error'
          )
    }

    else{
      this.error = null;
      console.log(activity);
      this.activity = activity;
    }
  }
}
