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
import { SellerlayoutComponent } from './layout/sellerlayout/sellerlayout.component';
import { CustomerfeedbackComponent } from './layout/sellerlayout/customerfeedback/customerfeedback.component';
import { ManageordersComponent } from './layout/sellerlayout/manageorders/manageorders.component';
import { ManageproductComponent } from './layout/sellerlayout/manageproduct/manageproduct.component';
import { SellerinfoComponent } from './layout/sellerlayout/sellerinfo/sellerinfo.component';
import { SupportComponent } from './layout/sellerlayout/support/support.component';
import { SellerheaderComponent } from './layout/sellerlayout/sellerheader/sellerheader.component';
import { SellerfooterComponent } from './layout/sellerlayout/sellerfooter/sellerfooter.component';
import { ProductpageComponent } from './layout/outerlayout/productpage/productpage.component';
import { SearchpageComponent } from './layout/outerlayout/searchpage/searchpage.component';
import { CartpageComponent } from './layout/outerlayout/cartpage/cartpage.component';
import { CheckoutpageComponent } from './layout/userlayout/checkoutpage/checkoutpage.component';

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
      {path:'product/:id', component:ProductpageComponent},
      {path: 'search', component:SearchpageComponent},
      {path:'cart', component:CartpageComponent},
      {path:'checkout', component:CheckoutpageComponent},
    ],
  },

  // ##############--When user logged in Dashboard--##############

  {
    path: 'user',
    component: UserlayoutComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: 'Customer' }, // Use layout for all routes
    children: [
      // { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '', component: UserorderComponent },
      { path: 'order', component: UserorderComponent },
      { path: 'address', component: SavedaddressComponent },
      { path: 'home', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactComponent },
      {path:'cart', component:CartpageComponent},
      {path: 'search', component:SearchpageComponent},
      
    ],
  },

  {
    path: 'seller',
    component: SellerlayoutComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: 'Seller' },
    children: [
      { path: 'feedback', component: CustomerfeedbackComponent },
      { path: 'orders', component: ManageordersComponent },
      { path: 'products', component: ManageproductComponent },
      { path: 'info', component: SellerinfoComponent },
      { path: 'support', component: SupportComponent },
      {path:'header',component:SellerheaderComponent},
      {path: 'footer', component:SellerfooterComponent}
    ],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
