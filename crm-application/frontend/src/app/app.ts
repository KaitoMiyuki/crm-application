import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcome } from './nx-welcome';
import { Customer } from '@crm-application/shared';
import { HttpClient } from '@angular/common/http';

@Component({
  imports: [NxWelcome, RouterModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private httpService = inject(HttpClient);

  protected title = 'frontend';

  callBackend() {
    this.httpService.get('http://localhost:3000/api/call-backend').subscribe((response) => {
      console.log('Response from backend API:', JSON.stringify(response));
    });
  }

  private customer: Customer = {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
  }

  constructor() {
    console.log('Customer:', this.customer);
  }
}
