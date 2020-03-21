import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {ExtendedModule, FlexModule} from '@angular/flex-layout';
import {RouterModule} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
const routes: any[] = [
  {path: '', component: AppComponent}
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FlexModule,
    ExtendedModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
