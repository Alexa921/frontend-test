import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsComponent } from './products.component';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';
import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PeticionService } from '../../services/peticion.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProductsComponent,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe iniciar con la categoría vacía', () => {
    expect(component.categoria).toBe('');
  });

  it('debe tener data como un arreglo vacío al iniciar', () => {
    expect(component.data).toEqual([]);
  });

  it('debe asignar los valores de un producto en SeleccionarId()', async () => {
    (window as any).$ = jasmine.createSpy().and.returnValue({
      modal: jasmine.createSpy('modal'),
    });

    const productoMock = [{
      nombre: 'Producto prueba',
      codigo: 111,
      precio: 99.99,
      cantidad: 10,
      descripcion: 'Descripción de prueba',
      foto: 'foto.jpg',
      categoria: 'hogar'
    }];

    const peticionService = TestBed.inject(PeticionService);
    spyOn(peticionService, 'Post').and.returnValue(Promise.resolve(productoMock));

    await component.SeleccionarId('123');

    expect(component.nombre).toBe('Producto prueba');
    expect(component.codigo).toBe(111);
    expect(component.precio).toBe(99.99);
    expect(component.cantidad).toBe(10);
    expect(component.descripcion).toBe('Descripción de prueba');
    expect(component.foto).toBe('foto.jpg');
    expect(component.categoria).toBe('hogar');
  });

  it('debe limpiar los campos al ejecutar Nuevo()', () => {
    (window as any).$ = jasmine.createSpy().and.returnValue({
      modal: jasmine.createSpy('modal'),
    });

    component.nombre = 'Viejo';
    component.codigo = 123;
    component.precio = 10;
    component.cantidad = 2;
    component.descripcion = 'Vieja';
    component.foto = 'viejo.jpg';
    component.categoria = 'oficina';
    component.idseleccionado = 'abc';

    component.Nuevo();

    expect(component.nombre).toBe('');
    expect(component.codigo).toBe(0);
    expect(component.precio).toBe(0);
    expect(component.cantidad).toBe(0);
    expect(component.descripcion).toBe('');
    expect(component.foto).toBe('');
    expect(component.categoria).toBe('');
    expect(component.idseleccionado).toBe('');
  });

  it('debe llamar a ListarTodos al iniciar', () => {
    const spy = spyOn(component, 'ListarTodos');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('debe llenar data al ListarTodos()', async () => {
    const productosMock = [{ nombre: 'Producto 1' }, { nombre: 'Producto 2' }];

    const peticionService = TestBed.inject(PeticionService);
    spyOn(peticionService, 'Get').and.returnValue(Promise.resolve(productosMock));

    await component.ListarTodos();

    expect(component.data.length).toBe(2);
    expect(component.data[0].nombre).toBe('Producto 1');
  });
});
