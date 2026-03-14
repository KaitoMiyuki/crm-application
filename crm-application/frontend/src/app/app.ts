import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Contact } from '@crm-application/shared';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment';
import { Contacts } from "./contacts/contacts";

@Component({
  imports: [RouterModule, Contacts],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private httpService = inject(HttpClient);

  protected title = 'frontend';

  callBackend() {
    this.httpService.get(`${environment.apiUrl}/call-backend`).subscribe((response) => {
      console.log('Response from backend API:', JSON.stringify(response));
    });
  }

  private contact: Contact = {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
  }

  constructor() {
    console.log('Contact:', this.contact);
  }
}
