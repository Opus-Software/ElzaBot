import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NavController, Button } from 'ionic-angular';
import { Toast } from 'ionic-native';
import { Config } from '../../config/Config';

@Component({
  templateUrl: 'build/pages/home/home.html',
  directives: [ Button ]
})
export class HomePage {
  token: string = Config.token;
  channel: string = Config.channel;
  text: string = Config.text;
  
  as_user: boolean = true;
  slackUrl: string = 'https://slack.com/api/chat.postMessage';
  timeout: boolean = false;
  buttonValue: string = 'ENVIAR!';
  clock: any;

  header: Headers;
  
  constructor(private navCtrl: NavController,
              private http: Http) {
      this.header = new Headers();
      this.header.append('Content-Type', 'application/x-www-form-urlencoded');
  }

  screenForCoffee() {

    let body = `token=${this.token}&channel=${this.channel}&text=${this.text}&as_user=${this.as_user}`;

    let url = this.slackUrl;

    this.changeTimeout();

    this.http.post(url, body, { headers: this.header })
      .subscribe(data => {

        let body = JSON.parse(data['_body']);

        if (body.ok) {
          this.startTimer(10);
        } else {          
          this.handleError(body.error);
        }        

      }, error => {
        this.handleError(error);
      });
  }

  private handleError(error) {
    console.log(error);
    this.showToast('Deu ruim.. :/');
    this.changeTimeout();
  }

  private changeTimeout() {
    console.log('changeTimeout');
    this.timeout = !this.timeout;
  }
  
  private changeButtonText(text: string) {
    console.log('changeButtonText');
    this.buttonValue = text;    
  }

  private showToast(msg: string) {
    Toast.showLongBottom(msg).subscribe(
      toast => {
        console.log(toast);
      }
    );
  }

  private startTimer(duration) {

    console.log('StartTimer: ' + duration);

    let timer = duration;
    let minutes;
    let seconds;

    this.showToast('Enviado');

    this.clock = setInterval( () => {
        minutes = parseInt((timer / 60).toString(), 10);
        seconds = parseInt((timer % 60).toString(), 10);

        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;
      
        duration = minutes + ':' + seconds;

        if (--timer < 0) {
            timer = duration;

            this.changeButtonText('ENVIAR!');
            this.changeTimeout();
            clearInterval(this.clock);
        }else {          
            this.changeButtonText(duration);
        }
    }, 1000);
  }

    
  
}
