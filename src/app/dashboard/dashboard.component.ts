import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';
import { MatDialog } from '@angular/material';
import { MyDialogComponent } from '../my-dialog/my-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  constructor(private heroService: HeroService,
  private dialog: MatDialog
 ) { }

  ngOnInit() {
    console.log("In dashboard init 4 "+ this.dialog);
    this.getHeroes();
  }
    getHeroes(): void {
      this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes.slice(1, 3));
    }

    popup(): void{
      console.log("In dashboard pop up");

      const dialogRef = this.dialog.open(MyDialogComponent);
      dialogRef.afterClosed().subscribe(result => {
        console.log("Closing ......................."+result);
      });


    }

}


