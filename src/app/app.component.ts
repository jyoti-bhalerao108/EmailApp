import { Component, OnInit, ElementRef } from '@angular/core';
import {
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';
import { NotificationService } from './notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  title = 'EmailApp';
  FormData: FormGroup;
  checkboxChecked: boolean = false;
  showEmail: boolean = false;
  showSMS: boolean = false;

  constructor(
    private builder: FormBuilder,
    private contact: NotificationService,
    private elementRef: ElementRef
  ) {
    this.FormData = this.builder.group({
      EmailAddress: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.email])
      ),
      Body: new FormControl('', [Validators.required]),
      From: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.email])
      ),
      Subject: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.email])
      ),
    });
  }

  ngOnInit() {}

  onCheckboxChange(e: any) {
    var inputValue = e.target.value;
    if (e.target.checked) {
      this.checkboxChecked = true;
      console.log('checked val:' + inputValue);      
      if (inputValue == 'Email') {        
        this.showEmail = true;
      }
      if (inputValue == 'SMS') {
        this.showSMS = true;
      }
    } else {    
      if (inputValue == 'Email') {
        this.showEmail = false;
      }
      if (inputValue == 'SMS') {
        this.showSMS = false;
      }
    }
  }
  onSubmit(FormData: any) {    
    if (this.FormData != undefined && this.FormData != null) {
      this.contact.SendEmail(FormData).subscribe({
        next: (response) => {
          console.log('Response', response);
        },

        error: (err: any) => {},
        complete: () => {},
      });
    }
  }
  cancel() {
    this.FormData.reset();
  }
}
