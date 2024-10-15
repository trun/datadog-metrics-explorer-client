# Datadog Metrics Explorer Client

A simple client for encoding / decoding links for Datadog's [Metrics Explorer](https://docs.datadoghq.com/metrics/explorer/) tool.

## Usage

### Encoding Metrics Explorer Links

```javascript
import { MetricsExplorer } from 'datadog-metrics-explorer-client'
const explorer = new MetricsExplorer()

const params = {
  start: new Date(Date.now() - (86400 * 1000)),
  paused: false,
  graph_layout: 'multi'
}
const payload = {
  "widget": {
    "layout": {
      "x": 1,
      "y": 1,
      "width": 1,
      "height": 1
    },
    "definition": {
      "type": "timeseries",
      "requests": [
        {
          "response_format": "timeseries",
          "queries": [
            {
              "name": "query1",
              "data_source": "metrics",
              "query": "avg:system.cpu.user{*}"
            }
          ],
          "formulas": [
            {
              "formula": "query1"
            }
          ],
          "style": {
            "palette": "dog_classic",
            "line_type": "solid",
            "line_width": "normal"
          },
          "display_type": "line"
        }
      ]
    }
  },
  "splitConfig": null
}

const metricsExplorerUrl = explorer.enecodeMetricsExplorerUrl(params, payload)
```

### Decoding Metrics Explorer Links

```javascript
import { MetricsExplorer } from 'datadog-metrics-explorer-client'
const explorer = new MetricsExplorer()
const payload = explorer.decodeMetricsExplorerUrl('https://app.datadoghq.com/metric/explorer#N4Ig7glg...')
```

