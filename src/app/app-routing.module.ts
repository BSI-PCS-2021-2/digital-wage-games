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

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadastrar', component: SignupComponent },
  { path: 'catalogo', component: CatalogoComponent },
  { path: 'produto', component: ProdutoComponent },
  { path: 'carrinho', component: CartComponent },
  { path: 'restauracao-senha', component: PasswordRecoveryComponent },
  { path: 'minha-conta', component: MyAccountComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
