import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private http: HttpClient) { }

  register(authorName: string, password: string, biography: string, nationality: string): Observable<any> {
    return this.http.post('author/signUp', { authorName, password, biography, nationality })
  }

  loginAuthor(authorName: string, password: string): Observable<any> {
    return this.http.post('author/login', { authorName, password })
  }

  loginAdmin(userName: string, password: string): Observable<any>{
    return this.http.post('admin/login', { userName, password })
  }
}
