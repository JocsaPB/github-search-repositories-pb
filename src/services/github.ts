import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class GitHubService {
    constructor(private http: Http) {
    }

    getRepos(username: string){
        let repositories = this.http.get(`https://api.github.com/users/${username}/repos`);
        return repositories;
    }

    getDetailsRepo(repo){
        let headers = new Headers();

        headers.append('Accept','application/vnd.github.VERSION.html');

        return this.http.get(`${repo.url}/readme`, {headers: headers});
    }
}