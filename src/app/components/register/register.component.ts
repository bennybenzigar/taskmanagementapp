import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';

import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isProcessing: boolean = false;
  errorDiv: boolean = false;
  errorDivTxt: string = "";
  data: string[] = [];
  email: string = '';
  password: string = '';
  registerForm!: FormGroup;
  filterData: any[] = [];
  length!: number
dataLength!:number
  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private router: Router,
    // private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.getData();
    this.dataLength=this.data.length
  }

  getData() {
    this.dataService.getData().subscribe(
      (res: any) => {
       
        this.data = res;
      },
      (err: any) => {
        console.log('error ', err);
      },
      () => {
        console.log('data fetched successfully');
      }

    );
    
  }

  register() {
    this.isProcessing = true;
    this.errorDivTxt = "";
    this.errorDiv = false;
    this.getData();
    this.filterData = [];

    if (this.registerForm.valid) {
      this.email = this.registerForm.controls['email'].value.toLowerCase();
      this.password = this.registerForm.controls['password'].value;

      let user = {
        email: this.email,
        password: this.password,
        userId:this.dataLength
      };

      this.filterData = this.data.filter((res: any) => res.email === this.email);
      this.length = this.filterData.length

      setTimeout(() => {
        if (this.filterData.length > 0) {
          this.errorDiv = true;
          this.errorDivTxt = "User already exists";
          this.isProcessing = false;
        } else {

          
          this.dataService.postData(user).subscribe(
            (response: any) => {
              console.log(response, 'user created successfully');
              this.isProcessing = false;
              // this.toastr.success('User created successfully', 'Success');
              this.router.navigateByUrl('login');
            },
            (error: any) => {
              console.log('Account creation failed: ', error);
              this.isProcessing = false;
              // this.toastr.error('An error occurred', 'Error');
            }
          );
        }

      }, 500);

    }
  }
}
