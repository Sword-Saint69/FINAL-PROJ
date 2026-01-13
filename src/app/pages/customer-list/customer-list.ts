import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Apiservice } from '../../services';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-list.html',
  styleUrl: './customer-list.css'
})
export class CustomerList implements OnInit {

  customers: any[] = [];
  loading = true;

  constructor(private service: Apiservice) {}

  ngOnInit(): void {
    this.service.getUsers().subscribe({
      next: (data:any) => {
        this.customers = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
