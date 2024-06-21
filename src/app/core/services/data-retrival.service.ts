import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataRetrivalService {

  constructor(private http: HttpClient) { }

  getAllBooksByAdmin():Observable<any>{
    return this.http.get('admin/getBook')
  }

  getAllAuthor():Observable<any>{
    return this.http.get('admin/getAuthor')
  }

  getAllCategory():Observable<any>{
    return this.http.get('admin/getCategory')
  }

  addBookByAdmin(book: any):Observable<any>{
    return this.http.post('admin/addBook', book)
  }

  addAuthorByAdmin(authorName: string, password: string, biography: string, nationality: string):Observable<any>{
    return this.http.post('admin/addAuthor', { authorName, password, biography, nationality })
  }

  updateBookByAdmin(book: any, bookId: any): Observable<any>{
    return this.http.put(`admin/bookUpdate/${bookId}`, book)
  }

  deleteBookByAdmin(bookId: any): Observable<any>{
    return this.http.delete(`admin/bookDelete/${bookId}`)
  }
}
