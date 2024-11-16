import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';

const VALIDATORS_MESSAGE:any ={
  required: 'Should not be empty',
  email: 'Email is not valid'
}

@Component({
  selector: 'app-input-validation',
  templateUrl: './input-validation.component.html',
  styleUrls: ['./input-validation.component.css']
})
export class InputValidationComponent implements OnInit, OnChanges {
 
  @Input()
  control!:AbstractControl;

  @Input()
  showError:boolean = true;
  errorMessages:string[] = [];

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    this.checkValidation();
  }

  ngOnInit(): void {
    this.control.statusChanges.subscribe(()=>{
      this.checkValidation();
    });
    this.control.valueChanges.subscribe(()=>{
      this.checkValidation();
    })
  }

  checkValidation(){
    const errors = this.control.errors;
    if(!errors){
      this.errorMessages=[];
      return;
    }

    const errorKeys = Object.keys(errors);
  }
}
