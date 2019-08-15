import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { LoginComponent } from "../login/login.component";
import { HomeComponent } from "./home/home.component";
import { CreateNewComponent } from "./create/create.component";
import { UpdateDeleteComponent } from "./update/update.component";
import { ReportComponent } from "./report/report.component";
import { SettingsComponent } from "./settings/settings.component";
import { SearchComponent } from "./search/search.component";

export const routes: Routes = [
    { path: "", component: LoginComponent },
    { path: "login", component: LoginComponent },
    { path: "home", component: HomeComponent },
    { path: "create", component: CreateNewComponent },
    { path: "update", component: UpdateDeleteComponent },
    { path: "report", component: ReportComponent },
    { path: "settings", component: SettingsComponent },
    { path: "search", component: SearchComponent }
    /*{ path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", loadChildren: "~/app/home/home.module#HomeModule" },
    { path: "browse", loadChildren: "~/app/browse/browse.module#BrowseModule" },
    { path: "search", loadChildren: "~/app/search/search.module#SearchModule" },
    { path: "featured", loadChildren: "~/app/featured/featured.module#FeaturedModule" },
    { path: "settings", loadChildren: "~/app/settings/settings.module#SettingsModule" }*/
];

export const navigatableComponents = [
    LoginComponent,
    HomeComponent,
    CreateNewComponent,
    UpdateDeleteComponent,
    ReportComponent,
    SettingsComponent,
    SearchComponent
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
