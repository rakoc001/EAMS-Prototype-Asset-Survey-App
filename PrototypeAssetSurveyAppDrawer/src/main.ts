// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from "nativescript-angular/platform";

import { AppModule } from "./app/app.module";
import { enableProdMode } from "@angular/core";

import * as firebase from "nativescript-plugin-firebase";

firebase.init({

}).then(
    () => {
        console.log("firebase.init done");
    },
    error => {
        console.log(`firebase.init error: ${error}`);
    }
);

const listener = {
    onAuthStateChanged(data) {
        console.log(data.loggedIn ? "Logged in to firebase" : "Logged out from firebase");
        if (data.loggedIn) {
            console.log("User Info", data.user);
        }
    },
    thisArg: this
};

// add the listener:
firebase.addAuthStateListener(listener);

// stop listening to auth state changes:
firebase.removeAuthStateListener(listener);

// check if already listening to auth state changes:
firebase.hasAuthStateListener(listener);

enableProdMode();
platformNativeScriptDynamic().bootstrapModule(AppModule);
