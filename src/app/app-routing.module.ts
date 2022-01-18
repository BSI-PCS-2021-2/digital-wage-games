import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { ProdutoComponent } from './components/produto/produto.component';
import { CartComponent } from './components/cart/cart.component';
import { PasswordRecoveryComponent } from './components/password-recovery/password-recovery.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { SupportComponent } from './components/support/support.component';
import { EditProfileComponent } from './components/my-account/edit-profile/edit-profile.component';
import { AdmLoginComponent } from './components/adm-login/adm-login.component';
import { AdmHomeComponent } from './components/adm-home/adm-home.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadastrar', component: SignupComponent },
  { path: 'catalogo', component: CatalogoComponent },
  { path: 'produto/:produto', component: ProdutoComponent },
  { path: 'carrinho', component: CartComponent },
  { path: 'restauracao-senha', component: PasswordRecoveryComponent },
  { path: 'minha-conta', component: MyAccountComponent },
  { path: 'minha-conta', children: [ { path: 'editar', component: EditProfileComponent }] },
  { path: 'minha-conta/:success', component: MyAccountComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'suporte', component: SupportComponent },
  { path: 'adm-login' , component: AdmLoginComponent },
  { path: 'adm-home' , component: AdmHomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
