import { Component, inject, input, computed } from '@angular/core';

import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';

import * as echarts from 'echarts/core';

import { LineChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, DataZoomComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([ LineChart, GridComponent, CanvasRenderer, TooltipComponent, DataZoomComponent, LegendComponent ]);

import { ChartOptionsType } from '../../types/chart-options-type';
import { ChartMonthType }  from '../../types/chart-month-type';

import { ChartService }   from '../../services/chart-service';

@Component({
  selector: 'app-chart-seasons',
  imports: [ NgxEchartsDirective ],
  templateUrl: './chart-seasons.html',
  styleUrl: './chart-seasons.scss',
  providers: [ provideEchartsCore({ echarts }) ]
})

export class ChartSeasons {
  #chart = inject(ChartService);

  months = input.required<ChartMonthType[]>();

  options = computed(() => {
    const months = this.months();

    const options : ChartOptionsType = {  // echarts.EChartsCoreOption
      animation : true,
      animationDuration: 200,
      grid: {
        top: '20px',
        left: '20px',
        right: '20px',
        bottom: '20px'
      },
      tooltip : { trigger : 'item' },
      legend : { show : false },
      xAxis: [{
        tyoe: 'category',
        min: 1, max: 12,
        axisTick: { alignWithLabel: true },
      }],
      yAxis: [{
        type: 'value',
      }],
    };

    const sopts  = { type : 'line', smooth : true, emphasis : { focus : 'series' }, symbol : 'circle' };

    options['series']        = this.#chart.calcSeasonsSeries(months, sopts);
    options['xAxis'][0].data = [ 'Dez', 'Jan', 'Feb', 'März', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez', 'Jan' ];

    return options;
  });
}
