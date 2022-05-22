import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { MessageStatistics } from './messageStatistics'


const baseUrl = 'http://localhost:4201';

@Injectable({
  providedIn: 'root'
})
export class EchoService {
  
  constructor(private http: HttpClient) {
  }

  private async request(method: string, url: string, data?: any, responseType?: any) {
    console.log('request ' + JSON.stringify(data));
    const result = this.http.request(method, url, {
      body: data,
      responseType: responseType || 'json',
      observe: 'body',
    });
    return new Promise<any>((resolve, reject) => {
      result.subscribe(resolve as any, reject as any);
    });
  }

  createMessage(messageStatistics: string) {
    console.log('createProduct ' + JSON.stringify(messageStatistics));
    return this.request('post', `${baseUrl}/product`, messageStatistics);
  }
}
