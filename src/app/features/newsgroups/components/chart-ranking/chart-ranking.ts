import { Component, inject, input, model, output, computed } from '@angular/core';

import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';

import * as echarts from 'echarts/core';

import { LineChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, DataZoomComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([LineChart, GridComponent, CanvasRenderer, TooltipComponent, DataZoomComponent, LegendComponent ]);

import { ChartGranularityEnum } from '../../constants/chart-granularity-enum';

import { ChartOptionsType } from '../../types/chart-options-type';
import { ChartMonthType   } from '../../types/chart-month-type';
import { ChartYearType }    from '../../types/chart-year-type';

import { ChartService }   from '../../services/chart-service';

@Component({
  selector: 'app-chart-ranking',
  imports: [ NgxEchartsDirective ],
  templateUrl: './chart-ranking.html',
  styleUrl: './chart-ranking.scss',
  providers: [ provideEchartsCore({ echarts }) ]
})

export class ChartRanking {
  #chart = inject(ChartService);

  months = input.required<ChartMonthType[]>();
  years  = input.required<ChartYearType[]>();

  granularity = input<ChartGranularityEnum>(ChartGranularityEnum.Years);
  year        = model<number>();

  rankingClicked = output<number>();

  options = computed(() => {
    const months = this.months();
    const years  = this.years();

    const granularity = this.granularity();
    const year        = this.year();

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
        type: 'log',
        logBase : 2,
        inverse: true
      }],
      dataZoom: [
        { type : 'slider', xAxisIndex: 0, filterMode: 'filter', bottom: '50px' },
        { type : 'inside', xAxisIndex: 0 }
      ],
    };

    const sopts  = { type : 'line', symbol : 'circle' };

    if (granularity == ChartGranularityEnum.Months) {
      options['series']        = this.#chart.calcRankingMonthsSeries(months, sopts);
      options['xAxis'][0].data = this.#chart.monthsLabels(months, 'mm/yy');

      if (year) {
        const [ zoomStart, zoomEnd ] = this.#chart.calcMonthsYearZoom(months, year);

        options['dataZoom'][0].startValue = zoomStart;
        options['dataZoom'][0].endValue   = zoomEnd;
      }


      return options;

    } else {
      options['series']        = this.#chart.calcRankingYearsSeries(years, sopts);
      options['xAxis'][0].data = this.#chart.yearsLabels(months);

      return options;
    }
  });

  onChartClick($event:any) { /* eslint-disable-line @typescript-eslint/no-explicit-any */
    this.rankingClicked.emit(Number($event.dataIndex));
  }

}
