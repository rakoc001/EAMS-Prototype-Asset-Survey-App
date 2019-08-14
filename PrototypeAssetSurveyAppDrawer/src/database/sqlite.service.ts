import { Injectable } from "@angular/core";
var Sqlite = require("nativescript-sqlite");

@Injectable()
export class DatabaseService {

    public getdbConnection() {
        return new Sqlite('assets');
    }

    public closedbConnection() {
        new Sqlite('assets')
            .then((db) => {
                db.close();
            })
    }
}
