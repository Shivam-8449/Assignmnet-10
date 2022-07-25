import { Component, OnInit } from '@angular/core';
import { TableServiceService } from '../services/api.service';
import { User} from '../user.model';
import { CustomerApiService } from '../services/customer-api.service';
import { RoleApiService } from '../services/role-api.service';
import {CRUD} from '../crudInterface';

@Component({
  selector: 'table-component',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit,CRUD<User> {
 
 cols: string[] = [];
 users:User[] = [];
 isEditable: boolean[] = [];
 customerList: {name:string,id:number}[] = [];
 roleList: {name:string,key:string}[] = [];
 isNewUser: boolean = false;
 
 constructor(private api:TableServiceService,private customers:CustomerApiService,private roles:RoleApiService)
  {
    
  }

  ngOnInit(): void {

    this.load();
  }

  load()
  {
   this.api.readData().subscribe(
      data => {
        for (let key in data[0]) {
          if (key !== "id") {
            this.cols.push(key);
          }
        }

        data.forEach((d:User) => {
          this.users.push(new User(d.firstname, d.middlename, d.lastname, d.email, d.phone, d.role, d.address, d.customer, d.created_on, d.modified_on,d.id));
          this.isEditable.push(false);
        });
      }
    );
  }
  
  create(user: User){
      this.isNewUser = false;
      this.api.create(user).subscribe(
        res =>
        {
          this.refresh();
        }
      );
      
  }
  read(): User[] {
      return this.users;
  }

  update(index:number)
  {
    this.isEditable[index] = true;
    this.customers.getCustomerList().subscribe(
    data =>
    {
      this.customerList = data;
    }
    );
    this.roles.getRoleList().subscribe(
      data =>
      {
        this.roleList = data;
      }
    )
  }
  
  save(user:User,index:number,row:HTMLTableRowElement)
  {
    this.isEditable[index] = false;
    
    let selectRoleEle = row.cells.namedItem('roleContainer')!.children[0] as HTMLSelectElement;
    let selectedRole = selectRoleEle.children[selectRoleEle.selectedIndex].textContent!;
    
    let selectCustEle = row.cells.namedItem('customerContainer')!.children[0] as HTMLSelectElement;
    let selectedCustomer = selectCustEle.children[selectCustEle.selectedIndex].textContent!;

    const body = {
         "id": user.id,
         "firstName": row.cells.namedItem('fName')!.textContent!,
         "middleName": row.cells.namedItem('mName')!.textContent!,
         "lastName": row.cells.namedItem('lName')!.textContent!,
         "email": row.cells.namedItem('email')!.textContent!,
         "phone": row.cells.namedItem('phone')!.textContent!,
         "address": row.cells.namedItem('address')!.textContent!,
         "role": selectRoleEle.value,
         "customer": selectCustEle.value
    }
    this.api.update(user.id!,body).subscribe();
    user.firstname = row.cells.namedItem('fName')!.textContent!;
    user.middlename = row.cells.namedItem('mName')!.textContent!;
    user.lastname = row.cells.namedItem('lName')!.textContent!;
    user.email = row.cells.namedItem('email')!.textContent!;
    user.phone = row.cells.namedItem('phone')!.textContent!;
    user.address = row.cells.namedItem('address')!.textContent!;
    user.customer = selectedCustomer;
    user.role = selectedRole;

    this.refresh();
  }

  delete(user: User,index:number)
  {
    this.api.deleteData(user.id!);
    this.users.splice(index,1);
  }

  cancel(index:number)
  {
    this.isEditable[index] = false;
    this.refresh();
  }
  refresh()
  {
    this.users = [];
    this.cols = [];
    this.isEditable = [];
    this.load();
  }
}



