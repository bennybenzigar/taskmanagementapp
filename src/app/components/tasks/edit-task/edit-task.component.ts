import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit, OnDestroy{
  taskForm!: FormGroup
  isProcessing: boolean = false
  errorDivTxt: string = ''
  errorDiv: boolean = false
  currentUser:any
  currentId:any
  queryparamsSubscription!:Subscription
  currentUserId:any
  constructor(private activatedRoute:ActivatedRoute, private formBuilder:FormBuilder,private dataService:DataService,private router:Router){}

  ngOnInit(): void {

    if(this.dataService.updateDataArray.length==0){
      this.router.navigateByUrl('tasks')
    }
    this.getParams()
    this.taskForm = this.formBuilder.group(
      {
        title: ['', Validators.required],
        description: ['', Validators.required],
        status: ['', Validators.required]
      }
    )
    this.currentUser=localStorage.getItem("currentUser")
    this.currentUser=JSON.parse(this.currentUser)
    this.setFormData()
   
  }

  getParams(){
   this.queryparamsSubscription= this.activatedRoute.params.subscribe((res:Params)=>{
      this.currentId=res['id'],
      this.currentUserId=res['userId']

   
    })
  }

setFormData(){
  this.taskForm.controls['title'].setValue(this.dataService.updateDataArray[0].tasks.title),
  this.taskForm.controls['description'].setValue(this.dataService.updateDataArray[0].tasks.description)
  this.taskForm.controls['status'].setValue(this.dataService.updateDataArray[0].tasks.status)
}
  editData(){
    let taskData = {
      userid: this.currentUserId,
      email:this.currentUser.email,
      password:this.currentUser.password,
      tasks:{
        title: this.taskForm.controls['title'].value,
        description: this.taskForm.controls['description'].value,
        status: this.taskForm.controls['status'].value
      }
       
    }
    this.dataService.updateData(this.currentUser.id,taskData).subscribe((res:any)=>{
      console.log('updated successfully')
      this.router.navigateByUrl('tasks')
    })


  }

  ngOnDestroy(): void {
    this.taskForm.reset()
    this.dataService.updateDataArray.pop()
    this.queryparamsSubscription.unsubscribe()
  }
}
