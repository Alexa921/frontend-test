import { TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('LoginComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],  // Asegúrate de agregarlo a 'declarations'
      imports: [HttpClientTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: {} } // Proveemos un valor simulado de ActivatedRoute
      ],
      schemas: [NO_ERRORS_SCHEMA] // Si hay problemas con elementos no definidos en el template (como iconos, etc.)
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
