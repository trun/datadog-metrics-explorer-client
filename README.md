# Datadog Metrics Explorer Client

A simple client for encoding / decoding links for Datadog's [Metrics Explorer](https://docs.datadoghq.com/metrics/explorer/) tool.

## Usage

```javascript
import { MetricsExplorer } from 'datadog-metrics-explorer-client'

const explorer = new MetricsExplorer()




const payload = explorer.decodeMetricsExplorerUrl('https://app.datadoghq.com/metric/explorer#N4Ig7glg...')
```

