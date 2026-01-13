import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-about',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="container page-content">
      <header class="page-header">
        <h1 class="page-title">About Us</h1>
        <p class="page-subtitle">We are redefining the digital shopping experience.</p>
      </header>

      <div class="content-grid">
        <div class="glass-panel text-section">
          <h2>Our Story</h2>
          <p>Founded in 2024, Store Inc. started with a simple belief: that shopping online should be as beautiful and enjoyable as visiting your favorite boutique. We curate only the finest products, ensuring quality and style in every item we offer.</p>
        </div>
        
        <div class="glass-panel image-section">
          <!-- Placeholder for an office or team image -->
          <div class="placeholder-image">Our Team</div>
        </div>

        <div class="glass-panel text-section full-width">
          <h2>Our Values</h2>
          <div class="values-grid">
            <div class="value-item">
              <h3>Quality</h3>
              <p>We never compromise on the quality of our products.</p>
            </div>
            <div class="value-item">
              <h3>Sustainability</h3>
              <p>We are committed to eco-friendly practices.</p>
            </div>
            <div class="value-item">
              <h3>Innovation</h3>
              <p>Always pushing the boundaries of what's possible in ecommerce.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .page-content { padding: 4rem 1.5rem; }
    .page-header { text-align: center; margin-bottom: 4rem; }
    .page-title { font-size: 3rem; margin-bottom: 1rem; color: var(--text); }
    .page-subtitle { font-size: 1.25rem; color: var(--text-light); }
    
    .content-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
      align-items: center;
    }
    
    @media (max-width: 768px) {
      .content-grid { grid-template-columns: 1fr; }
    }
    
    .glass-panel { padding: 2.5rem; }
    .text-section h2 { font-size: 2rem; margin-bottom: 1.5rem; color: var(--primary); }
    .text-section p { font-size: 1.1rem; line-height: 1.7; color: var(--text-light); }
    
    .image-section { 
      height: 300px; 
      display: flex; 
      align-items: center; 
      justify-content: center;
      background: rgba(var(--primary-h), 0.1);
    }
    .placeholder-image { font-size: 1.5rem; font-weight: 600; color: var(--primary); }
    
    .full-width { grid-column: 1 / -1; margin-top: 2rem; }
    
    .values-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 2rem;
      margin-top: 2rem;
    }
    
    .value-item h3 { font-size: 1.25rem; margin-bottom: 0.5rem; }
    .value-item p { font-size: 1rem; color: var(--text-light); }
  `]
})
export class AboutComponent { }
