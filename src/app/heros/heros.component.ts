import { Component, OnInit } from '@angular/core';
import {Hero } from '../hero';
import {HeroService } from '../hero.service';
import {MessageService } from '../message.service';

//import {HEROES } from '../mock-heros';

@Component({
  selector: 'app-heros',
  templateUrl: './heros.component.html',
  styleUrls: ['./heros.component.css']
})
export class HerosComponent implements OnInit {

  heroes : Hero[];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
   this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(heroes => {
          this.heroes = heroes;
          console.log(`--->>>>>>               >>>>get the heroes`+ heroes);
        }
        ,
                 err => {
                   console.log('yyy   Something went wrong '+err);
                 }

        );
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }


  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

}
