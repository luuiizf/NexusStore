import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { User } from '../models/user.model';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'http://localhost:3000';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  
  currentUser$ = this.currentUserSubject.asObservable();
  
  constructor(
    private http: HttpClient,
    private storage: LocalStorageService
  ) {
    const storedUser = this.storage.retrieve('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(storedUser);
    }
  }

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  get isAuthenticated$(): Observable<boolean> {
    return this.currentUserSubject.pipe(
      map(user => !!user)
    );
  }

  login(email: string, password: string): Observable<User> {
    return this.http.get<User[]>(`${this.API_URL}/users`).pipe(
      map(users => {
        const user = users.find(u => u.email === email && u.password === password);
        if (!user) {
          throw new Error('Usuário ou senha inválidos');
        }
        return user;
      }),
      tap(user => {
        this.storage.store('currentUser', user);
        this.currentUserSubject.next(user);
      })
    );
  }

  logout(): void {
    this.storage.clear('currentUser');
    this.currentUserSubject.next(null);
  }
}