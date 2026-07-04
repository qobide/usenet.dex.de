import { Component, inject, input, model, computed } from '@angular/core';

import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';

import * as echarts from 'echarts/core';

import { BarChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, DataZoomComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([ BarChart, GridComponent, CanvasRenderer, TooltipComponent, DataZoomComponent, LegendComponent ]);

import { ChartGranularityEnum } from '../../constants/chart-granularity-enum';

import { ChartOptionsType } from '../../types/chart-options-type';
import { ChartMonthType }   from '../../types/chart-month-type';
import { ChartYearType }    from '../../types/chart-year-type';

import { ChartService }   from '../../services/chart-service';


@Component({
  selector: 'app-chart-gain-loss',
  imports: [ NgxEchartsDirective ],
  templateUrl: './chart-gain-loss.html',
  styleUrl: './chart-gain-loss.scss',
  providers: [ provideEchartsCore({ echarts }) ]
})

export class ChartGainLoss {
  #chart = inject(ChartService);

  months = input.required<ChartMonthType[]>();
  years  = input.required<ChartYearType[]>();

  granularity = model<ChartGranularityEnum>(ChartGranularityEnum.Months);
  year        = model<number>();
  waterfall   = input<boolean>(true);

  options = computed(() => {
    const months = this.months();
    const years  = this.years();

    const granularity = this.granularity();
    const year        = this.year();
    const waterfall   = this.waterfall();

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
        axisTick: { alignWithLabel: true },
      }],
      yAxis: [{
        type: 'value',
      }],
      dataZoom: [
        { type : 'slider', xAxisIndex: 0, filterMode: 'filter', bottom: '50px' },
        { type : 'inside', xAxisIndex: 0 }
      ],
    };

    const sopts  = { type : 'bar', stack : 'bar' };

    if (granularity == ChartGranularityEnum.Months) {
      options['series']        = this.#chart.calcGainLossMonthsSeries(months, sopts, waterfall);
      options['xAxis'][0].data = this.#chart.monthsLabels(months, 'mm/yy');

      if (year) {
        const [ zoomStart, zoomEnd ] = this.#chart.calcMonthsYearZoom(months, year);

        options['dataZoom'][0].startValue = zoomStart;
        options['dataZoom'][0].endValue   = zoomEnd;
      }

      return options;

    } else {
      options['series']        = this.#chart.calcGainLossYearsSeries(years, sopts, waterfall);
      options['xAxis'][0].data = this.#chart.yearsLabels(months);

      return options;
    }
  });

  onChartClick($event:any) { /* eslint-disable-line @typescript-eslint/no-explicit-any */
    if (this.granularity() == ChartGranularityEnum.Years) {
      const year:number = parseInt($event.name, 10);

      this.granularity.set(ChartGranularityEnum.Months);
      this.year.set(year);

    } else {
      this.granularity.set(ChartGranularityEnum.Years);
      this.year.set(undefined);
    }
  }

}
