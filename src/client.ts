import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string'
import {
  MetricsExplorerConfiguration,
  MetricsExplorerParams,
  MetricsExplorerPayload,
} from './types'

export class MetricsExplorer {
  private configuration?: MetricsExplorerConfiguration
  constructor(configuration?: MetricsExplorerConfiguration) {
    this.configuration = configuration
  }

  getBaseUrl() {
    return this.configuration?.baseUrl || 'https://app.datadoghq.com'
  }

  encodeMetricsExplorerUrl(params: MetricsExplorerParams, payload: MetricsExplorerPayload) {
    const queryParams = {
      end: `${(params.end || new Date()).getTime()}`,
      start: `${(params.start || new Date((new Date().getTime()) - 86400000)).getTime()}`,
      paused: `${params.paused || false}`,
      graph_layout: params.graph_layout || 'multi'
    }

    const explorerDefinitionHash = compressToEncodedURIComponent(JSON.stringify(payload))
    return `${this.getBaseUrl()}/metric/explorer?${new URLSearchParams(queryParams).toString()}#${explorerDefinitionHash}`
  }

  decodeMetricsExplorerUrl(url: string): MetricsExplorerPayload {
    return decompressFromEncodedURIComponent(new URL(url).hash.substring(1)) as MetricsExplorerPayload
  }
}
