
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
  response_format: 'timeseries',
  queries: MetricsExplorerQuery[],
  formulas: MetricsExplorerFormula[],
  style: {
    palette: 'dog_classic' | 'semantic',
    line_type?: 'solid' | 'dashed' | 'dotted',
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

export interface MetricsExplorerPayload {
  widget: {
    layout: {
      x: number
      y: number
      width: number
      height: number
    }
    definition: {
      type: 'timeseries'
      requests: MetricsExplorerRequest[]
    }
  }
  splitConfig?: MetricsExplorerSplitConfig
}

export interface MetricsExplorerParams {
  end?: Date
  start?: Date
  paused?: boolean
  graph_layout: 'multi' | 'stacked'
}

export interface MetricsExplorerConfiguration {
  baseUrl?: string
}

export declare class MetricsExplorer {
  private configuration
  constructor(configuration: MetricsExplorerConfiguration)
  encodeMetricsExplorerUrl(params: MetricsExplorerParams, payload: MetricsExplorerPayload): string
  decodeMetricsExplorerUrl(url: string): MetricsExplorerPayload
}
