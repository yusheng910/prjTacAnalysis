import { Component, OnInit } from '@angular/core';
import { GetComparisonByYearService } from '../@services/get-comparison-by-year.service';
import { EChartsOption } from 'echarts';

@Component({
    selector: 'app-comparison',
    templateUrl: './comparison.component.html',
    styleUrls: ['./comparison.component.scss']
})
export class ComparisonComponent implements OnInit {

    yearSelected!: string;

    yearList: string[] = [];

    get allAccidents(): number{
        return this.getComparisonByYearService.allAccidents;
    }

    get cityList(): string[] {
        return this.getComparisonByYearService.cityList.reverse();
    }

    get driverCause(): number[] {
        return this.getComparisonByYearService.driverCause.reverse();
    }

    get machineryCause(): number[] {
        return this.getComparisonByYearService.machineryCause.reverse();
    }

    get pedestrianCause(): number[] {
        return this.getComparisonByYearService.pedestrianCause.reverse();
    }

    get facilityCause(): number[] {
        return this.getComparisonByYearService.facilityCause.reverse();
    }

    get otherCauses(): number[] {
        return this.getComparisonByYearService.otherCauses.reverse();
    }

    options: EChartsOption = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                // Use axis to trigger tooltip
                type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
            }
        },
        legend: {},
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value'
        },
        yAxis: {
            type: 'category',
            data: []
        },
        series: [
            {
                name: '汽（機、慢）車駕駛人過失',
                type: 'bar',
                stack: 'total',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                data: []
            },
            {
                name: '機件故障',
                type: 'bar',
                stack: 'total',
                label: {
                    show: false
                },
                emphasis: {
                    focus: 'series'
                },
                data: []
            },
            {
                name: '行人（或乘客）過失',
                type: 'bar',
                stack: 'total',
                label: {
                    show: false
                },
                emphasis: {
                    focus: 'series'
                },
                data: []
            },
            {
                name: '交通管制（設施）缺陷',
                type: 'bar',
                stack: 'total',
                label: {
                    show: false
                },
                emphasis: {
                    focus: 'series'
                },
                data: []
            },
            {
                name: '其他',
                type: 'bar',
                stack: 'total',
                label: {
                    show: false
                },
                emphasis: {
                    focus: 'series'
                },
                data: []
            }
        ]
    };

    mergeOptions: any;

    constructor(private getComparisonByYearService: GetComparisonByYearService) { }

    ngOnInit() {
        this.getComparisonByYearService.getYears().subscribe((data: string[]) => {
            this.yearList = data;

            // set default year as latest
            if (this.yearList.length > 0) {
                this.yearSelected = this.yearList[this.yearList.length - 1];
            }
            this.onSelect(this.yearSelected);
        });
    }

    onSelect(year: string) {
        // getDataByYear triggered by select
        this.getComparisonByYearService.getDataByYear(year).then(() => {
            this.mergeOptions = {
                yAxis: {
                    data: this.cityList
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
