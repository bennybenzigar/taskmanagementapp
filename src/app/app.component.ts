import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'taskmanagement';
  constructor(){}
  ngOnInit(): void {
    alert(' to run the application use this command "npx json server --watch db.json --port 3000"')
  }
}
