import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable, of } from 'rxjs';
import 'rxjs/add/operator/catch';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import { LogInUser } from '../interfaces/user';

@Injectable()
export class UserAuthenticationService {
  private authState: Observable<firebase.User>;

  constructor(private router: Router, private afAuth: AngularFireAuth) {
    this.authState = this.afAuth.authState;
  }

  getAuthState() {
    return this.authState;
  }

  signIn(userInfo: LogInUser): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(
      userInfo.email,
      userInfo.password
    );
  }

  register(userInfo: LogInUser): Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(
      userInfo.email,
      userInfo.password
    );
  }

  logout(): void {
    this.router.navigate(['/login']);
    this.afAuth.auth.signOut();
  }
}
