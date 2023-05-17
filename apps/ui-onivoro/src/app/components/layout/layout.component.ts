import { Component, OnInit } from '@angular/core';
import { Auth, authState, getAuth, idToken, user, signInWithPopup, GoogleAuthProvider, AuthProvider, User } from '@angular/fire/auth';
import { Observable, map, tap } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  user$: Observable<User | null> = user(this.auth).pipe(tap(u => console.warn(u)));
  email$: Observable<string | null | undefined> = this.user$.pipe(map(u => u?.email));
  id$: Observable<string | null | undefined> = this.user$.pipe(map(u => u?.uid));
  unauthenticated$: Observable<boolean> = this.id$.pipe(map(id => !id));
  authState$ = authState(this.auth);
  idToken$ = idToken(this.auth);

  constructor(private auth: Auth) { }

  ngOnInit(): void {
    console.warn(this.auth)
  }

  login() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(this.auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        console.warn({credential})
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  async logout() {
    await this.auth.signOut();
  }
}
