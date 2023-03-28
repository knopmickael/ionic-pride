import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'messages',
    loadChildren: () => import('./pages/list-messages/list-messages.module').then( m => m.ListMessagesPageModule)
  },
  {
    path: 'messages/:id',
    loadChildren: () => import('./pages/show-message/show-message.module').then( m => m.ShowMessagePageModule)
  },
  {
    path: '',
    redirectTo: 'messages',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
