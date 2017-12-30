import { EventEmitter, Component, OnInit, Input, Output } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService }  from '../hero.service';
import { Chart } from 'angular-highcharts';


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit {
  chart = new Chart({
        chart: {
          type: 'line'
        },
        title: {
          text: 'Linechart'
        },
        credits: {
          enabled: false
        },
        series: [{
          name: 'Line 1',
          data: [1, 2, 3]
        }]
      });


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
   this.chart.removeSerie(0);
  this.chart.addSerie(
    {name: 'Line 2', data : [30, 40, 50]}
  );
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

  save(): void {
     this.heroService.updateHero(this.hero)
       .subscribe(() => this.goBack());
   }

  fireMyEvent(evt){
 this.chart.addPoint(Math.floor(Math.random() * 10));
	console.log("firing event "+this.hero.name);
  }
}
