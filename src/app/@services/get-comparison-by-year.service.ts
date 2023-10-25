import { Injectable } from '@angular/core';
import { TacApiService } from './tac-api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class GetComparisonByYearService {

    allAccidents!: number;
    
    cityList!: string[];

    driverCause!: number[];

    machineryCause!: number[];

    pedestrianCause!: number[];

    facilityCause!: number[];

    otherCauses!: number[];

    constructor(private tacApiService: TacApiService) { }

    getYears(): Observable<string[]> {
        return this.tacApiService.getRawDataApi().pipe(map(data => {
            const yearSet = new Set<string>();
            for (const item of data) {
                const year = item.民國年;
                yearSet.add(year);
            }
            return Array.from(yearSet);
        }))
    }

    getDataByYear(year: string): Promise<void> {
        return new Promise<void>((resolve) => {
            this.tacApiService.getRawDataApi().pipe(
                map(data => data.filter(item => item.民國年 === year))
            ).subscribe(result => {

                this.allAccidents = 0;
                this.cityList = []
                this.driverCause = []
                this.machineryCause = []
                this.pedestrianCause = []
                this.facilityCause = []
                this.otherCauses = []
                
                for (const item of result) {

                    this.allAccidents += item.肇事件數;
                    this.cityList.push(item.縣市);
                    this.driverCause.push(item['汽（機、慢）車駕駛人過失']);
                    this.machineryCause.push(item.機件故障);
                    this.pedestrianCause.push(item['行人（或乘客）過失']);
                    this.facilityCause.push(item['交通管制（設施）缺陷']);
                    this.otherCauses.push(item.其他);
                }
                resolve();
            });
        });
    }
}
