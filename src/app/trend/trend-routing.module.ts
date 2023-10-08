import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrendComponent } from './trend.component';

const routes: Routes = [
    { path: '', component: TrendComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TrendRoutingModule { }
