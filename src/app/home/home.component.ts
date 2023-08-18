import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  mainWord: string = '';
  show: boolean = false;
  @Output() sendWord= new EventEmitter<string>

  constructor() {}

  confirmWord(){
    if(this.mainWord.length==5){
      this.show = true;
    }
    else{
      alert('Word must have at least five letters')
    }
  }

  emitWord(){
    this.sendWord.emit(this.mainWord)
  }

}
