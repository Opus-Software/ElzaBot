import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NavController, Button } from 'ionic-angular';
import { Toast } from 'ionic-native';

@Component({
  templateUrl: 'build/pages/home/home.html',
  directives: [ Button ]
})
export class HomePage {
  token: string = 'xoxb-83005887287-ejuGtQcP0Fj0PpTKwTeXFrhr';
  channel: string = 'cafe';
  text: string = 'Oi gente, o café está pronto e quente! :coffee:';
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

    this.http.post(url, body, { headers: this.header })
      .subscribe(data => {
        this.changeTimeout();
      });
  }

  private changeTimeout() {
    console.log('changeTimeout');

    this.timeout = !this.timeout;

    this.startTimer(10); 
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

    var timer = duration;
    var minutes;
    var seconds;

    this.buttonValue = 'Enviando...';
    
    this.showToast('Enviado');

    this.clock = setInterval( () => {
        minutes = parseInt((timer / 60).toString(), 10);
        seconds = parseInt((timer % 60).toString(), 10);

        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;
      
        duration = minutes + ':' + seconds;

        if (--timer < 0) {
            timer = duration;
            this.buttonValue = 'ENVIAR!';
            this.timeout = !this.timeout;
            clearInterval(this.clock);
        }else {          
            this.buttonValue = duration;
        }
    }, 1000);
  }

    
  
}
