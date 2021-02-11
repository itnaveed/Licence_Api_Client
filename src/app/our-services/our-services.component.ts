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
title:string;
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
              id: [''],
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
let id = this.form.value.id;
if(id>0){
  this.ourServices.updateService(this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    debugger;
                    this.notificationsService.showNotification('top','right','Service Updated Succesfully..',2);
                    this.ourServices.getAll()
            .pipe()
            .subscribe(service => this.services = service);
                    ($('#buy') as any).modal('hide');
                    this.form.reset();
                    //this.alertService.success('Registration successful', { keepAfterRouteChange: true });
                    //this.router.navigate(['../login'], { relativeTo: this.route });
                },
                error: error => {
                  debugger
                    //this.alertService.error("Email Already Exist...");
                    this.notificationsService.showNotification('top','left',error,4)   
                }
            });
}else{

delete this.form.value.id;

  this.ourServices.addService(this.form.value)
  .pipe(first())
  .subscribe({
      next: () => {
          debugger;
          this.notificationsService.showNotification('top','right','Service Added Succesfully..',2);
          this.ourServices.getAll()
            .pipe()
            .subscribe(service => this.services = service);
                    ($('#buy') as any).modal('hide');
                    this.form.reset();
                    //this.alertService.success('Registrati
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
  update(id){
debugger
this.title = "Update Service";
const _service = this.services.find(x => x.id === id);

this.form.patchValue({
  id:_service.id,
  AppName: _service.appName,
  Version: _service.version,
  App_Code: _service.app_Code,
  Service_URL: _service.service_URL,
  Detail: _service.detail
});
($('#buy') as any).modal('show');
  }
  newServiceModal(){
    this.form.reset();
    this.title ="";
    ($('#buy') as any).modal('show');
  }

}
