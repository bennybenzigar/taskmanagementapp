import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
  taskForm!: FormGroup
  isProcessing: boolean = false
  errorDivTxt: string = ''
  errorDiv: boolean = false
  currentUser:any
  constructor(private formBuilder: FormBuilder, private dataService: DataService, private router:Router) { }

  ngOnInit(): void {

    this.taskForm = this.formBuilder.group(
      {
        title: ['', Validators.required, ],
        description: ['', Validators.required],
        status: ['', Validators.required]
      }
    )
    this.currentUser=localStorage.getItem("currentUser")
    this.currentUser=JSON.parse(this.currentUser)

  }


  postData() {

    if (this.taskForm.valid) {

      let taskData = {
        userid: this.currentUser.id,
        email:this.currentUser.email,
        password:this.currentUser.password,
        tasks:{
          title: this.taskForm.controls['title'].value,
          description: this.taskForm.controls['description'].value,
          status: this.taskForm.controls['status'].value
        }
         
        
        
        

      }
     
      this.dataService.postData(taskData).subscribe((res: any) => {
       console.log('saved successfull')

       this.router.navigateByUrl('/tasks')
      })
    }
    else {
      console.log("invalid form")
    }

    
  }


  
}
