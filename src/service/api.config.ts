import { IResponse } from '@/types/api'
import { AxiosRequestConfig } from 'axios'

const baseURL = ''
const metricURL = '/dashboard/metric'
const configurationURL = '/dashboard/configuration'

function transformResponse(response: IResponse<any>) {
    if ( response && response.code === '000000') {
      return response.data
    } else if (response) {
      throw new Error(response.mesg + '\n' + (response.data ? response.data : ''))
    } else {
      throw new Error('连接异常')
    }
  }

  const baseConfig: AxiosRequestConfig = {
    url: '',
    headers: { 'X-Requested-With': 'XMLHttpRequest' },
    responseType: 'json',
    timeout: 30000,
  }

  // 公共请求路由
export const commonConfig: AxiosRequestConfig = Object.assign(
    {},
    { ...baseConfig, baseURL: baseURL },
    {
      transformResponse: [transformResponse],
    }
  )

  // 默认form表单路由
export const uploadConfig = Object.assign(
    {},
    { ...baseConfig, baseURL: baseURL },
    {
      headers: { 'content-type': 'multipart/form-data' },
      timeout: 0, // no timeout
    },
    {
      transformResponse: [transformResponse],
    }
  )

  // dashboard请求路由
export const configurationConfig: AxiosRequestConfig = Object.assign(
    {},
    { ...baseConfig, baseURL: configurationURL },
    {
      transformResponse: [transformResponse],
    }
  )
  
  export const metricConfig: AxiosRequestConfig = Object.assign(
    {},
    { ...baseConfig, baseURL: metricURL },
    {
      transformResponse: [transformResponse],
    }
  )