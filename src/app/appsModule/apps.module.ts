import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AppsComponent } from './apps.component';
import { routing } from './apps.routing';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    routing
  ],
  declarations: [AppsComponent, NavbarComponent, HomeComponent],
  providers: []
})
export class AppsModule {}
