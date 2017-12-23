import { EventEmitter, Component, OnInit, Input, Output } from '@angular/core';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit {

  @Input() hero: Hero;
  constructor() {
	console.log("consturctor");
  }


  ngOnInit() {
	console.log("on init");
  }
  fireMyEvent(evt){
	console.log("firing event "+this.hero.name);
  }
}
