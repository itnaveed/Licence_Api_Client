import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from 'app/_services/notifications.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
form:FormGroup;
  submitted: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private notificationsService: NotificationsService,
  ) { }

  ngOnInit(): void {
this.form = this.formBuilder.group({

  Email: ['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
  Password: ['', Validators.required],
});
  }
  get f() { return this.form.controls; }
  onSubmit(){
    this.submitted = true;
    debugger;
        // reset alerts on submit
        
        if (this.form.invalid) {
            return;
        }
  }

}
