import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreationPostComponent } from './components/creation-post/creation-post.component';
import { DetailPostComponent } from './components/detail-post/detail-post.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'post/:id',
    component: DetailPostComponent
  },
  {
    path: 'create-post',
    component: CreationPostComponent
  },
  {
    path: 'edit-post',
    component: EditPostComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
