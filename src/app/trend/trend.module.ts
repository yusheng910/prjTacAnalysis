import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';

import { TrendRoutingModule } from './trend-routing.module';
import { TrendComponent } from './trend.component';
import { FormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        TrendComponent
    ],
    imports: [
        CommonModule,
        TrendRoutingModule,
        FormsModule,
        NgxEchartsModule.forRoot({
            echarts: () => import('echarts')
        })
    ]
})
export class TrendModule { }
