import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NavController, Button } from 'ionic-angular';
@Component({
  templateUrl: 'build/pages/home/home.html',
  directives: [ Button ]
})
export class HomePage {
  token: string = 'xoxb-83005887287-ejuGtQcP0Fj0PpTKwTeXFrhr';
  channel: string = 'cafe';
  text: string = 'Oi gente, o café está pronto e quente!';
  as_user: boolean = true;
  slackUrl: string = 'https://slack.com/api/chat.postMessage';

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
      .subscribe(data => console.log(data));
  }
}
