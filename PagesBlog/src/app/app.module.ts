import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { CreationPostComponent } from "./components/creation-post/creation-post.component";
import { DetailPostComponent } from "./components/detail-post/detail-post.component";
import { EditPostComponent } from "./components/edit-post/edit-post.component";
import { HomeComponent } from "./components/home/home.component";


@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    CreationPostComponent,
    DetailPostComponent,
    EditPostComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
