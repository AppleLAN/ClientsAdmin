import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularFireList } from 'angularfire2/database';
import { User } from '../../authModule/login/interfaces/user';
import { ClientsService, ClientStatus } from '../services/clients.service';
import { checkIfEmpty } from '../../shared/utilities';
import * as moment from 'moment';
import { UserAuthenticationService } from '../../authModule/login/services/user-authentification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-administration',
  templateUrl: './user-administration.component.html',
  styleUrls: ['./user-administration.component.scss']
})
export class UserAdministrationComponent implements OnInit, OnDestroy {
  clientForm: FormGroup;
  data: any;
  db: AngularFireList<User>;
  error: string;
  canDelete = false;
  clientStatus: string[];

  private subscriptions: Subscription[] = [];
  private currentUserId: string;

  constructor(
    private fb: FormBuilder,
    private clientsService: ClientsService,
    private userAuthenticationService: UserAuthenticationService,
    private dialogRef: MatDialogRef<UserAdministrationComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.data = data;
  }

  ngOnInit() {
    this.clientStatus = ClientStatus;
    const $currentUserSubscription = this.userAuthenticationService
      .getAuthState()
      .subscribe(currentUser => {
        this.currentUserId = currentUser.uid;
        this.db = this.clientsService.getClients(this.currentUserId);
      });
    this.subscriptions.push($currentUserSubscription);
    this.clientForm = this.fb.group({
      name: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.minLength(3),
          Validators.maxLength(30)
        ]
      ],
      status: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(12)]
      ],
      date: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(12)]
      ],
      lastName: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
      ],
      notes: ['', []]
    });
    if (!checkIfEmpty(this.data)) {
      const formattedData = {
        ...this.data,
        date: moment(this.data.date, 'dddd, MMMM Do YYYY, h:mm:ss a')
      }
      this.clientForm.patchValue(formattedData);
      this.canDelete = true;
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  close() {
    this.dialogRef.close();
  }

  delete() {
    this.db
      .remove(this.data.id)
      .then(response => {
        this.close();
      })
      .catch(err => {
        this.error = err.message;
      });
  }

  save(form: FormGroup) {
    if (form.valid) {
      const formattedFormData = {
        ...form.value,
        date: moment(form.value.date).format('dddd, MMMM Do YYYY, h:mm:ss a'),
        currentUserId: this.currentUserId
      };

      if (!checkIfEmpty(this.data)) {
        this.db
          .update(this.data.id, formattedFormData)
          .then(response => {
            this.close();
          })
          .catch(err => {
            this.error = err.message;
          });
      } else {
        this.db.push(formattedFormData).then(response => {
          this.close();
        });
      }
    }
  }
}
