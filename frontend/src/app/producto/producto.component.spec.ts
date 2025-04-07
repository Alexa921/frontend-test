import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductoComponent } from './producto.component';
import { CommonModule } from '@angular/common';

describe('ProductoComponent', () => {
  let component: ProductoComponent;
  let fixture: ComponentFixture<ProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductoComponent, CommonModule] // 👈 Aquí va ProductoComponent
    }).compileComponents();

    fixture = TestBed.createComponent(ProductoComponent);
    component = fixture.componentInstance;
  });

  it('debería mostrar el nombre y precio del producto', () => {
    component.producto = { nombre: 'Zapatillas Adidas', precio: 150 };
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Zapatillas Adidas');
    expect(compiled.querySelector('p')?.textContent).toContain('$150.00');
  });
});


