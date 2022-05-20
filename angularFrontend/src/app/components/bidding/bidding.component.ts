import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BiddingService } from 'src/app/services/biddingservices/bidding.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-bidding',
  templateUrl: './bidding.component.html',
  styleUrls: ['./bidding.component.css'],
})
export class BiddingComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'productName',
    'price',
    'description',
    'user_id',
    'action',
    'username',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private formBuilder: FormBuilder,
    private biddingService: BiddingService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllBidding();
  }
  // new component dialog
  openDialog() {
    this.dialog
      .open(DialogComponent, {
        width: '70%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'submit') {
          this.getAllBidding();
        }
      });
  }
  //getting list of bidding to view in table
  getAllBidding() {
    this.biddingService.getlistings().subscribe({
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
  }
  getAllBiddingid() {
    this.biddingService.getlistings().subscribe({
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
  }
  //filter
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  //editing bidding content the updated data into new component
  editBidding(row: any) {
    this.dialog
      .open(DialogComponent, { width: '50%', data: row })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'Update') {
          this.getAllBidding();
        }
      });
  }
  //deleting the bidding data
  deleteBidding(id: number) {
    this.biddingService.deletelistings(id).subscribe({
      next: (res) => {
        alert('Succesfully deleted');

        this.getAllBidding();
      },
      error: () => {
        alert('Unsuccesful to delete');
      },
    });
  }
  clear(){
    sessionStorage.removeItem('authUser')
  }
}
