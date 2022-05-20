import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

import { LoginComponent } from './components/accounts/login/login.component';
import { AllbiddingComponent } from './components/allbidding/allbidding.component';
import { ApprovalComponent } from './components/approval/approval.component';
import { BiddingComponent } from './components/bidding/bidding.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { PlacebidComponent } from './components/placebid/placebid.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { TranscationComponent } from './components/transcation/transcation.component';
import { UserboardComponent } from './components/userboard/userboard.component';
import { UserlistingComponent } from './userlisting/userlisting.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    //home component
    path: 'home',
    component: HomeComponent,
  },
  {
    //login component
    path: 'login',
    component: LoginComponent,
  },
  {
    //signup component
    path: 'signup',
    component: SignUpComponent,
  },
  {
    //bidding component
    path: 'bidding',
    component: BiddingComponent,
    canActivate:[AuthGuard]
  },
  {
    //placebid id
    path: 'placebid/:id',
    component: PlacebidComponent,
  },
  {
    //home id
    path: 'home/:username',
    component: HomeComponent,
   
  },
  {
    
    path: 'dashboard',
    component: DashboardComponent,

  },
  {
    
    path: 'userboard',
    component: UserboardComponent,
    canActivate:[AuthGuard]
  },
  {
    
    path: 'userlistings',
    component:UserlistingComponent,
    canActivate:[AuthGuard]
  },
  {
    
    path: 'approval/:id',
    component: ApprovalComponent,
  },
  {
    
    path: 'approval/:bidId',
    component: ApprovalComponent,
  },
  {
    
    path: 'transcation/:bidId',
    component: TranscationComponent,
  },
  {
    
    path: 'transcation',
    component: TranscationComponent,
  },
  {
   
    path: 'allbiddings',
    component: AllbiddingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
