import { Component, OnInit } from '@angular/core';
import { Message } from './message';
import { EchoService } from './echo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'EchoClient';
  
  messageRequest: string = "";
  response: string = "";

  constructor(public echoService: EchoService) {
  }

  ngOnInit() {
  }

  async sendMessage(messageString) {
    let message: Message = new Message();
    message.message = messageString;
    this.response = await this.echoService.createMessage(message);
  }
}
