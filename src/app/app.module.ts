import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/outerlayout/header/header.component';
import { FooterComponent } from './layout/outerlayout/footer/footer.component';
import { SidebarComponent } from './layout/outerlayout/sidebar/sidebar.component';
import { HomeComponent } from './outer/home/home.component';
import { AboutComponent } from './outer/about/about.component';
import { ContactComponent } from './outer/contact/contact.component';
import { NgForm, ReactiveFormsModule } from '@angular/forms';
import { OuterlayoutComponent } from './layout/outerlayout/applayout.component';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './userauth/login/login.component';
import { SignupComponent } from './userauth/signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { CommonheaderComponent } from './outer/commonheader/commonheader.component';
import { CommonfooterComponent } from './outer/commonfooter/commonfooter.component';
import { UserlayoutComponent } from './layout/userlayout/userlayout.component';
import { UserheaderComponent } from './layout/userlayout/userheader/userheader.component';
import { UserfooterComponent } from './layout/userlayout/userfooter/userfooter.component';
import { UsersidebarComponent } from './layout/userlayout/usersidebar/usersidebar.component';
import { UserorderComponent } from './layout/userlayout/userorder/userorder.component';
import { AccountsettingComponent } from './layout/userlayout/accountsetting/accountsetting.component';
import { SavedaddressComponent } from './layout/userlayout/savedaddress/savedaddress.component';
import { PaymentoptionComponent } from './layout/userlayout/paymentoption/paymentoption.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { SellerlayoutComponent } from './layout/sellerlayout/sellerlayout.component';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { SellerheaderComponent } from './layout/sellerlayout/sellerheader/sellerheader.component';
import { SellerfooterComponent } from './layout/sellerlayout/sellerfooter/sellerfooter.component';
import { SellersidebarComponent } from './layout/sellerlayout/sellersidebar/sellersidebar.component';
import { ManageproductComponent } from './layout/sellerlayout/manageproduct/manageproduct.component';
import { ManageordersComponent } from './layout/sellerlayout/manageorders/manageorders.component';
import { SellerinfoComponent } from './layout/sellerlayout/sellerinfo/sellerinfo.component';
import { CustomerfeedbackComponent } from './layout/sellerlayout/customerfeedback/customerfeedback.component';
import { SupportComponent } from './layout/sellerlayout/support/support.component';
import { MatIconModule } from '@angular/material/icon';
import { ProductpageComponent } from './layout/outerlayout/productpage/productpage.component';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SearchpageComponent } from './layout/outerlayout/searchpage/searchpage.component'; 
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { CartpageComponent } from './layout/outerlayout/cartpage/cartpage.component';
import { CheckoutpageComponent } from './layout/userlayout/checkoutpage/checkoutpage.component';
import { MatDialogModule } from '@angular/material/dialog';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    OuterlayoutComponent,
    LoginComponent,
    SignupComponent,
   
    CommonheaderComponent,
    CommonfooterComponent,
    UserlayoutComponent,
    UserheaderComponent,
    UserfooterComponent,
    UsersidebarComponent,
    UserorderComponent,
    AccountsettingComponent,
    SavedaddressComponent,
    PaymentoptionComponent,
    SellerlayoutComponent,
    SellerheaderComponent,
    SellerfooterComponent,
    SellersidebarComponent,
    ManageproductComponent,
    ManageordersComponent,
    SellerinfoComponent,
    CustomerfeedbackComponent,
    SupportComponent,
    ProductpageComponent,
    SearchpageComponent,
    CartpageComponent,
    CheckoutpageComponent
    
    
    
  ],
  imports: [MatDialogModule,CommonModule,NgxSliderModule,FormsModule,MatProgressSpinnerModule,NgxSpinnerModule,ToastrModule.forRoot(),MatIconModule,NgbCollapseModule,BrowserModule, AppRoutingModule, ReactiveFormsModule, CommonModule, HttpClientModule,BrowserAnimationsModule,MatMenuModule,MatButtonModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
  }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
