import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import 'rxjs/add/operator/catch';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { User } from '../../authModule/login/interfaces/user';

export const ClientsTableHeaders = [
  'id',
  'name',
  'status',
  'date',
  'lastName',
  'email',
  'actions'
];

export const ClientStatus = [
  'Prospective',
  'Current',
  'Non Active',
];

@Injectable()
export class ClientsService {
  constructor(
    private db: AngularFireDatabase
  ) {}

  getClients(userId: string): AngularFireList<User> {
    return this.db.list('/clients', ref => ref.orderByChild('currentUserId').equalTo(userId));
  }
}
