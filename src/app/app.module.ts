import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing } from './app.component.routing';
import { AuthGuard } from './shared/services/AuthGuard.service';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserAdministrationComponent } from './appsModule/user-administration/user-administration.component';
import { NotesCreationComponent } from './appsModule/user-administration/notes-creation/notes-creation.component';

@NgModule({
  declarations: [AppComponent, UserAdministrationComponent, NotesCreationComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule.forRoot(),
    routing
  ],
  entryComponents: [UserAdministrationComponent, NotesCreationComponent],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
