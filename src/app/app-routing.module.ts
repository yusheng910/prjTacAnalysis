import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComparisonComponent } from './comparison/comparison.component';
import { TrendComponent } from './trend/trend.component';

const routes: Routes = [
    {
        path: 'comparison',
        loadChildren: () => import('./comparison/comparison.module').then(m => m.ComparisonModule)
    },
    {
        path: 'trend',
        loadChildren: () => import('./trend/trend.module').then(m => m.TrendModule)
    },
    { path: '', redirectTo: '/comparison', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
