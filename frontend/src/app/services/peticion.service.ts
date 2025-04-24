import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PeticionService {

  urlHost: string = ' ';
  urlHostTest: string = 'http://localhost:3001';

  constructor(private http: HttpClient) { }

  Post(url: string, payload: any): Promise<any> {
    const requestOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true
    };

    return this.http.post(url, payload, requestOptions).toPromise()
      .then((res: any) => {
        console.log('Respuesta del servidor:', res);
        return res;
      })
      .catch((error: any) => {
        console.error('Error en la petición:', error);
        throw error;
      });
  }

  Get(url: string): Promise<any> {
    const requestOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true
    };

    return this.http.get(url, requestOptions).toPromise()
      .then((res: any) => {
        console.log(res);
        return res;
      })
      .catch((error: any) => {
        console.error(error);
        throw error;
      });
  }

  Put(url: string, payload: any): Promise<any> {
    const requestOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true
    };

    return this.http.put(url, payload, requestOptions).toPromise()
      .then((res: any) => {
        console.log(res);
        return res;
      })
      .catch((error: any) => {
        console.error(error);
        throw error;
      });
  }

  Delete(url: string): Promise<any> {
    const requestOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true
    };

    return this.http.delete(url, requestOptions).toPromise()
      .then((res: any) => {
        console.log(res);
        return res;
      })
      .catch((error: any) => {
        console.error(error);
        throw error;
      });
  }

}
