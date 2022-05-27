import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from './message';


const baseUrl = 'http://localhost:4201';

@Injectable({
  providedIn: 'root'
})
export class EchoService {
  
  constructor(private http: HttpClient) {
  }

  private async request(method: string, url: string, data?: any) {
    const result = this.http.request(method, url, {
      body: data,
      responseType: 'json',
      observe: 'body',
    });
    return new Promise<any>((resolve, reject) => {
      result.subscribe(resolve as any, reject as any);
    });
  }

  createMessage(message: Message) {
    return this.request('post', `${baseUrl}/message`, message);
  }
}
