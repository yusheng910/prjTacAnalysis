import { Component, OnInit } from '@angular/core';

import { GetTrendByCityService } from '../@services/get-trend-by-city.service';
import { EChartsOption } from 'echarts';

@Component({
    selector: 'app-trend',
    templateUrl: './trend.component.html',
    styleUrls: ['./trend.component.scss'],
})
export class TrendComponent implements OnInit {

    citySelected!: string;

    cityList: string[] = [];

    get yearList(): string[] {
        return this.getTrendByCityService.yearList;
    }

    get driverCause(): number[] {
        return this.getTrendByCityService.driverCause;
    }

    get machineryCause(): number[] {
        return this.getTrendByCityService.machineryCause;
    }

    get pedestrianCause(): number[] {
        return this.getTrendByCityService.pedestrianCause;
    }

    get facilityCause(): number[] {
        return this.getTrendByCityService.facilityCause;
    }

    get otherCauses(): number[] {
        return this.getTrendByCityService.otherCauses;
    }

    options: EChartsOption = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            data: ['汽（機、慢）車駕駛人過失', '機件故障', '行人（或乘客）過失', '交通管制（設施）缺陷', '其他']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: []
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: '汽（機、慢）車駕駛人過失',
                type: 'line',
                stack: 'Total',
                label: {
                    show: true
                },
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: []
            },
            {
                name: '機件故障',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: []
            },
            {
                name: '行人（或乘客）過失',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: []
            },
            {
                name: '交通管制（設施）缺陷',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: []
            },
            {
                name: '其他',
                type: 'line',
                stack: 'Total',
                label: {
                    show: false,
                    position: 'top'
                },
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: []
            }
        ]
    };

    mergeOptions: any;

    constructor(private getTrendByCityService: GetTrendByCityService) { }

    ngOnInit() {
        this.getTrendByCityService.getCities().subscribe((data: string[]) => {
            this.cityList = data;

            if (this.cityList.length > 0) {
                this.citySelected = this.cityList[0];
            }
            this.onSelect(this.citySelected);
        });

    }

    onSelect(city: string) {
        // getDataByYear triggered by select
        this.getTrendByCityService.getDataByCity(city).then(() => {
            this.mergeOptions = {
                xAxis: {
                    data: this.yearList
                },
                series: [
                    {
                        data: this.driverCause
                    },
                    {
                        data: this.machineryCause
                    },
                    {
                        data: this.pedestrianCause
                    },
                    {
                        data: this.facilityCause
                    },
                    {
                        data: this.otherCauses
                    }
                ]
            };
        });
    }

}
