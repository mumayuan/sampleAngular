import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HeroDetail } from './herodetail';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class HeroService {
private heroesUrl = 'http://127.0.0.1:8999/api/myheroes';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  getHeroes (): Observable<Hero[]> {
   return this.http.get<Hero[]>(this.heroesUrl)
     .pipe(
       tap(heroes => this.log(`fetched heroes`)),
       catchError(this.handleError('getHeroes', []))
     );
   }

getHero(id: number): Observable<HeroDetail> {
  const url = `${this.heroesUrl}/${id}`;
  return this.http.get<HeroDetail>(url).pipe(
    tap(_ => this.log(`fetched hero id=${id}`)),
    catchError(this.handleError<HeroDetail>(`getHero id=${id}`))
  );
}
updateHero (hero: Hero): Observable<any> {
 console.log(`->saving  hero: ${hero.id} + ${hero.name}`+ hero);
  return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
    tap(_ => this.log(`updated hero id=${hero.id}`)),
    catchError(this.handleError<any>('updateHero'))
  );
}
addHero (hero: Hero): Observable<Hero> {

  console.log('->adding hero: '+ hero);
  return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
    tap((hero: Hero) => this.log(`added hero w/ id=${hero.id}`)),
    catchError(this.handleError<Hero>('addHero'))
  );
}
deleteHero (hero: Hero | number): Observable<Hero> {
  const id = typeof hero === 'number' ? hero : hero.id;
  const url = `${this.heroesUrl}/${id}`;

  return this.http.delete<Hero>(url, httpOptions).pipe(
    tap(_ => this.log(`deleted hero id=${id}`)),
    catchError(this.handleError<Hero>('deleteHero'))
  );
}

searchHeroes(term: string): Observable<Hero[]> {
  if (!term.trim()) {
    // if not search term, return empty hero array.
    return of([]);
  }
  return this.http.get<Hero[]>(`${this.heroesUrl}/${term}`).pipe(
    tap(_ => this.log(`found heroes matching "${term}"`)),
    catchError(this.handleError<Hero[]>('searchHeroes', []))
  );
}

private log(message: string) {
  this.messageService.add('HeroService: ' + message);
}
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error("HEROSERVICE.TS ............... "+ JSON.stringify(error)); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

}
