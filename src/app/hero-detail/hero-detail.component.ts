import { EventEmitter, Component, OnInit, Input, Output } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService }  from '../hero.service';


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit {

  hero: Hero;
  counter: Number;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location

  ) {
    this.counter = 100;
	  console.log(`consturctor ${this.counter}`);
  }


  ngOnInit() {
	  console.log("on init ng");
	  this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }
  goBack(){
    console.log("go back");
    this.location.back();
  }

  fireMyEvent(evt){
	console.log("firing event "+this.hero.name);
  }
}
