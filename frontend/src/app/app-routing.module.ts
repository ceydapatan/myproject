import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UpdateComponent } from './items/update/update.component';
import { ReadComponent } from './items/read/read.component';
import { DeleteComponent } from './items/delete/delete.component';
import {CreatecartComponent} from './carts/createcart/createcart.component';
import {UpdatecartComponent} from './carts/updatecart/updatecart.component';
import {ReadcartComponent} from './carts/readcart/readcart.component';
import {DeletecartComponent} from './carts/deletecart/deletecart.component';
import {CheckoutComponent} from './carts/readcart/checkout/checkout.component';
import {AboutusComponent} from './aboutus/aboutus.component';
import {ContactComponent} from './contact/contact.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {NavComponent} from './nav/nav.component';
import {IndexComponent} from './index/index.component';




const routes: Routes = [

  //Login & Registrierung
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},



  //Info
  { path: 'aboutus', component: AboutusComponent },
  { path: 'contact', component: ContactComponent },


  { path: '', component: AboutusComponent },


  // routes für die items
  { path: 'update', component: UpdateComponent },
  { path: 'update/:id', component: UpdateComponent },
  { path: 'read', component: ReadComponent },
  { path: 'read/:id', component: ReadComponent },
  { path: 'delete', component: DeleteComponent },
  { path: 'delete/:id', component: DeleteComponent },

  // routes für die carts
  { path: 'createcart', component: CreatecartComponent },
  { path: 'updatecart', component: UpdatecartComponent },
  { path: 'updatecart/:id', component: UpdatecartComponent },
  { path: 'readcart', component: ReadcartComponent },
  { path: 'readcart/checkout', component: CheckoutComponent },

  { path: 'readcart/:id', component: ReadcartComponent },
  { path: 'deletecart', component: DeletecartComponent },
  { path: 'deletecart/:id', component: DeletecartComponent },

  { path: '**', component: PageNotFoundComponent },





];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
