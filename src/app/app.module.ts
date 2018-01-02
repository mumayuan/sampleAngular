import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';
import { AppComponent } from './app.component';
import { HeroService } from './hero.service';
import { HerosComponent } from './heros/heros.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './message.service';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { ChartModule } from 'angular-highcharts';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material';
import { MyDialogComponent } from './my-dialog/my-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    HerosComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    HeroSearchComponent,
    MyDialogComponent
  ],

  imports: [
    BrowserModule,BrowserAnimationsModule
    ,FormsModule, AppRoutingModule, HttpClientModule, ChartModule
    ,MatDialogModule

  ],
  providers: [HeroService, MessageService, InMemoryDataService],
  bootstrap: [AppComponent],
  entryComponents: [MyDialogComponent]
})
export class AppModule { }
