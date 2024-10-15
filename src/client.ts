import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string'
import {
  MetricsExplorerConfiguration,
  MetricsExplorerParams,
  MetricsExplorerParamsAndPayload,
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

  encodeMetricsExplorerUrl(params: MetricsExplorerParams, payload: MetricsExplorerPayload): string {
    const queryParams = {
      end: `${(params.end || new Date()).getTime()}`,
      start: `${(params.start || new Date((new Date().getTime()) - 86400000)).getTime()}`,
      paused: `${params.paused || false}`,
      graph_layout: params.graph_layout || 'multi'
    }

    const explorerDefinitionHash = compressToEncodedURIComponent(JSON.stringify(payload))
    return `${this.getBaseUrl()}/metric/explorer?${new URLSearchParams(queryParams).toString()}#${explorerDefinitionHash}`
  }

  encodeMetricsExplorerHash(payload: MetricsExplorerPayload): string {
    return compressToEncodedURIComponent(JSON.stringify(payload))
  }

  decodeMetricsExplorerUrl(url: string): MetricsExplorerParamsAndPayload {
    const urlObj = new URL(url)
    const payload = JSON.parse(decompressFromEncodedURIComponent(urlObj.hash.substring(1))) as MetricsExplorerPayload
    const startParam = urlObj.searchParams.get('start')
    const endParam = urlObj.searchParams.get('end')
    const params: MetricsExplorerParams = {
      end: endParam ? new Date(parseInt(endParam)) : undefined,
      start: startParam ? new Date(parseInt(startParam)) : undefined,
      paused: Boolean(urlObj.searchParams.get('paused')),
      graph_layout: urlObj.searchParams.get('graph_layout'),
    } as MetricsExplorerParams

    return {
      params,
      payload,
    }
  }

  decodeMetricsExplorerHash(hash: string): MetricsExplorerPayload {
    return JSON.parse(decompressFromEncodedURIComponent(hash)) as MetricsExplorerPayload
  }
}
