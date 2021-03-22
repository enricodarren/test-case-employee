import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { ModalConfirmationComponent } from 'app/modal/modal-confirmation/modal-confirmation.component';
import { EmployeeCreateEditComponent } from '../employee-create-edit/employee-create-edit.component';
import { EmployeeDetailComponent } from '../employee-detail/employee-detail.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  dataLength = 0;
  paginatorSize = 10;
  page = 1;

  initDataEmployee;
  dataSource: any = [];
  dataUser: any = [];

  searchEmployee = new FormControl();

  constructor(
    private dialog: MatDialog,
  ) {
    this.searchEmployee.valueChanges.subscribe(res => {
      let dataFilter;
      const initData = JSON.parse(localStorage.getItem('dataDummy'));
  
      dataFilter = initData.filter(data => {
        if ((data.first_name.toLowerCase().includes(res) || data.last_name.toLowerCase().includes(res) || data.email.toLowerCase().includes(res) && data.status == false)) {
          return true;
        }
      })
      console.log
      this.dataLength = dataFilter.length;
      this.dataSource = this.paginator(dataFilter, this.page, this.paginatorSize)
      this.dataUser = this.dataSource.data.filter(data => { if (!data.status) { return true } });
    })
  }

  ngOnInit(): void {
    this.initDataEmployee = JSON.parse(localStorage.getItem('dataDummy'));
    this.dataLength = this.initDataEmployee.length;
    this.dataSource = this.paginator(this.initDataEmployee, this.page, this.paginatorSize)
    this.dataUser = this.dataSource.data.filter(data => { if (!data.status) { return true } });
  }

  getNext(e: PageEvent) {
    this.page = e.pageIndex + 1;
    this.dataSource = this.paginator(this.initDataEmployee, this.page, this.paginatorSize)
    this.dataUser = this.dataSource.data.filter(data => { if (!data.status) { return true } });
  }

  paginator(items, current_page, per_page_items) {
    let page = current_page || 1,
      per_page = per_page_items || 10,
      offset = (page - 1) * per_page,

      paginatedItems = items.slice(offset).slice(0, per_page_items),
      total_pages = Math.ceil(items.length / per_page);

    return {
      page: page,
      per_page: per_page,
      pre_page: page - 1 ? page - 1 : null,
      next_page: (total_pages > page) ? page + 1 : null,
      total: items.length,
      total_pages: total_pages,
      data: paginatedItems
    };
  }

  sortData(sort: Sort) {
    const data = this.dataUser.slice();
    if (!sort.active || sort.direction === '') {
      this.dataUser = data;
      return;
    }

    this.dataUser = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id': return this.compare(a.id, b.id, isAsc);
        case 'name': return this.compare(a.first_name, b.first_name, isAsc);
        case 'email': return this.compare(a.email, b.email, isAsc);
        case 'group': return this.compare(a.group, b.group, isAsc);
        default: return 0;
      }
    });
  }
  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  detail(item) {
    const dialogRef = this.dialog.open(EmployeeDetailComponent, {
      width: '40vw',
      height: '80vh',
      data: {
        data: item,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("result ", result);
    })
  }

  add(item) {
    const dialogRef = this.dialog.open(EmployeeCreateEditComponent, {
      width: '35vw',
      data: {
        origin: "Add",
        data: item,
        dataLen: this.dataLength,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.initDataEmployee = JSON.parse(localStorage.getItem('dataDummy'));
        this.dataLength = this.initDataEmployee.length;
        this.dataSource = this.paginator(this.initDataEmployee, this.page, this.paginatorSize)
        this.dataUser = this.dataSource.data.filter(data => { if (!data.status) { return true } });
      }
    })
  }

  edit(item) {
    const dialogRef = this.dialog.open(EmployeeCreateEditComponent, {
      width: '35vw',
      data: {
        origin: "Edit",
        data: item,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.initDataEmployee = JSON.parse(localStorage.getItem('dataDummy'));
        this.dataLength = this.initDataEmployee.length;
        this.dataSource = this.paginator(this.initDataEmployee, this.page, this.paginatorSize)
        this.dataUser = this.dataSource.data.filter(data => { if (!data.status) { return true } });
      }
    })
  }

  delete(item) {
    const dialogRef = this.dialog.open(ModalConfirmationComponent, {
      width: '25vw',
      data: {
        data: item,
        message: `Are you sure want to delete this <b>${item.first_name} ${item.last_name}</b> ?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.initDataEmployee.forEach((element, index) => {
          if (element.id == item.id) {
            element.status = true
            this.dataSource = this.paginator(this.initDataEmployee, this.page, this.paginatorSize);
            this.dataUser = this.dataSource.data.filter(data => { if (!data.status) { return true } });
            localStorage.setItem('dataDummy', JSON.stringify(this.initDataEmployee));
          }
        });
      }
    });
  }
}
