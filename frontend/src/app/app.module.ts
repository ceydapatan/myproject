import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ReadComponent } from './items/read/read.component';
import { UpdateComponent } from './items/update/update.component';
import { DeleteComponent } from './items/delete/delete.component';
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { pencilSquare } from 'ngx-bootstrap-icons';
import {trash } from 'ngx-bootstrap-icons';
import {search } from 'ngx-bootstrap-icons';
import {cart3 } from 'ngx-bootstrap-icons';
import {cartPlus} from 'ngx-bootstrap-icons';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';



import { FormComponent } from './items/read/form/form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CreatecartComponent } from './carts/createcart/createcart.component';
import { ReadcartComponent } from './carts/readcart/readcart.component';
import { UpdatecartComponent } from './carts/updatecart/updatecart.component';
import { DeletecartComponent } from './carts/deletecart/deletecart.component';
import { FormaddtocartComponent } from './carts/readcart/formaddtocart/formaddtocart.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CheckoutComponent } from './carts/readcart/checkout/checkout.component';
import {ShippingaddressService} from './shared/shippingaddress.service';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactComponent } from './contact/contact.component';
import { CreateComponent } from './items/create/create.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {ThemeModule} from './theme/theme.module';
import {darkTheme} from './theme/dark-theme';
import {lightTheme} from './theme/light-theme';

const icons = {
  pencilSquare,
  trash,
  cart3,
  cartPlus,
  search

};

export function playerFactory() {
  return import('lottie-web');
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ReadComponent,
    UpdateComponent,
    DeleteComponent,
    FormComponent,
    CreatecartComponent,
    ReadcartComponent,
    UpdatecartComponent,
    DeletecartComponent,
    FormaddtocartComponent,
    CheckoutComponent,
    AboutusComponent,
    ContactComponent,
    CreateComponent,
    LoginComponent,
    RegisterComponent
  ],
    imports: [
        LottieModule.forRoot({player: playerFactory}),
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        HttpClientModule,
        NgxBootstrapIconsModule.pick(icons),
        ReactiveFormsModule,
        NgbModule,
        FormsModule,
      ThemeModule.forRoot({
        themes: [lightTheme, darkTheme],
        active: 'light'
      })

    ],
  providers: [ShippingaddressService],
  bootstrap: [AppComponent]
})
export class AppModule { }
