import { EventEmitter, Component, OnInit, Input, Output } from '@angular/core';
import { Hero } from '../hero';
import { HeroDetail } from '../herodetail';
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


  hero: HeroDetail;
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
    console.log(`--->>>>>>>>>>get the hero by id ${id}`);
    this.heroService.getHero(id)
      .subscribe(
         data => {
         this.hero = data;

          this.chart.removeSerie(0);
          this.chart.addSerie({ name: 'Server side Data', data : this.hero.data});

         },
         err => {
           console.log('xxxx   Something went wrong '+err);
         }

         );
  }



  goBack(){
    console.log("go back");
    this.location.back();
  }

  save(): void {
     this.heroService.updateHero(this.hero.hero)
       .subscribe(() => this.goBack());
   }

  fireMyEvent(evt){
  	console.log("firing event  "+this.hero.data);

 	console.log("firing event "+this.hero.alias);

  }
}
