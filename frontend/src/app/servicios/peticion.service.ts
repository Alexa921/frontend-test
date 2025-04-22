import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PeticionService {
  requestOptions: any = {};
  urlHost = "";  // Asegúrate de asignar correctamente la URL base.

  constructor(private http: HttpClient) { }

  // Método POST refactorizado con async/await
  async Post(url: string, payload: any) {
    this.requestOptions = {
      headers: new HttpHeaders({}),
      withCredentials: true
    };

    try {
      const res = await this.http.post(url, payload, this.requestOptions).toPromise();
      console.log('Respuesta del servidor (POST):', res);
      return res;
    } catch (err) {
      console.error("Error en POST:", err);
      throw err;
    }
  }

  // Método PUT refactorizado con async/await
  async Put(url: string, payload: any) {
    this.requestOptions = {
      headers: new HttpHeaders({}),
      withCredentials: true
    };

    try {
      const res = await this.http.put(url, payload, this.requestOptions).toPromise();
      console.log('Respuesta del servidor (PUT):', res);
      return res;
    } catch (err) {
      console.error("Error en PUT:", err);
      throw err;
    }
  }

  // Método GET refactorizado con async/await
  async Get(url: string) {
    this.requestOptions = {
      headers: new HttpHeaders({}),
      withCredentials: true
    };

    try {
      const res = await this.http.get(url, this.requestOptions).toPromise();
      console.log('Respuesta del servidor (GET):', res);
      return res;
    } catch (err) {
      console.error("Error en GET:", err);
      throw err;
    }
  }

  // Método DELETE refactorizado con async/await
  async Delete(url: string) {
    this.requestOptions = {
      headers: new HttpHeaders({}),
      withCredentials: true
    };

    try {
      const res = await this.http.delete(url, this.requestOptions).toPromise();
      console.log('Respuesta del servidor (DELETE):', res);
      return res;
    } catch (err) {
      console.error("Error en DELETE:", err);
      throw err;
    }
  }
}
