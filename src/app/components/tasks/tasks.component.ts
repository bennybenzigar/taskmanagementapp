import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  data: any

  // title:string='feg'
  // actions:string='geg'
  // status:string="geg"
  // description:string="rgeg"
  currentUser: any
  
  
  constructor(private dataService: DataService, private router: Router) {

  }
  ngOnInit(): void {
    this.currentUser = localStorage.getItem("currentUser")
    this.currentUser = JSON.parse(this.currentUser)
    this.dataService.id = this.currentUser.id
    if (this.dataService.id) {
      this.getData()
    }
  }

  getData() {
    this.dataService.getData().subscribe(
      (res: any) => {

        let data = res
        this.data = data.filter((ress: any) => ress.userid == this.currentUser.id)


      },
      (err: any) => {
        console.log('error ', err)
      },
      () => {
        console.log('data feteched successfully')
      }

    )
   
  }

  deleteData(data:any) {
    let id=data.id
   
    this.dataService.DeleteData(data.id).subscribe((res:any)=>{
      console.log(res,'deleted successfully')
     
      this.ngOnInit()
     
    })

  }
  edit(data:any) {
    this.dataService.updateDataArray.push(data)
 

    
    this.router.navigate(['tasks/edit',data.id,data.userid])

  }

  createTask() {

    this.dataService.taskid = this.data.length
    this.router.navigateByUrl('tasks/create')

  }
  
}
