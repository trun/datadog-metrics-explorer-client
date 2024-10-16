export interface MetricsExplorerQuery {
  query: string
  name: string
  data_source: 'metrics' // TODO support other query data sources
}

export interface MetricsExplorerFormula {
  formula: string
  alias?: string
}

export interface MetricsExplorerRequest {
  response_format: 'timeseries'
  queries: MetricsExplorerQuery[]
  formulas: MetricsExplorerFormula[]
  style: {
    palette: 'dog_classic' | 'semantic'
    order_reverse?: boolean
    line_type?: 'solid' | 'dashed' | 'dotted'
    line_width?: 'normal' | 'thin' | 'thick'
  },
  display_type: 'line' | 'bars' | 'area'
}

export interface MetricsExplorerSplitConfig {
  split_dimensions: [
    {
      one_graph_per: string
    }
  ],
  limit: number
  sort: {
    order: 'desc' | 'asc'
  }
}

export interface MetricsExplorerWidgetLayout {
  x: number
  y: number
  width: number
  height: number
}

export interface MetricsExplorerWidgetDefinition {
  type: 'timeseries'
  requests: MetricsExplorerRequest[]
}

export interface MetricsExplorerWidget {
  layout: MetricsExplorerWidgetLayout
  definition: MetricsExplorerWidgetDefinition
}

export interface MetricsExplorerPayload {
  widget: MetricsExplorerWidget
  splitConfig?: MetricsExplorerSplitConfig
}

export interface MetricsExplorerParams {
  end?: Date
  start?: Date
  paused?: boolean
  graph_layout: 'multi' | 'stacked' | 'split'
}

export interface MetricsExplorerParamsAndPayload {
  params: MetricsExplorerParams
  payload: MetricsExplorerPayload
}

export interface MetricsExplorerConfiguration {
  baseUrl?: string
}
