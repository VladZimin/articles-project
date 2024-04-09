import {Route, Routes} from 'react-router-dom'
import {Suspense} from 'react'
import {routeConfig} from 'shared/config/routeConfig/routeConfig'

export const AppRouter = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                {routeConfig.map(({path, element}) => <Route key={path} path={path} element={element}/>)}
            </Routes>
        </Suspense>
    )
}