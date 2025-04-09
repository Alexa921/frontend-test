import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PeticionService {
  requestOptions: any = {};

  urlHost = "http://localhost:3001";

  constructor(private http: HttpClient) { }

  Post(url: string, payload: any) {
    return new Promise((resolve, reject) => {
      this.requestOptions = {
        headers: new HttpHeaders({}),
        withCredentials: true 
      };

      this.http.post(url, payload, this.requestOptions).toPromise()
        .then((res: any) => {
          console.log(res);
          resolve(res);
        }).catch((err: any) => {
          console.error("Error en POST:", err);
          reject(err);
        });
    });
  }

  Put(url: string, payload: any) {
    return new Promise((resolve, reject) => {
      this.requestOptions = {
        headers: new HttpHeaders({}),
        withCredentials: true
      };

      this.http.put(url, payload, this.requestOptions).toPromise()
        .then((res: any) => {
          console.log(res);
          resolve(res);
        }).catch((err: any) => {
          console.error("Error en PUT:", err);
          reject(err);
        });
    });
  }

  Get(url: string) {
    return new Promise((resolve, reject) => {
      this.requestOptions = {
        headers: new HttpHeaders({}),
        withCredentials: true
      };

      this.http.get(url, this.requestOptions).toPromise()
        .then((res: any) => {
          console.log(res);
          resolve(res);
        }).catch((err: any) => {
          console.error("Error en GET:", err);
          reject(err);
        });
    });
  }

  Delete(url: string) {
    return new Promise((resolve, reject) => {
      this.requestOptions = {
        headers: new HttpHeaders({}),
        withCredentials: true
      };

      this.http.delete(url, this.requestOptions).toPromise()
        .then((res: any) => {
          console.log(res);
          resolve(res);
        }).catch((err: any) => {
          console.error("Error en DELETE:", err);
          reject(err);
        });
    });
  }
}

