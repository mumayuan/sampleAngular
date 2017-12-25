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
        .subscribe(heroes => this.heroes = heroes);
  }
}
