import * as firebase from 'firebase'
import { Router } from '@angular/router'
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
    token: string

    constructor(private router: Router) { }

    // loginWithGoogle() {
    //     const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    //     firebase.auth().signInWithPopup(googleAuthProvider)
    //         .then(
    //             response => {
    //                 this.router.navigate(['/']);
    //                 firebase.auth().currentUser.getToken()
    //                     .then(
    //                         (token: string) => this.token = token
    //                     )
    //             }
    //         )
    //         .catch(
    //             error => console.log(error)
    //         );
    // }

    signupUser(email: string, password: string) {
        // The firebase.auth method returns an promise 
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(
            response=>{
                this.router.navigate(['/'])
            }
        )
            .catch(
                error => console.log(error)
            )
    }

    signInUser(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(
                response => {
                    this.router.navigate(['/']);
                    firebase.auth().currentUser.getToken()
                        .then(
                            (token: string) => this.token = token
                        )
                }
            )
            .catch(
                error => console.log(error)
            );
    }

    getToken() {
        firebase.auth().currentUser.getIdToken()
            .then(
                (token: string) => this.token = token
            );
        return this.token
    }

    logout() {
        firebase.auth().signOut();
        this.token = null;
        this.router.navigate(['/'])
    }

    isAuthenticated() {
        return this.token != null
    }
}