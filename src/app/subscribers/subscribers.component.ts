import { Component, OnInit } from '@angular/core';
import { SubsService } from '../services/subs.service';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.css']
})
export class SubscribersComponent {

  subscribers: Array<any> = []

  constructor(private subs: SubsService) {}

  ngOnInit(): void {
    this.subs.loadSubs().subscribe(val=>{
      this.subscribers=val;
    })
  }

  deleteSub(id:string){
    this.subs.deleteSubs(id)
  }
}
