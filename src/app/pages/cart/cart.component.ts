import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-cart',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
    <div class="container cart-page">
      <h1 class="page-title">Your Cart</h1>
      
      @if (cartService.cartItems().length === 0) {
        <div class="empty-state glass-panel">
          <p>Your cart is empty.</p>
          <a routerLink="/" class="btn btn-primary">Start Shopping</a>
        </div>
      } @else {
        <div class="cart-layout">
          <div class="cart-items">
            @for (item of cartService.cartItems(); track item.id) {
              <div class="cart-item glass-panel">
                <img [src]="item.image" [alt]="item.title" class="item-image">
                <div class="item-details">
                  <h3>{{ item.title }}</h3>
                  <p class="item-price">\${{ item.price }}</p>
                </div>
                <div class="quantity-controls">
                  <button class="btn-icon" (click)="updateQuantity(item.id, item.quantity - 1)">-</button>
                  <span>{{ item.quantity }}</span>
                  <button class="btn-icon" (click)="updateQuantity(item.id, item.quantity + 1)">+</button>
                </div>
                <div class="item-total">
                  \${{ item.price * item.quantity | number:'1.2-2' }}
                </div>
                <button class="remove-btn" (click)="removeItem(item.id)">×</button>
              </div>
            }
          </div>
          
          <div class="cart-summary glass-panel">
            <h2>Summary</h2>
            <div class="summary-row">
              <span>Subtotal</span>
              <span>\${{ cartService.totalPrice() | number:'1.2-2' }}</span>
            </div>
            <div class="summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <hr>
            <div class="summary-row total">
              <span>Total</span>
              <span>\${{ cartService.totalPrice() | number:'1.2-2' }}</span>
            </div>
            <button class="btn btn-primary btn-block">Checkout</button>
          </div>
        </div>
      }
    </div>
  `,
    styles: [`
    .cart-page { padding: 2rem 1.5rem; }
    .page-title { margin-bottom: 2rem; font-size: 2rem; }
    
    .empty-state {
      padding: 4rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
    }
    
    .cart-layout {
      display: grid;
      grid-template-columns: 1fr 350px;
      gap: 2rem;
      align-items: start;
    }
    
    @media (max-width: 768px) {
      .cart-layout { grid-template-columns: 1fr; }
    }
    
    .cart-item {
      display: flex;
      align-items: center;
      padding: 1rem;
      margin-bottom: 1rem;
      gap: 1.5rem;
      position: relative;
    }
    
    .item-image {
      width: 80px;
      height: 80px;
      object-fit: cover;
      border-radius: 8px;
    }
    
    .item-details { flex: 1; }
    .item-details h3 { font-size: 1rem; margin-bottom: 0.25rem; }
    .item-price { color: var(--text-light); }
    
    .quantity-controls {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      background: rgba(0,0,0,0.05);
      padding: 0.25rem;
      border-radius: 8px;
    }
    
    .btn-icon {
      width: 24px;
      height: 24px;
      border: none;
      background: white;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    
    .item-total {
      font-weight: 600;
      min-width: 80px;
      text-align: right;
    }
    
    .remove-btn {
      border: none;
      background: none;
      font-size: 1.5rem;
      color: var(--text-light);
      cursor: pointer;
      line-height: 1;
      padding: 0.5rem;
    }
    
    .cart-summary { padding: 1.5rem; }
    .cart-summary h2 { margin-bottom: 1.5rem; font-size: 1.25rem; }
    
    .summary-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;
    }
    
    .summary-row.total {
      font-weight: 700;
      font-size: 1.25rem;
      margin-top: 1rem;
    }
    
    hr {
      border: none;
      border-top: 1px solid rgba(0,0,0,0.1);
      margin: 1rem 0;
    }
    
    .btn-block { width: 100%; margin-top: 1rem; }
  `]
})
export class CartComponent {
    cartService = inject(CartService);

    updateQuantity(id: number, qty: number) {
        this.cartService.updateQuantity(id, qty);
    }

    removeItem(id: number) {
        this.cartService.removeFromCart(id);
    }
}
