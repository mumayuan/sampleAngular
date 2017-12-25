import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heros';
import { MessageService } from './message.service';
import { of } from 'rxjs/observable/of';
@Injectable()
export class HeroService {

  constructor(private messageService: MessageService) { }
/*  getHeroes(): Hero[] {
    return HEROES;
  }
*/
getHeroes(): Observable<Hero[]> {
  console.log("getHeroes");
  this.messageService.add('HeroService: fetched heroes');
  return of(HEROES);
}


getHero(id: number): Observable<Hero> {
  this.messageService.add(`HeroService: fetched hero id=${id}`);
  return of(HEROES.find(hero => hero.id === id));
}
}
