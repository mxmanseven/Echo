import { Component, OnInit } from '@angular/core';
//import { MessageStatistics } from './messageStatistics';
import { EchoService } from './echo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'EchoClient';
  
  messageRequest: string = "";
  //messageStatisticsResponse: MessageStatistics = new MessageStatistics();
  response: string = "";

  constructor(public echoService: EchoService) {
  }

  ngOnInit() {
  }

  async sendMessage(message) {
    this.response = await this.echoService
      .createMessage(message);
    console.log(this.response);
  }
}
