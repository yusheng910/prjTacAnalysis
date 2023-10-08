import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TacItem } from '../@models/tac.model';
import { Observable, map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TacApiService {

    constructor(private http: HttpClient) { }

    getRawDataApi(): Observable<TacItem[]> {
        return this.http.get<TacItem[]>('assets/TAC_RawData.json').pipe(
            map(data => this.transformData(data))
        );
    }

    private transformData(data: any[]): TacItem[] {
        // remove commas from int string
        const removeCommas = (str: string) => str.replace(/,/g, '');
        return data.map(item => ({
            "民國年": item["民國年"],
            "縣市": item["縣市"],
            "肇事件數": parseInt(removeCommas(item["肇事件數"])),
            "汽（機、慢）車駕駛人過失": parseInt(removeCommas(item["汽（機、慢）車駕駛人過失"])),
            "機件故障": parseInt(removeCommas(item["機件故障"])),
            "行人（或乘客）過失": parseInt(removeCommas(item["行人（或乘客）過失"])),
            "交通管制（設施）缺陷": parseInt(removeCommas(item["交通管制（設施）缺陷"])),
            "其他": parseInt(removeCommas(item["其他"]))
        }));
    }
}
