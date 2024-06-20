import { Component, ElementRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataRetrivalService } from 'src/app/core/services/data-retrival.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {

  data: any = {
    books: [],
    authors: [],
    categories: []
  }
  bookForm!: FormGroup
  authorForm!: FormGroup
  submitted = false;
  currentComponent: string = 'overview';
  error: string | null = null;
  userName!: string;
  password!: string;
  biography!: string;
  nationality!: string;
  @ViewChild('close') close!: ElementRef
  @ViewChild('closeBookForm') closeBookForm!: ElementRef

  constructor(private dataRetrivalService: DataRetrivalService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getAllBook();
    this.getAllAuthor();
    this.getAllCategory();
    this.initForm();
  }

  ngOnChange() {
    this.data.books
  }

  initForm() {
    this.bookForm = this.formBuilder.group({
      bookTitle: ['', [Validators.required]],
      author: ['', [Validators.required]],
      category: ['', [Validators.required]],
      ISBN: ['', [Validators.required, Validators.pattern(/^\d{13}$/)]],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
    })

    this.authorForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      biography: ['', [Validators.required]],
      nationality: ['', [Validators.required]]
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.bookForm.controls;
  }

  get authorf(): { [key: string]: AbstractControl } {
    return this.authorForm.controls;
  }

  onBookFormSubmit() {
    this.submitted = true;

    if (this.bookForm.invalid) {
      return;
    }

    this.dataRetrivalService.addBookByAdmin(this.bookForm.value).subscribe({
      next: (response) => {
        this.data.books.push(response.data);
      },
      error: (err) => {
        console.log(err);
      }
    })

    this.closeBookForm.nativeElement.click()
  }

  onAuthorFormSubmit() {
    this.submitted = true;

    if (this.authorForm.invalid) {
      return;
    }

    this.userName = this.authorForm.value['userName'];
    this.password = this.authorForm.value['password'];
    this.biography = this.authorForm.value['biography'];
    this.nationality = this.authorForm.value['nationality'];

    this.dataRetrivalService.addAuthorByAdmin(this.userName, this.password, this.biography, this.nationality).subscribe({
      next: (response) => {
        this.data.authors.push(response.data);
      },
      error: (err) => {
        this.error = err.error.message
      },
    })

    this.close.nativeElement.click()
  }

  getAllBook() {
    this.dataRetrivalService.getAllBooksByAdmin().subscribe({
      next: (response) => {
        this.data.books = response.data
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getAllAuthor() {
    this.dataRetrivalService.getAllAuthor().subscribe({
      next: (response) => {
        this.data.authors = response.data
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getAllCategory() {
    this.dataRetrivalService.getAllCategory().subscribe({
      next: (response) => {
        this.data.categories = response.data
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  showComponent(component: string) {
    this.currentComponent = component;
  }
}
