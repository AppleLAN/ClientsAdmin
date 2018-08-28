import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { UserAuthenticationService } from '../authModule/login/services/user-authentification.service';
import { AngularMaterialModule } from './angular-materials.module';
import { DialogOpener } from './services/dialog-opener.service';
import { ClientsService } from '../appsModule/services/clients.service';

export const firebaseConfig = {
  apiKey: 'AIzaSyAKx8g6A6dUrV3jzVjFZKmbf0gWzOf6ka0',
  authDomain: 'clientadministration.firebaseapp.com',
  databaseURL: 'https://clientadministration.firebaseio.com',
  projectId: 'clientadministration',
  storageBucket: '',
  messagingSenderId: '816067210909'
};

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,

  ],
  exports: [
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFirestoreModule
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [UserAuthenticationService, DialogOpener, AngularFireAuth, ClientsService]
    };
  }
}
