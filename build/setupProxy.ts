// 注： 每次修改此文件，需重启服务才能生效

// 代理路径
const configuration = 'http://172.168.0.100:8011'
const metricdata = 'http://172.168.0.100:8012'
const telemetry = 'http://172.168.0.100:8013'
const organization = 'http://172.168.0.100:8443'

const proxy = {
  '/configuration': {
    target: `http://${configuration}`,
    secure: false,
    changeOrigin: true,
  },
}

export default proxy
