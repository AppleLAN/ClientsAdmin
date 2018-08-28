import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription, of } from 'rxjs';
import 'rxjs/add/operator/mergeMap';
import { User } from '../../authModule/login/interfaces/user';
import { UserAuthenticationService } from '../../authModule/login/services/user-authentification.service';
import { DialogOpener } from '../../shared/services/dialog-opener.service';
import {
  ClientsService,
  ClientsTableHeaders
} from '../services/clients.service';
import { UserAdministrationComponent } from '../user-administration/user-administration.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort)
  sort: MatSort;

  loading = true;
  displayedColumns: string[] = ClientsTableHeaders;
  dataSource: MatTableDataSource<User>;

  private subscriptions: Subscription[] = [];

  constructor(
    private dialogOpener: DialogOpener,
    private clientsService: ClientsService,
    private userAuthenticationService: UserAuthenticationService
  ) {}

  ngOnInit() {
    const $getClientsSubscription = this.userAuthenticationService
      .getAuthState()
      .mergeMap(currentUser => {
        if (currentUser) {
          return this.clientsService.getClients(currentUser.uid).snapshotChanges();
        } else {
          return of([]);
        }
      })
      .subscribe(clients => {
        this.loading = false;
        if (clients.length > 0) {
          const formattedValues = clients.map(clientSnapshot => {
            const formattedObject = {
              ...clientSnapshot.payload.val(),
              id: clientSnapshot.key
            };
            return formattedObject;
          });
          this.dataSource = new MatTableDataSource(formattedValues);
          this.dataSource.sort = this.sort;
        } else {
          this.dataSource = null;
        }
      });
    this.subscriptions.push($getClientsSubscription);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => {
      s.unsubscribe();
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addUser() {
    this.dialogOpener.openDialog(UserAdministrationComponent, {});
  }

  editUser(user) {
    this.dialogOpener.openDialog(UserAdministrationComponent, user);
  }
}
