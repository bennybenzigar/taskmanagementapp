import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  id!: number
  taskid: any
  updateDataArray: any = []
  authentcatedUser!: boolean
  constructor(private http: HttpClient) {



  }

  postData(data: any) {
    return this.http.post<any>(environment.baseUrl, data, { observe: 'response' })
  }

  getData() {
    return this.http.get<any>(environment.baseUrl)
  }

  DeleteData(id: any) {
    return this.http.delete<any>(environment.baseUrl + "/" + id)
  }

  updateData(id: any, data: any) {
    return this.http.put<any>(environment.baseUrl + '/' + id, data)
  }


  gettaskData() {
    return this.http.get<any>(environment.baseUrl + "/" + this.id)
  }


  postTaskData(data: any) {
    return this.http.patch<any>(environment.baseUrl + "/" + this.id + '/tasks', data, { observe: 'response' })
  }

  isAuthenticated() {

    if (this.authentcatedUser == true) {

      return true
    }
    else {
      return false
    }
  }
}
