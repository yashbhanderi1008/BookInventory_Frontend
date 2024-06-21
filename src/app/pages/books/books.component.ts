import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataRetrivalService } from 'src/app/core/services/data-retrival.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})

export class BooksComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['no', 'bookTitle', 'author', 'category', 'price'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Input() data: any;
  @Output() bookUpdate: EventEmitter<any> = new EventEmitter();
  @Output() bookDelete: EventEmitter<any> = new EventEmitter();

  openBook: any;
  submitted = false;
  form!: FormGroup;
  updateBook = false;
  @ViewChild('closeOffCanvas') closeOffCanvas!: ElementRef

  constructor(private formBuilder: FormBuilder, private dataRetrivalService: DataRetrivalService) {
    this.dataSource = new MatTableDataSource<any>([]);
  }
  ngOnInit(): void {
    this.dataSource.data = this.data.books;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  initForm() {
    this.form = this.formBuilder.group({
      bookTitle: [{ value: this.openBook.bookTitle, disabled: true }, [Validators.required]],
      author: [{ value: this.openBook.author, disabled: true }, [Validators.required]],
      category: [{ value: this.openBook.category, disabled: true }, [Validators.required]],
      ISBN: [{ value: this.openBook.ISBN, disabled: true }, [Validators.required, Validators.pattern(/^\d{13}$/)]],
      description: [{ value: this.openBook.description, disabled: true }, Validators.required],
      price: [{ value: this.openBook.price, disabled: true }, [Validators.required, Validators.min(0)]],
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.dataRetrivalService.updateBookByAdmin(this.form.value, this.openBook._id).subscribe({
      next: (response) => {
        this.bookUpdate.emit(response.data);
        this.dataSource.data = this.data.books;
      },
      error: (err) => {
        console.log(err)
      }
    })

    this.closeOffCanvas.nativeElement.click()
  }

  onDelete() {
    this.dataRetrivalService.deleteBookByAdmin(this.openBook._id).subscribe({
      next: (response) => {
        this.bookDelete.emit(this.openBook._id);
        this.dataSource.data = this.data.books;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  openOffcanvas(row: any) {
    this.updateBook = false;
    this.openBook = row;
    this.initForm();
  }

  formEditable() {
    this.updateBook = true;
    this.form.get('bookTitle')?.enable();
    this.form.get('author')?.enable();
    this.form.get('category')?.enable();
    this.form.get('ISBN')?.enable();
    this.form.get('description')?.enable();
    this.form.get('price')?.enable();
  }
}