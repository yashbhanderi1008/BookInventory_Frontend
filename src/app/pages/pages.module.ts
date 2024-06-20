import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { PagesRoutingModule } from './pages-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BooksComponent } from './books/books.component';
import { OverviewComponent } from './overview/overview.component';
import { AuthorsComponent } from './authors/authors.component';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    BooksComponent,
    OverviewComponent,
    AuthorsComponent
  ],
  imports: [
    CommonModule,MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
