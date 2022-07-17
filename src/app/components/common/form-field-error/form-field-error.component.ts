import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-field-error',
  templateUrl: './form-field-error.component.html',
  styleUrls: ['./form-field-error.component.css']
})
export class FormFieldErrorComponent implements OnInit {

  @Input() errorMessage?: string;
  @Input() showError?: boolean;


  constructor() { }

  ngOnInit(): void {
  }

}
