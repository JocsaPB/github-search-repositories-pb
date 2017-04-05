import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { GitHubService } from "../../services/github";

//@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
  providers: [GitHubService]
})
export class DetailsPage {

  public readme = '';
  public repo;

  constructor(
    private gitHubService : GitHubService,
    private navCtrl: NavController, 
    private navParams: NavParams) {

      this.repo = navParams.get('repo');

      this.gitHubService.getDetailsRepo(this.repo).subscribe(
        data => this.readme = data.text(),
        error => {
          if(error.status == 404){
            this.readme = "This repository does not have a README."
          }else{
            console.log(error);
          }
        },
        () => console.log('getDetails completed')
      );
  }

}
