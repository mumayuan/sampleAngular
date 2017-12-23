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

  constructor(private heroService: HeroService, private messageService: MessageService) { }

  ngOnInit() {
   this.getHeroes();
   this.messageService.add('HerosComponent: get heroes');

  }
  selectedHero: Hero;

onSelect(hero: Hero): void {
  this.selectedHero = hero;
  this.messageService.add('onSelect: get heroes');
}

getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
  }
}
