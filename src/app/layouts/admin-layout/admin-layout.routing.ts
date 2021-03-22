import { Routes } from '@angular/router';

import { EmployeeListComponent } from 'app/pages/login/employee-list/employee-list.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'employee-list',        component: EmployeeListComponent },
];
