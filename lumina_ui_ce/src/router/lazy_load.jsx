import { Suspense } from 'react'
import Loading from 'components/loading'

// 自定义懒加载，预防全屏闪屏
const lazyLoad = component => <Suspense fallback={<Loading />}>{component}</Suspense >

export default lazyLoad;
