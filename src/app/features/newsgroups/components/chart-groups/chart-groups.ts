import { Component, inject, input, model, computed } from '@angular/core';

import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';

import * as echarts from 'echarts/core';

import { BarChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, DataZoomComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([BarChart, GridComponent, CanvasRenderer, TooltipComponent, DataZoomComponent, LegendComponent ]);

import { ChartGranularityEnum } from '../../constants/chart-granularity-enum';

import { ChartOptionsType } from '../../types/chart-options-type';
import { ChartMonthType }   from '../../types/chart-month-type';
import { ChartYearType }    from '../../types/chart-year-type';

import { ChartService }   from '../../services/chart-service';

@Component({
  selector: 'app-chart-groups',
  imports: [ NgxEchartsDirective ],
  templateUrl: './chart-groups.html',
  styleUrl: './chart-groups.scss',
  providers: [ provideEchartsCore({ echarts }) ]
})

export class ChartGroups {
  #chart = inject(ChartService);

  months = input.required<ChartMonthType[]>();
  years  = input.required<ChartYearType[]>();

  gran   = model<ChartGranularityEnum>(ChartGranularityEnum.Months, { alias : 'granularity' });
  year   = model<number>();

  options = computed(() => {
    const months = this.months();
    const years  = this.years();

    const gran = this.gran();
    const year = this.year();

    const options : ChartOptionsType = {  // echarts.EChartsCoreOption
      animation : false,
      animationDuration: 200,
      grid: {
        top: '20px',
        left: '20px',
        right: '20px',
        bottom: '25%'
      },
      tooltip : { trigger : 'item' },
      legend : { bottom: '5px', selectedMode: false },
      xAxis: [{
        type: 'category',
        axisTick: { alignWithLabel: true },
      }],
      yAxis: [{
        type: 'value',
        minInterval: 1
      }],
      dataZoom: [
        { type : 'slider', xAxisIndex: 0, filterMode: 'filter', bottom: '20px', left : '20px' },
        { type : 'inside', xAxisIndex: 0 }
      ],
    };

    const sopts  = { type : 'bar', 'stack' : 'a', barWidth : '60%' };

    if (gran == ChartGranularityEnum.Months) {
      options['series']        = this.#chart.calcGroupsMonthsSeries(months, sopts);
      options['xAxis'][0].data = this.#chart.monthsLabels(months, 'mm/yy');

      if (year) {
        const [ zoomStart, zoomEnd ] = this.#chart.calcMonthsYearZoom(months, year);

        options['dataZoom'][0].startValue = zoomStart;
        options['dataZoom'][0].endValue   = zoomEnd;
      }

      return options;

    } else {
      options['series']        = this.#chart.calcGroupsYearsSeries(years, sopts);
      options['xAxis'][0].data = this.#chart.yearsLabels(months);

      return options;
    }
  });

  onChartClick($event:any) { /* eslint-disable-line @typescript-eslint/no-explicit-any */
    if (this.gran() == ChartGranularityEnum.Years) {
      const year:number = parseInt($event.name, 10);

      this.gran.set(ChartGranularityEnum.Months);
      this.year.set(year);

    } else {
      this.gran.set(ChartGranularityEnum.Years);
      this.year.set(undefined);
    }
  }
}
