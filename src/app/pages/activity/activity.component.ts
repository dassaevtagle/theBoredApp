import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { IActivity } from 'src/app/shared/activity';
import { HttpErrorResponse } from '@angular/common/http';



@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

  @Output() onQuery: EventEmitter<IActivity>;
  activity: IActivity;


  constructor(private route: ActivatedRoute) {
    this.onQuery = new EventEmitter;
  }


  ngOnInit(): void {
    let resolvedData: IActivity | HttpErrorResponse = this.route.snapshot.data['resolvedActivity'];

    if(resolvedData instanceof HttpErrorResponse){
      console.log(HttpErrorResponse);
    }

    else {
      this.activity = resolvedData;
      console.log(resolvedData);
    }
  }

  passActivityQuery(activity: IActivity): void{
    this.onQuery.emit(activity);
  }

  

 

}
