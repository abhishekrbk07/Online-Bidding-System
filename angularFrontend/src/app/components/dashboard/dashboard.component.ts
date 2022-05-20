import { Component, OnInit } from '@angular/core';
import { BiddingService } from 'src/app/services/biddingservices/bidding.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  data: any;

  data1: any;
  displayedColumns: string[] = [
    'id',
    'productName',
    'description',
    'price',
    'username',
    'biddingPrice',
    'approved',
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private biddingService: BiddingService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.biddingService.getAllbids().subscribe({
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
      console.log(authUser);
      const id = authUser.id;

      console.log(id);
      this.biddingService.getAllbids().subscribe({
        next: (res) => {
         
        },
        error: () => {
          alert('Unsuccesful to get');
        },
      });
      this.biddingService.getNumberBidding().subscribe({
        next: (res) => {
         
          this.data = res;
          console.log(this.data);
        },
        error: () => {
          alert('Unsucessful to get');
        },
      });
    }
    this.biddingService.getNumberlisting().subscribe({
      next: (res) => {
       
        this.data1 = res;
        console.log(this.data1);
      },
      error: () => {
        alert('Unsucessful to get');
      },
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onClear() {
    sessionStorage.removeItem('authUser');
  }
}
