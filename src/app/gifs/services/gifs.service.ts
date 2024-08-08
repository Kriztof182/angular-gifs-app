import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gifList : Gif[] = [];
  private _tagHistory: string[] = [];
  private apiKey:string = 'c0Ls07WsDWv5f9pgDJrvLQK98dmUmHrY';
  private serviceUrlSearch:string = 'https://api.giphy.com/v1/gifs/search';
  private searchLimit:number = 10;
  constructor(
    private http:HttpClient
  ) {
    this.loadLocalStorage()

  }

  get tagHistory(){
    return [...this._tagHistory];
  }

  private organizeHistory(tag:string):void{
    tag = tag.toLowerCase();
    if(this._tagHistory.includes(tag)){
      this._tagHistory = this._tagHistory.filter((oldTag)=>oldTag!==tag)
    }
    this._tagHistory.unshift( tag );
    this._tagHistory = this._tagHistory.splice(0,10);
    this.saveLocalStorage();

  }

  private loadLocalStorage():void{
    if(!localStorage.getItem('history')) return ;
    this._tagHistory =  JSON.parse(localStorage.getItem('history')!) ;
    this.searchTag(this._tagHistory[0])
  }

  private saveLocalStorage():void{
    localStorage.setItem('history',JSON.stringify(this._tagHistory));
  }

  searchTag( tag: string ):void {

    if(tag.length===0) return;
    this.organizeHistory( tag );

    const params = new HttpParams()
    .set('api_key',this.apiKey)
    .set('q',tag)
    .set('limit', this.searchLimit);

    this.http.get<SearchResponse>(this.serviceUrlSearch,{ params })
    .subscribe(
      (resp) =>{
        this.gifList = resp.data;
        console.log({gifs: this.gifList});
      }
    );
    // const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=c0Ls07WsDWv5f9pgDJrvLQK98dmUmHrY&q=valorant&limit=10');
    // const data = await resp.json();
    // console.log(data);

  }

}
