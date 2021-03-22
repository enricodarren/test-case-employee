import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';

// COMPONENT
import { EmployeeListComponent } from 'app/pages/login/employee-list/employee-list.component';
import { LoginComponent } from 'app/pages/login/login.component';
import { EmployeeCreateEditComponent } from 'app/pages/login/employee-create-edit/employee-create-edit.component';
import { EmployeeDetailComponent } from 'app/pages/login/employee-detail/employee-detail.component';

// MODAL
import { ModalConfirmationComponent } from 'app/modal/modal-confirmation/modal-confirmation.component';

// ANGULAR MATERIAL
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatCardModule,
    MatProgressSpinnerModule,
    NgxMatSelectSearchModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  declarations: [
    LoginComponent,
    EmployeeListComponent,
    ModalConfirmationComponent,
    EmployeeCreateEditComponent,
    EmployeeDetailComponent,
  ]
})

export class AdminLayoutModule { }
