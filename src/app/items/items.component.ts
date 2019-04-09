import { Component, OnInit,ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {RestService} from '../services/rest.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  displayedColumns: string[] = ['first_name', 'last_name', 'nick_name', 'email','birthdayDate'];
  public dataSource=new MatTableDataSource<UsersList>(ELEMENT_DATA);;
  public users;
  @ViewChild(MatPaginator) paginator: MatPaginator; 


  constructor(private rest:RestService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(){
    this.rest.getUsers().subscribe((data:{})=>{
      this.users=data;
      this.users=this.users.users;
      this.dataSource=new MatTableDataSource<UsersList>(this.users.docs);
      this.dataSource.paginator = this.paginator;
    })
  }


}
export interface UsersList {
  first_name: string;
  last_name: string;
  nick_name: string;
  email: string;
  birthdayDate:string;
}

const ELEMENT_DATA: UsersList[] = [
  {first_name: '1', last_name: '2', nick_name: '3', email: '4',birthdayDate:'5'},
];

