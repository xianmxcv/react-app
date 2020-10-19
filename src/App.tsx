import Login from '@/views/passport/login'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import React from 'react'
import { Provider } from 'react-redux'
import { Redirect, Switch, Route, HashRouter } from 'react-router-dom'
import 'moment/locale/zh-cn'
// eslint-disable-next-line import/order

interface IcacheLifecycles {
  didCache: (param: any) => void
  didRecover: (param: any) => void
}

export interface ICacheRouteComponentProps {
  cacheLifecycles: IcacheLifecycles
}
interface IProps {
  store: any
}

const redirect = () => <Redirect to="/login" />

const App = (props: IProps) => {
  return (
    <div className="App">
      <Provider store={props.store}>
        <ConfigProvider locale={zhCN}>
          <HashRouter>
            <Switch>
              <Route path="/" exact render={redirect} />
              <Route path="/login" exact component={Login} />
            </Switch>
          </HashRouter>
        </ConfigProvider>
      </Provider>
    </div>
  )
}

export default App
