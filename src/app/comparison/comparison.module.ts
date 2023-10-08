import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';

import { ComparisonRoutingModule } from './comparison-routing.module';
import { ComparisonComponent } from './comparison.component';
import { FormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        ComparisonComponent
    ],
    imports: [
        CommonModule,
        ComparisonRoutingModule,
        FormsModule,
        NgxEchartsModule.forRoot({
            echarts: () => import('echarts')
        })
    ]
})
export class ComparisonModule { }
