import { Component, OnInit , OnDestroy} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  email: string = ""
  password: string = ""
  loginForm!: FormGroup
  data: string[] = []
  errorDiv: boolean=false;
  errorDivTxt: string="";
  isProcessing:boolean=false
  filterData:any=[]
  length!:number
   currentUser:any
   getDatas!:Subscription
  constructor(private formBuilder: FormBuilder, private dataService: DataService,private router:Router) {

  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({

      email: ['', Validators.required],
      password: ['', Validators.required
    ]

    })

    this.getData()

  }

  getData() {
  this.getDatas=  this.dataService.getData().subscribe(
      (res: any) => {
       
        this.data=res
      },
      (err:any)=>{
        console.log('error ' , err)
      },
      ()=>{
        console.log('data feteched successfully')
      }
      
      )
      
  }

  login() {
  
    this.isProcessing = true;
    this.errorDivTxt = "";
    this.errorDiv = false;
    this.getData();
    this.filterData = [];

    if (this.loginForm.valid) {
      this.email = this.loginForm.controls['email'].value.toLowerCase()
      this.password = this.loginForm.controls['password'].value;

      let user = {
        email: this.email,
        password: this.password,
        
      };

      this.filterData = this.data.filter((res: any) => res.email === this.email);
      this.length = this.filterData.length

      setTimeout(() => {
        if (this.filterData.length > 0 ) {
         
          if(this.filterData[0].password==this.password){
            this.currentUser={
              email:this.email,
              id:this.filterData[0].id,
              password:this.loginForm.controls['password'].value
              
            }

            localStorage.setItem("currentUser",JSON.stringify(this.currentUser))
            // this.router.navigate()
            console.log('login successfull')
          
            this.dataService.authentcatedUser=true
            this.isProcessing=false
            // this.errorDivTxt="login successfull"
            this.router.navigateByUrl('tasks')
          }
          else{
            
            this.errorDiv=true
            this.isProcessing=false
            this.errorDivTxt="please check your password"
          }

        } else {
          this.errorDiv=true
          console.log("email doesn't exist please check your emailid")
          this.isProcessing=false
          this.errorDivTxt="email doesn't exist please check your emailid"
        }

      }, 500);

    }
  }
 

  ngOnDestroy(): void {
    this.getDatas.unsubscribe()
  }
 
 
}

