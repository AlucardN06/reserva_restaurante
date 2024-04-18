import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login-cliente',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'registro-cliente',
    loadChildren: () => import('./registro-cliente/registro-cliente.module').then( m => m.RegistroClientePageModule)
  },
  {
    path: 'login-cliente',
    loadChildren: () => import('./login-cliente/login-cliente.module').then( m => m.LoginClientePageModule)
  },
  {
    path: 'cliente',
    loadChildren: () => import('./cliente/cliente.module').then( m => m.ClientePageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'editar',
    loadChildren: () => import('./editar/editar.module').then( m => m.EditarPageModule)
  },
  {
    path: 'login-restauran',
    loadChildren: () => import('./login-restauran/login-restauran.module').then( m => m.LoginRestauranPageModule)
  },
  {
    path: 'registro-restauran',
    loadChildren: () => import('./registro-restauran/registro-restauran.module').then( m => m.RegistroRestauranPageModule)
  },
  {
    path: 'admin-restauran',
    loadChildren: () => import('./admin-restauran/admin-restauran.module').then( m => m.AdminRestauranPageModule)
  },
  {
    path: 'editar2',
    loadChildren: () => import('./editar2/editar2.module').then( m => m.Editar2PageModule)
  },
  {
    path: 'mesas-edit',
    loadChildren: () => import('./mesas-edit/mesas-edit.module').then( m => m.MesasEditPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
