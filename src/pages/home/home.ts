import { GitHubService } from './../../services/github';
import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { DetailsPage } from "../details/details";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [GitHubService]
})
export class HomePage {

  public username: string;
  public repositories: any[];

  constructor(
    private navCtrl: NavController,
    private gitHubServ: GitHubService,
    private loadingCtrl: LoadingController) {
  }

  getRepos() {
    //loading
    let loading = this.loadingCtrl.create({
      content: "Loading... please wait!"
    });

    loading.present();
    this.gitHubServ.getRepos(this.username).subscribe(
      data => {
        this.repositories = data.json();
        console.log(this.repositories.length);
        if(this.repositories.length <= 0)
          alert("There is no repositories for this user name");
      },
      //if error
      error => {
        loading.dismiss();
        console.error(error);
        alert("Sorry, has occurred an error. Please try again.");
      },
      //if has completed without erros
      () => {
        console.log('getRepos completed');
        loading.dismiss();
      }

    );
  }

  goToDetails(repo: any){
    this.navCtrl.push(DetailsPage, {repo: repo});
  }

}
