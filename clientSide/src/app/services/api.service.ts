import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../user.model';
import {URL} from '../url';
import { TableComponent } from '../table/table.component';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableServiceService {
 
  constructor(private http:HttpClient) { }

  create(body:User)
  {
    return this.http.post(URL+'/add',body);

  }
  readData()
  {
    return this.http.get<User[]>(URL + '/users');    
  }

  update(id:number,body:Object)
  {
    return this.http.put(URL+'/update'+`/${id}`,body);
  }
  
  deleteData(id:number)
  {
    this.http.delete(URL+'/delete'+`/${id}`).subscribe();
  }

}

