import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Message } from './message';
import { EchoService } from './echo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'EchoClient';

  echoForm: FormGroup;
  
  messageRequest: string = "";
  response: string = "";

  constructor(
    public echoService: EchoService,
    private formBuilder: FormBuilder  
    ) {
    this.buildForm();
  }

  ngOnInit() {
  }

  buildForm() {
    this.echoForm = this.formBuilder.group({
      message: ['', [Validators.required]]
    });
  }

  async sendMessage() {
    let message: Message = new Message();
    message.message = this.echoForm.get('message').value;
    this.response = await this.echoService.createMessage(message);
  }
}
