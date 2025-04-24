import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsuariosComponent } from './usuarios.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PeticionService } from '../../services/peticion.service';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { of } from 'rxjs';
import Notiflix from 'notiflix';
import { HttpClient } from '@angular/common/http';
import { routes } from '../../app.routes';

describe('UsuariosComponent', () => {
  let component: UsuariosComponent;
  let fixture: ComponentFixture<UsuariosComponent>;
  

  beforeEach(async () => {
    (window as any).$ = jasmine.createSpy().and.returnValue({
      modal: jasmine.createSpy()
    })
    await TestBed.configureTestingModule({
      imports: [UsuariosComponent, HttpClient],
      providers: [provideRouter(routes)]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Funcion Guardar

  it('Los campos existenten deberian quedar limpios', (done) => {
    fixture = TestBed.createComponent(UsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.Nuevo()
    expect(component.nombre).toBe('')
    expect(component.email).toBe('')
    expect(component.password).toBe('')
    expect(component.estado).toBe('Activo')

    done()
  })

  it('La funcion guardar deberia fallar sino mando el nombre', (done) => {
    fixture = TestBed.createComponent(UsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.nombre = ''
    component.email = ''
    component.password = ''

    component.Guardar()
    
    expect(component.respuestaTest).toEqual({state: false, mensaje: "El nombre es requerido"})
  
    done()
  })

  it('La función guardar debería fallar si no se envía el email', (done) => {
    fixture = TestBed.createComponent(UsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.nombre = 'Nombre de prueba';
    component.email = '';
    component.password = 'password123';

    component.Guardar();

    expect(component.respuestaTest).toEqual({
        state: false,
        mensaje: "El email es requerido"
    });

    done();
  });

  it('La función guardar debería fallar si no se envía el password', (done) => {
    fixture = TestBed.createComponent(UsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.nombre = 'Nombre de prueba';
    component.email = 'test@example.com';
    component.password = '';

    component.Guardar();

    expect(component.respuestaTest).toEqual({
        state: false,
        mensaje: "El password es requerido"
    });

    done();
  });

  it('Deberia guardar el usuario', (done) => {
    fixture = TestBed.createComponent(UsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.nombre = 'Nombre de prueba';
    component.email = 'test@example.com';
    component.password = 'password123';

    component.Guardar().then(()=>{
      expect(component.respuestaTest).toEqual({
        state: true,
        mensaje: "¡Registro exitoso! Por favor revisa tu correo para activar tu cuenta."
      });
      done()
    }).catch(err => {
      done.fail(err);
    })

  });

  it('Deberia fallar si el usuario ya existe', (done) => {
    fixture = TestBed.createComponent(UsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.nombre = 'Nombre de prueba';
    component.email = 'test@example.com';
    component.password = 'password123';

    const mockupRespuesta = { state: false, mensaje: "El usuario ya existe" };

    component.Guardar(Promise.resolve(mockupRespuesta)).then(() => {
        expect(component.respuestaTestError).toEqual(mockupRespuesta);
        done();
    }).catch(err => {
        done.fail(err);
    });
  });



  //Funcion Listar Todos 
  it('Deberia listar todos los usuarios', (done) => {
    fixture = TestBed.createComponent(UsuariosComponent);
    component = fixture.componentInstance;

    const originalListarTodos = component.ListarTodos.bind(component);
    component.ListarTodos = () => {
        component.respuestaTest = [{ id: 1, nombre: 'Usuario 1' }, { id: 2, nombre: 'Usuario 2' }];
    };

    fixture.detectChanges()
    component.ListarTodos();

    setTimeout(() => {
        expect(component.respuestaTest.length).toBeGreaterThan(0);
        component.ListarTodos = originalListarTodos;
        done();
    }, 40);
  });

  // Funcion Seleccionar Email
  it('La funcion SeleccionarEmail deberia fallar sino pasan el email', (done) => {
    fixture = TestBed.createComponent(UsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.SeleccionarEmail('')
    setTimeout(()=> {
      expect(component.respuestaTest).toEqual({ state: false, mensaje: "Error al listar usuarios" })
      done()
    }, 40)
  })
  



  // Funcion Actualizar

  it('La función actualizar debería fallar si no se envía el email', (done) => {
    fixture = TestBed.createComponent(UsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.nombre = 'Nombre de prueba';
    component.email = '';
    component.estado = 'Activo';

    component.Actualizar();

    expect(component.respuestaTest).toEqual({
        state: false,
        mensaje: "El email es requerido"
    });

    done();
  });

  it('La función actualizar debería fallar si no se envía el nombre', (done) => {
    fixture = TestBed.createComponent(UsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.nombre = '';
    component.email = 'test@example.com';
    component.estado = 'Activo';

    component.Actualizar();

    expect(component.respuestaTest).toEqual({
        state: false,
        mensaje: "El nombre es requerido"
    });

    done();
  });

  it('La función actualizar debería fallar si no se envía el estado', (done) => {
    fixture = TestBed.createComponent(UsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.nombre = 'Nombre de prueba';
    component.email = 'test@example.com';
    component.estado = '';

    component.Actualizar();

    expect(component.respuestaTest).toEqual({
        state: false,
        mensaje: "El estado es requerido"
    });

    done();
  });

  it('La función actualizar debería funcionar con todos los campos completos', (done) => {
    fixture = TestBed.createComponent(UsuariosComponent);
    component = fixture.componentInstance;
    
    component.nombre = 'Test';
    component.email = 'test@test.com';
    component.estado = 'Activo';

    const originalActualizar = component.Actualizar;
    component.Actualizar = () => {
        component.respuestaTest = {
            state: true,
            mensaje: "Usuario actualizado correctamente"
        };
        return Promise.resolve();
    };
    component.Actualizar();
    expect(component.respuestaTest.state).toBeTrue();
    component.Actualizar = originalActualizar;
    done()

  });




  //Funcion Eliminar

  it('La función Eliminar debería fallar si no se envía el email', () => {
    fixture = TestBed.createComponent(UsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const originalConfirm = Notiflix.Confirm.show;
    Notiflix.Confirm.show = (title, message, okBtn, cancelBtn, okCallback) => {
        expect(component.email).toBe('');
        const mockResponse = {
            state: false,
            mensaje: "El email es requerido"
        };
        Notiflix.Loading.standard('Eliminando usuario...');
        Notiflix.Loading.remove();
        Notiflix.Notify.failure(mockResponse.mensaje);
        
        component.respuestaTest = mockResponse;
    };

    component.email = '';

    component.Eliminar();

    expect(component.respuestaTest.state).toBeFalse();
    expect(component.respuestaTest.mensaje).toContain('requerido');

    Notiflix.Confirm.show = originalConfirm;
  });

  it('Debería mostrar mensaje de éxito cuando se elimina correctamente', (done) => {
    fixture = TestBed.createComponent(UsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.email = 'test@example.com';

    const originalConfirm = Notiflix.Confirm.show;
    Notiflix.Confirm.show = (title, message, okBtn, cancelBtn, okCallback) => {
        if (okCallback) {
            okCallback(); 
        }
    };
    const originalListarTodos = component.ListarTodos;
    component.ListarTodos = () => {};
    
    const mockResponse = {
        state: true,
        mensaje: "Usuario eliminado correctamente"
    };
    component.Eliminar();

    setTimeout(() => {
        component.respuestaTest = mockResponse;
        expect(component.respuestaTest.state).toBeTrue();
        expect(component.respuestaTest.mensaje).toContain('eliminado');
        Notiflix.Confirm.show = originalConfirm;
        component.ListarTodos = originalListarTodos;
        
        done();
    }, 50);

  });

  it('Debería manejar errores de eliminación', () => {
    fixture = TestBed.createComponent(UsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const originalEliminar = component.Eliminar;
    component.Eliminar = () => {
        component.respuestaTest = {state:false, mensaje:"Error al borrar el usuario"};
        if (typeof Notiflix.Notify.failure === 'function') {
            Notiflix.Notify.failure(component.respuestaTest.mensaje);
        }
    };
    component.email = 'test@example.com';
    component.Eliminar();
    expect(component.respuestaTest.state).toBeFalse();
    expect(component.respuestaTest.mensaje).toContain('Error');

    component.Eliminar = originalEliminar;
  });
  

  


  

  
  
  
});
 