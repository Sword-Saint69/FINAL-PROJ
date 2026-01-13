import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Apiservice } from '../../services'; // Assuming export in index or direct import needed
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-product-list',
    standalone: true,
    imports: [CommonModule, ProductCardComponent],
    template: `
    <div class="container">
      <header class="page-header">
        <h1 class="page-title">Curated Collection</h1>
        <p class="page-subtitle">Discover premium items selected just for you</p>
      </header>
      
      @if (loading()) {
        <div class="loading-state">
          <div class="spinner"></div>
        </div>
      } @else {
        <div class="grid-products">
          @for (product of products(); track product.id) {
            <app-product-card [product]="product" />
          }
        </div>
      }
    </div>
  `,
    styles: [`
    .page-header {
      padding: 4rem 0 2rem;
      text-align: center;
    }
    .page-title {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
      background: linear-gradient(135deg, var(--text) 0%, var(--primary) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .page-subtitle {
      color: var(--text-light);
      font-size: 1.1rem;
    }
    .loading-state {
      min-height: 50vh;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid var(--primary-light);
      border-top-color: var(--primary);
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
  `]
})
export class ProductListComponent implements OnInit {
    apiService = inject(Apiservice);
    products = signal<any[]>([]);
    loading = signal(true);

    ngOnInit() {
        this.apiService.getProduct().subscribe({
            next: (data: any) => {
                // Filter out products with invalid images for better aesthetics
                const validProducts = data.filter((p: any) =>
                    p.images && p.images.length > 0 &&
                    !p.images[0].includes('placeimg') &&
                    !p.images[0].includes('[') // filter out broken json strings sometimes in this api
                );
                this.products.set(validProducts);
                this.loading.set(false);
            },
            error: (err) => {
                console.error(err);
                this.loading.set(false);
            }
        });
    }
}
