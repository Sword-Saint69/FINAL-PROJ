import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Apiservice } from '../../services';
import { CartService } from '../../services/cart.service';

@Component({
    selector: 'app-product-detail',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
    <div class="container page-content">
      @if (loading()) {
        <div class="loading-state">
          <div class="spinner"></div>
        </div>
      } @else if (product()) {
        <div class="back-link">
          <a routerLink="/" class="btn-text">← Back to Products</a>
        </div>
        
        <div class="product-detail-grid">
          <div class="product-gallery glass-panel">
            <img [src]="product().images[0]" [alt]="product().title" class="product-image">
          </div>
          
          <div class="product-info glass-panel">
            <h1 class="product-title">{{ product().title }}</h1>
            <p class="product-price">\${{ product().price }}</p>
            
            <p class="product-description">{{ product().description }}</p>
            
            <button class="btn btn-primary btn-lg" (click)="addToCart()">
              Add to Cart
            </button>
          </div>
        </div>
      } @else {
        <div class="error-state">
          <p>Product not found.</p>
          <a routerLink="/" class="btn btn-primary">Go Home</a>
        </div>
      }
    </div>
  `,
    styles: [`
    .page-content { padding: 2rem 1.5rem; }
    
    .back-link { margin-bottom: 2rem; }
    .btn-text { color: var(--text-light); font-weight: 500; }
    .btn-text:hover { color: var(--primary); }
    
    .product-detail-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
      align-items: start;
    }
    
    @media (max-width: 768px) {
      .product-detail-grid { grid-template-columns: 1fr; }
    }
    
    .glass-panel { padding: 2rem; }
    
    .product-image {
      width: 100%;
      border-radius: 8px;
    }
    
    .product-title { font-size: 2.5rem; margin-bottom: 1rem; line-height: 1.2; }
    .product-price { font-size: 2rem; color: var(--primary); font-weight: 700; margin-bottom: 2rem; }
    .product-description { font-size: 1.1rem; line-height: 1.7; color: var(--text-light); margin-bottom: 3rem; }
    
    .btn-lg {
      width: 100%;
      padding: 1rem;
      font-size: 1.1rem;
    }
    
    .loading-state { min-height: 50vh; display: flex; justify-content: center; align-items: center; }
    .spinner {
      width: 40px; height: 40px;
      border: 4px solid var(--primary-light);
      border-top-color: var(--primary);
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
  `]
})
export class ProductDetailComponent implements OnInit {
    route = inject(ActivatedRoute);
    apiService = inject(Apiservice);
    cartService = inject(CartService);

    product = signal<any>(null);
    loading = signal(true);

    ngOnInit() {
        this.route.params.subscribe(params => {
            const id = params['id'];
            if (id) {
                this.apiService.getsingleProducts(id).subscribe({
                    next: (res) => {
                        this.product.set(res);
                        this.loading.set(false);
                    },
                    error: (err) => {
                        console.error(err);
                        this.loading.set(false);
                    }
                });
            }
        });
    }

    addToCart() {
        if (this.product()) {
            this.cartService.addToCart(this.product());
        }
    }
}
