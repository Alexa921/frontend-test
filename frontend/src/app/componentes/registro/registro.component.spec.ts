import { TestBed } from '@angular/core/testing';
import { RegistroComponent } from './registro.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { PeticionService } from '../../servicios/peticion.service';
import Notiflix from 'notiflix';
import { of } from 'rxjs';

describe('RegistroComponent', () => {
  let component: RegistroComponent;
  let fixture: any;
  let peticionService: jasmine.SpyObj<PeticionService>;

  beforeEach(async () => {
    const peticionSpy = jasmine.createSpyObj('PeticionService', ['Post'], {
      urlHost: 'http://localhost:3000'
    });

    await TestBed.configureTestingModule({
      imports: [
        RegistroComponent,
        HttpClientTestingModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: {} },
        { provide: PeticionService, useValue: peticionSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
    peticionService = TestBed.inject(PeticionService) as jasmine.SpyObj<PeticionService>;

    spyOn(Notiflix.Notify, 'failure');
    spyOn(Notiflix.Notify, 'success');
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar error si el campo nombre está vacío', () => {
    component.nombre = '';
    component.email = 'correo@ejemplo.com';
    component.password = '123456';
    const resultado = component.Registrar();
    expect(Notiflix.Notify.failure).toHaveBeenCalledWith('El campo del nombre es obligatorio');
    expect(resultado).toBeFalse();
  });

  it('debería mostrar error si el campo email está vacío', () => {
    component.nombre = 'Nombre';
    component.email = '';
    component.password = '123456';
    const resultado = component.Registrar();
    expect(Notiflix.Notify.failure).toHaveBeenCalledWith('El campo del email es obligatorio');
    expect(resultado).toBeFalse();
  });

  it('debería mostrar error si el campo password está vacío', () => {
    component.nombre = 'Nombre';
    component.email = 'correo@ejemplo.com';
    component.password = '';
    const resultado = component.Registrar();
    expect(Notiflix.Notify.failure).toHaveBeenCalledWith('El campo del password es obligatorio');
    expect(resultado).toBeFalse();
  });

  it('debería mostrar éxito si el servidor responde correctamente', async () => {
    component.nombre = 'Usuario';
    component.email = 'usuario@ejemplo.com';
    component.password = '123456';
    peticionService.Post.and.returnValue(Promise.resolve({ state: true, mensaje: 'Registro exitoso' }));

    const resultado = component.Registrar();
    expect(resultado).toBeTrue();

    // Esperar que la promesa se resuelva
    await fixture.whenStable();
    expect(Notiflix.Notify.success).toHaveBeenCalledWith('Registro exitoso');
  });

  it('debería mostrar error si el servidor responde con error', async () => {
    component.nombre = 'Usuario';
    component.email = 'usuario@ejemplo.com';
    component.password = '123456';
    peticionService.Post.and.returnValue(Promise.resolve({ state: false, mensaje: 'El correo ya existe' }));

    const resultado = component.Registrar();
    expect(resultado).toBeTrue();

    // Esperar que la promesa se resuelva
    await fixture.whenStable();
    expect(Notiflix.Notify.failure).toHaveBeenCalledWith('El correo ya existe');
  });
});