import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-card',
  templateUrl: './gifs-card.component.html',

})
export class GifsCardComponent implements OnInit{

  @Input()
  public gif!: Gif;

  ngOnInit(): void {
    // console.log({gif:this.gif})
    if(!this.gif) throw new Error('Gif is property is required.');
  }

}
