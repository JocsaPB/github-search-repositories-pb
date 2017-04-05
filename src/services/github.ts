import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class GitHubService {
    constructor(private http: Http) {
    }

    getRepos(username: string){
        let repositories = this.http.get(`https://api.github.com/users/${username}/repos`);
        return repositories;
    }
}