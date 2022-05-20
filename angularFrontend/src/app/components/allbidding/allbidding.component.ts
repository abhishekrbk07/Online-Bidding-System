import { Component, OnInit } from '@angular/core';
import { BiddingService } from 'src/app/services/biddingservices/bidding.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-allbidding',
  templateUrl: './allbidding.component.html',
  styleUrls: ['./allbidding.component.css']
})
export class AllbiddingComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'productName', 
    'description', 
    'price',
    'username',
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
 
  constructor(private biddingService:BiddingService,
   public dialog: MatDialog) { }
  
    

  ngOnInit(): void {
    this.biddingService.getAllbidslistings().subscribe({
      next: (response: any) => {
        console.log(response);
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        alert('Data Fetched Successfully');
      },
      error: (err) => {
        alert('error while fetching records');
      },
    });
    const authUserString = sessionStorage.getItem('authUser');
      
    console.log(authUserString);
 
    if (authUserString) {
      const authUser = JSON.parse(authUserString);
      console.log(authUser)
      const id= authUser.id
      
      console.log(id);
      this.biddingService.getlistings().subscribe({
        next: (res) => {
          console.log(res);
        },
        error: () => {
          alert('Unsuccesful to get');
        },
      });
    }
  
  } 
    
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
    onClear()
    {
      sessionStorage.removeItem('authUser');
    }
    }