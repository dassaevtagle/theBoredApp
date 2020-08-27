import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import noUiSlider from "nouislider";
import { NgForm } from '@angular/forms';
import { IActivity } from 'src/app/shared/activity';
import { ApiService } from 'src/app/api.service';

import swal from'sweetalert2';

@Component({
  selector: 'search-activity',
  templateUrl: './search-activity.component.html',
  styleUrls: ['./search-activity.component.scss']
})
export class SearchActivityComponent implements OnInit {

  @Output() onActivityQuery: EventEmitter<IActivity>;

  queriedActivity: IActivity = {
    activity: '',
    type: 'default',
    participants: 0,
    price: 0,
    link: '',
    key: '',
    accessibility: 0,
    error: ''
  }

  constructor( private api: ApiService) {
    this.onActivityQuery = new EventEmitter();
   }

  ngOnInit(): void {
    var sliderPart = document.getElementById("sliderDoubleParticipants") as noUiSlider.Instance;

    noUiSlider.create(sliderPart, {
      start: 0,
      connect: true,
      step: 1,
      range: {
        min: 0,
        max: 5
      }
   });

   var participantsField = document.getElementById('sliderNumberParticipants');
    
   sliderPart.noUiSlider.on('update', function (values, handle) {
    
    switch(values[handle]){
      case '0.00':
        participantsField.innerHTML = 'Default';
        break;
      
      default:
        participantsField.innerHTML = Math.round(values[handle]).toString();
        break;

    }

  });



    var sliderCost = document.getElementById("sliderDoubleCost") as noUiSlider.Instance;

    noUiSlider.create(sliderCost, {
      start: [0, 100],
      connect: true,
      range: {
        min: 0,
        max: 100
      }
    });


    var sliderCostValueElement = document.getElementById('sliderNumberCost');

    sliderCost.noUiSlider.on('update', function (values) {

        if(values[0] == 0.00) values[0] = 'Free';
        if(values[0] > 0.00 && values[0] <= 25) values[0] = 'Low';
        if(values[0] > 25 && values[0]<= 50) values[0] = 'Moderate';
        if(values[0] > 50 && values[0] <= 75) values[0] = 'May cost a little bit';
        if(values[0] > 75 && values[0] <= 100) values[0] = 'Could be expensive';

        if(values[1] == 0.00) values[1] = 'Free';
        if(values[1] > 0.00 && values[1] <= 25) values[1] = 'Low';
        if(values[1] > 25 && values[1]<= 50) values[1] = 'Moderate';
        if(values[1] > 50 && values[1] <= 75) values[1] = 'May cost a little bit';
        if(values[1] > 75 && values[1] <= 100) values[1] = 'Could be expensive';

     
        sliderCostValueElement.innerHTML = 'From:'+'&nbsp;'+values[0]+'&nbsp; To: &nbsp;'+values[1];
    });



    var sliderAcc = document.getElementById("sliderDoubleAccessibility") as noUiSlider.Instance;

    noUiSlider.create(sliderAcc, {
      range: {
        'min': 0,
        'max': 100
      },
      start: [0, 100],
      connect: true
    });

    var sliderAccValueElement = document.getElementById('sliderNumberAccessibility');

    sliderAcc.noUiSlider.on('update', function (values) {

      values[0] = Math.round(values[0])+'%';
      values[1] = Math.round(values[1])+'%';

        sliderAccValueElement.innerHTML = values.join(' - ');
    });
  }

  reset(){
    var type = (document.getElementById('type') as HTMLSelectElement);
    var sliderPart = document.getElementById("sliderDoubleParticipants") as noUiSlider.Instance;
    var sliderCost = document.getElementById("sliderDoubleCost") as noUiSlider.Instance;
    var sliderAcc = document.getElementById("sliderDoubleAccessibility") as noUiSlider.Instance;

    type.options[0].selected = true;
    this.queriedActivity.type = 'default';
    type.selectedIndex = 0;
    sliderPart.noUiSlider.reset();
    sliderCost.noUiSlider.reset();
    sliderAcc.noUiSlider.reset();

    this.queriedActivity = {
      activity: '',
      type: 'default',
      participants: 0,
      price: 0,
      link: '',
      key: '',
      accessibility: 0,
      error: ''
    }

  
    swal.fire(
      'Changes applied successfully',
      '',
      'success'
    )
  

    this.onActivityQuery.emit(this.queriedActivity);

  }

  onSubmit(form: NgForm) {
    var sliderPart = document.getElementById("sliderDoubleParticipants") as noUiSlider.Instance;
    var sliderCost = document.getElementById("sliderDoubleCost") as noUiSlider.Instance;
    var sliderAcc = document.getElementById("sliderDoubleAccessibility") as noUiSlider.Instance;


    this.queriedActivity.participants = parseInt(sliderPart.noUiSlider.get()); 
    this.queriedActivity.price = sliderCost.noUiSlider.get();
    this.queriedActivity.accessibility = sliderAcc.noUiSlider.get();

    this.queriedActivity.price[0] /= 100;
    this.queriedActivity.price[1] /= 100; 

    this.queriedActivity.price[0] = Math.round(this.queriedActivity.price[0] * 10) / 10;
    this.queriedActivity.price[1] = Math.round(this.queriedActivity.price[1] * 10) / 10;

    this.queriedActivity.accessibility[0] = 100 - this.queriedActivity.accessibility[0];
    this.queriedActivity.accessibility[1] = 100 - this.queriedActivity.accessibility[1];

    this.queriedActivity.accessibility[0] /= 100;
    this.queriedActivity.accessibility[1] /= 100;

    this.queriedActivity.accessibility[0] = Math.round(this.queriedActivity.accessibility[0] * 10) / 10;
    this.queriedActivity.accessibility[1] = Math.round(this.queriedActivity.accessibility[1] * 10) / 10;

    this.queriedActivity.accessibility = this.queriedActivity.accessibility.reverse();

    console.log(this.queriedActivity);

    this.api.queryActivity(this.queriedActivity)
      .subscribe(
        act => {if(act.error != null){
          console.log('Error: ' + act.error);
          console.log(act);
          swal.fire(
            'Oops...',
            act.error,
            'error'
          )
        }
        else{
          swal.fire(
            'Changes applied successfully',
            '',
            'success'
          )
        }}
      );
      
    this.onActivityQuery.emit(this.queriedActivity);
  }

}
