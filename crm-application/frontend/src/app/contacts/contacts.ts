import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'frontend/environment';
import { Contact } from '@crm-application/shared';
import { Observable } from 'rxjs/internal/Observable';
import { AsyncPipe } from '@angular/common';
import { BehaviorSubject, tap } from 'rxjs';

@Component({
  selector: 'app-contacts',
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './contacts.html',
  styleUrl: './contacts.css',
})
export class Contacts {
  private httpService = inject(HttpClient);

  contactForm: FormGroup;
  contactsSubject$: BehaviorSubject<Contact[]> = new BehaviorSubject<Contact[]>([]);
  contacts$: Observable<Contact[]> = this.contactsSubject$.asObservable();
  contactsGet$: Observable<Contact[]> = this.httpService.get<Contact[]>(`${environment.apiUrl}/contacts`).pipe(
    tap((contacts) => this.contactsSubject$.next(contacts))
  );
  
  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.httpService.post(`${environment.apiUrl}/contacts`, this.contactForm.value).pipe(
        tap((value) => {
          this.contactsSubject$.next([...this.contactsSubject$.value, value]);
        })
      ).subscribe(() => {
        this.contactForm.reset();
      });
    }
  }

  onReset(): void {
    this.contactForm.reset();
  }
}
