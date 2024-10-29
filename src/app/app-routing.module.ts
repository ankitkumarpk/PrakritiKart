import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './outer/home/home.component';
import { OuterlayoutComponent } from './layout/outerlayout/applayout.component';
import { AboutComponent } from './outer/about/about.component';
import { ContactComponent } from './outer/contact/contact.component';
import { LoginComponent } from './userauth/login/login.component';
import { SignupComponent } from './userauth/signup/signup.component';
import { UserlayoutComponent } from './layout/userlayout/userlayout.component';
import { AuthGuard } from './auth.guard';
import { UserorderComponent } from './layout/userlayout/userorder/userorder.component';
import { SavedaddressComponent } from './layout/userlayout/savedaddress/savedaddress.component';
import { RoleGuard } from './guards/roleguard.guard';

const routes: Routes = [
  {
    path: '',
    component: OuterlayoutComponent, // Use layout for all routes
    children: [
      // { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'login/user', component: LoginComponent },
      { path: 'signup/user', component: SignupComponent },
    ],
  },

  // ##############--When user logged in Dashboard--##############

  {
    path: 'user',
    component: UserlayoutComponent,
    canActivate: [AuthGuard , RoleGuard], data: { expectedRole: 'Customer' }, // Use layout for all routes
    children: [
      // { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '', component: UserorderComponent },
      { path: 'order', component: UserorderComponent },
      { path: 'address', component: SavedaddressComponent },
      { path: 'home', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactComponent },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
