import { TestBed } from '@angular/core/testing';

import { PeticionService } from './peticion.service';
import { HttpClientModule } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from '../app.routes';

describe('PeticionService', () => {
  let service: PeticionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [PeticionService, provideRouter(routes)]
    });
    service = TestBed.inject(PeticionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Valida la peticion tipo POST para registrar', (done) => {
    const mockupUrl = service.urlHostTest + "/usuarios/registrar"
    const mockupPayload = {}
    const mockupRespuesta = {state: false, mensaje: "El nombre es requerido"}

    service.Post(mockupUrl, mockupPayload).then((res:any) => {
      expect(res).toEqual(mockupRespuesta)
      done()
    })
  })

  it('Valida la peticion tipo GET para leer todos', (done) => {
    const mockupUrl = service.urlHostTest + "/usuarios/listarTodos";
    const mockupPayload = {};
    const mockupRespuesta = [
      {
        "_id": "67e5d3209cf41f9d0d8260ed",
        "nombre": "Manuel Saenz",
        "email": "manuel@gmail.com",
        "password": "926ff9c627804ede14b3e4e537073dbde3be7a0c126f2600fb2bb0cb7fedbfa2",
        "estado": "Activo",
        "codigo": "G-67967",
        "__v": 0
      }
    ];

    service.Get(mockupUrl).then((res: any) => {
      expect(res[0]).toEqual(mockupRespuesta[0]); 
      done();
    }).catch(err => {
      done.fail(err); 
    });
});

  it('Valida la peticion tipo POST para actualizar', (done) => {
    const mockupUrl = service.urlHostTest + "/usuarios/actualizar"
    const mockupPayload = {}
    const mockupRespuesta = {state: false, mensaje: "El nombre es requerido"}

    service.Post(mockupUrl, mockupPayload).then((res:any) => {
      expect(res).toEqual(mockupRespuesta)
      done()
    })
  })
  
  it('Valida la peticion tipo POST para eliminar', (done) => {
    const mockupUrl = service.urlHostTest + "/usuarios/borrar"
    const mockupPayload = {}
    const mockupRespuesta = {state:false, mensaje:"El email es requerido"}

    service.Post(mockupUrl, mockupPayload).then((res:any) => {
      expect(res).toEqual(mockupRespuesta)
      done()
    })
  })

  it('Valida la peticion tipo POST para listar uno', (done) => {
    const mockupUrl = service.urlHostTest + "/usuarios/listarUnico"
    const mockupPayload = {}
    const mockupRespuesta = {state:false, mensaje:"El email es requerido"}

    service.Post(mockupUrl, mockupPayload).then((res:any) => {
      expect(res).toEqual(mockupRespuesta)
      done()
    })
  })

})