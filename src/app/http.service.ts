import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';

import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  public allBooks;
  public allCharacters;
  public allHouses;
  public currentItem;
  public baseUrl = "https://anapioficeandfire.com/api";


  constructor(public _http:HttpClient) { 
    console.log("http service constructor called");
  }

  private handleError(err: HttpErrorResponse) {
    console.log('Handle error Http call');
    console.log(err.message);
    return Observable.throw(err.message)
  }

  public getAllBooks(): any  {
    let response = this._http.get(this.baseUrl+'/books');
    return response
  }

  public getAllCharacters(): any  {
    let response = this._http.get(this.baseUrl+'/characters');
    return response
  }

  public getAllHouses(): any  {
    let response = this._http.get(this.baseUrl+'/houses');
    return response
  }
  
  public getDetails(category,id): any  {
    let response = this._http.get(`${this.baseUrl}/${category}/${id}`);
    return response
  }

  public getDetailsByUrl(url): any {
    let response = this._http.get(url);
    return response
  }

  public getFilteredCategory(filter): any {
    let response = this._http.get(this.baseUrl+filter);
    return response
  }
}
