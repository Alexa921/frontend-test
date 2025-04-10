import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PeticionService } from './peticion.service';

describe('PeticionService', () => {
  let service: PeticionService;
  let httpMock: HttpTestingController;

  const mockUrl = 'https://api.ejemplo.com/test';
  const mockPayload = { nombre: 'Test', email: 'test@example.com', password: '123456' };
  const mockResponse = { success: true };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PeticionService],
    });
    service = TestBed.inject(PeticionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debería hacer una petición POST', (done) => {
    service.Post(mockUrl, mockPayload).then((res: any) => {
      expect(res).toEqual(mockResponse);
      done();
    });

    const req = httpMock.expectOne(mockUrl);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('debería hacer una petición PUT', (done) => {
    service.Put(mockUrl, mockPayload).then((res: any) => {
      expect(res).toEqual(mockResponse);
      done();
    });

    const req = httpMock.expectOne(mockUrl);
    expect(req.request.method).toBe('PUT');
    req.flush(mockResponse);
  });

  it('debería hacer una petición GET', (done) => {
    service.Get(mockUrl).then((res: any) => {
      expect(res).toEqual(mockResponse);
      done();
    });

    const req = httpMock.expectOne(mockUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('debería hacer una petición DELETE', (done) => {
    service.Delete(mockUrl).then((res: any) => {
      expect(res).toEqual(mockResponse);
      done();
    });

    const req = httpMock.expectOne(mockUrl);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockResponse);
  });

  it('debería manejar errores en POST', (done) => {
    service.Post(mockUrl, mockPayload).catch((err) => {
      expect(err.status).toBe(500);
      done();
    });

    const req = httpMock.expectOne(mockUrl);
    req.flush('Error del servidor', {
      status: 500,
      statusText: 'Error interno',
    });
  });

  it('debería manejar errores en DELETE', (done) => {
    service.Delete(mockUrl).catch((err) => {
      expect(err.status).toBe(404);
      done();
    });

    const req = httpMock.expectOne(mockUrl);
    req.flush('No encontrado', {
      status: 404,
      statusText: 'Not Found',
    });
  });
});



