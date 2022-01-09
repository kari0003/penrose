import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PenroseComponent } from './penrose/penrose.component';

const routes: Routes = [{ path: '**', component: PenroseComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
