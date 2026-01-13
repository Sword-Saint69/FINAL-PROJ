import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-contact',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <div class="container page-content">
      <header class="page-header">
        <h1 class="page-title">Get in Touch</h1>
        <p class="page-subtitle">We'd love to hear from you. Send us a message.</p>
      </header>

      <div class="contact-layout">
        <div class="glass-panel contact-form-wrapper">
          <form (submit)="onSubmit($event)">
            <div class="form-group">
              <label for="name">Name</label>
              <input type="text" id="name" placeholder="Your Name" class="form-control" required>
            </div>
            
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" id="email" placeholder="your@email.com" class="form-control" required>
            </div>
            
            <div class="form-group">
              <label for="message">Message</label>
              <textarea id="message" rows="5" placeholder="How can we help?" class="form-control" required></textarea>
            </div>
            
            <button type="submit" class="btn btn-primary btn-block">Send Message</button>
          </form>
        </div>

        <div class="contact-info">
          <div class="glass-panel info-card">
            <h3>Visit Us</h3>
            <p>123 Commerce St.<br>Tech City, TC 90210</p>
          </div>
          
          <div class="glass-panel info-card">
            <h3>Email Us</h3>
            <p>hello\@storeinc.com</p>
          </div>
          
          <div class="glass-panel info-card">
            <h3>Call Us</h3>
            <p>+1 (555) 123-4567</p>
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
    
    .contact-layout {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 3rem;
      max-width: 1000px;
      margin: 0 auto;
    }
    
    @media (max-width: 768px) {
      .contact-layout { grid-template-columns: 1fr; }
    }
    
    .glass-panel { padding: 2rem; }
    
    .form-group { margin-bottom: 1.5rem; }
    
    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: var(--text);
    }
    
    .form-control {
      width: 100%;
      padding: 0.8rem 1rem;
      border: 1px solid rgba(0,0,0,0.1);
      border-radius: 8px;
      background: rgba(255,255,255,0.9);
      font-family: inherit;
      font-size: 1rem;
      transition: all 0.2s;
    }
    
    .form-control:focus {
      outline: none;
      border-color: var(--primary);
      box-shadow: 0 0 0 3px rgba(var(--primary-h), 0.1);
    }
    
    .btn-block { width: 100%; }
    
    .contact-info {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    
    .info-card h3 { font-size: 1.1rem; margin-bottom: 0.5rem; color: var(--primary); }
    .info-card p { color: var(--text-light); line-height: 1.5; }
  `]
})
export class ContactComponent {
    onSubmit(event: Event) {
        event.preventDefault();
        alert('Message sent! We will get back to you soon.');
    }
}
