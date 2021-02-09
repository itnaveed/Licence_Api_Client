import { Component, OnInit } from '@angular/core';
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'app/_services/notifications.service';
import { ServicesService } from 'app/_services/services.service';
import { UsersService } from 'app/_services/users.service';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users: unknown;
  form: FormGroup;
  submitted: boolean;
  service: any;
  selectID:any;
  selected=[];
  selectedItemsList=[];
  checkedIDs=[];
  notAssignService:any;
  user_id: any;
   obj = {};
  constructor(
    private userService: UsersService,
    private servicesService: ServicesService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private notificationsService: NotificationsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    
    this.userService.getAll()
            .pipe()
            .subscribe(users => this.users = users);
            this.form = this.formBuilder.group({
              FirstName: ['', Validators.required],
              LastName: ['', Validators.required],
              Email: ['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
              Password: ['', Validators.required],
              Address: ['', Validators.required],
              PhoneNo: ['', [Validators.required,Validators.pattern("^((\\+92-?)|0)?[0-9]{10}$")]],
              Cnic: ['', Validators.required],
              Gender: ['', Validators.required],
              IsActive: [''],
              
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
debugger

    this.userService.addUser(this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    debugger;
                    ($('#buy') as any).modal('hide');
                    this.ngOnInit()
                    this.notificationsService.showNotification('top','right','User Added Succesfully..',2)
                   
                },
                error: error => {
                    //this.alertService.error("Email Already Exist...");
                    ($('#buy') as any).modal('hide');
                    this.notificationsService.showNotification('top','left',error.error.message,4)
                    
                }
            });
  }
  AssignServices(id){
    this.servicesService.userServices(id)
    .pipe()
    .subscribe(services => this.service = services);
  }
  NotAssignServices(id){
    this.servicesService.notAssign(id)
    .pipe()
    .subscribe(service => this.notAssignService = service);
  }
  AllowedApp(id){
  debugger;
  this.checkedIDs=[];
    this.AssignServices(id);
    this.NotAssignServices(id);
            this.user_id = id;
            ($('#userServices') as any).modal('show');
  }

  removeAuthorize(id){
    debugger
this.servicesService.removeAuthorize(id)
            .subscribe({
                next: () => {
                    debugger;
                    this.deleteRow(id);
                    this.NotAssignServices(this.user_id);
                    this.notificationsService.showNotification('top','right','App aremove',2)
                },
                error: error => {
                  
                    this.notificationsService.showNotification('top','left',error.error.message,4)
                    
                }
            });
}
deleteRow(id){
  for(let i = 0; i < this.service.length; ++i){
      if (this.service[i].id === id) {
          this.service.splice(i,1);
      }
  }
}

onChange(checked ,item){

  debugger
  if(checked){
    this.checkedIDs.push({
      ServiceId: item,
      UserId:this.user_id
                  //UserId: this.use_id
                })
    } else {
      this.checkedIDs.splice(this.selected.indexOf(item), 1)
    }
}

assignApp(){
 
    debugger
    if(this.checkedIDs.length>0){
      this.servicesService.assignServices(this.checkedIDs)
      .pipe(first())
      .subscribe({
          next: () => {
              debugger;
              //($('#userServices') as any).modal('hide');
              this.checkedIDs=[];
              this.AllowedApp(this.user_id);
              this.notificationsService.showNotification('top','right','Services assign successfuly',2)
              //this.alertService.success('Registration successful', { keepAfterRouteChange: true });
              //this.router.navigate(['../login'], { relativeTo: this.route });

          },
          error: error => {
              //this.alertService.error("Email Already Exist...");
              ($('#buy') as any).modal('hide');
              this.notificationsService.showNotification('top','left',error.error.message,4)
              
          }
      });
    }
  
}

}