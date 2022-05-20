import { Component, OnInit } from '@angular/core';
import { BiddingService } from 'src/app/services/biddingservices/bidding.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AfterViewInit, ViewChild } from '@angular/core';
@Component({
  selector: 'app-userboard',
  templateUrl: './userboard.component.html',
  styleUrls: ['./userboard.component.css']
})
export class UserboardComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'price',
    'productDescription',
    'productName',
    'userId',
    'action',
   

  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private biddingService:BiddingService,public dialog: MatDialog) { }
  
  ngOnInit(): void {
    const authUserString = sessionStorage.getItem('authUser');
      
  
 
    if (authUserString) {
      const authUser = JSON.parse(authUserString);
      console.log(authUser)
      const id= authUser.id
      
      console.log(id);
    

      this.biddingService.getAlllistingsId(id).subscribe({
        next: (response: any) => {
          console.log(response);
          this.dataSource = new MatTableDataSource(response);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          alert('Successful to get');
        },
        
      })
      
  }
  
}
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) { 
    this.dataSource.paginator.firstPage();
  }
}
onClear(){
  sessionStorage.removeItem('authUser')
}
  }
