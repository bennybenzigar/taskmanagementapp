import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './tasks.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { AuthGuard } from 'src/app/services/auth.guard';
import { NavbarComponent } from 'src/app/navbar/navbar.component';


@NgModule({
  declarations: [
    TasksComponent,
    CreateTaskComponent,
    EditTaskComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],

  providers:[
    DataService,AuthGuard
  ]
})
export class TasksModule { }
