import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Services } from 'app/_Model/services';
import { NotificationsService } from 'app/_services/notifications.service';
import { ServicesService } from 'app/_services/services.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-our-services',
  templateUrl: './our-services.component.html',
  styleUrls: ['./our-services.component.css']
})
export class OurServicesComponent implements OnInit {
  form: FormGroup;
  services: Services[];
  submitted: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private ourServices: ServicesService,
    private notificationsService: NotificationsService
  ) { }

  ngOnInit(): void {
    this.ourServices.getAll()
            .pipe()
            .subscribe(service => this.services = service);

            this.form = this.formBuilder.group({
              AppName: ['', Validators.required],
              Version: ['', Validators.required],
              App_Code: ['', Validators.required],
              Service_URL: ['', Validators.required],
              Detail: [''],
          });
  }
  get f() { return this.form.controls; }
  onSubmit() {
    this.submitted = true;
debugger;
    // reset alerts on submit
    
    if (this.form.invalid) {
        return;
    }

    this.ourServices.addService(this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    debugger;
                    this.notificationsService.showNotification('top','right','Service Added Succesfully..',2)
                    //this.alertService.success('Registration successful', { keepAfterRouteChange: true });
                    //this.router.navigate(['../login'], { relativeTo: this.route });
                },
                error: error => {
                  debugger
                    //this.alertService.error("Email Already Exist...");
                    this.notificationsService.showNotification('top','left',error,4)   
                }
            });

  }

}
