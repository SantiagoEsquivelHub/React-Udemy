import { Routes, Route } from 'react-router-dom'
import { LoginPage } from '../auth/'
import { HeroesRoutes } from '../heroes'
import { PrivateRouter } from './private/PrivateRouter'
import { PublicRouter } from './public/PublicRouter'

export const AppRouter = () => {
    return (
        <>
            <Routes>
                {/* public */}

                <Route path='login' element={
                    <PublicRouter>
                        {/* <LoginPage /> */}
                        <Routes>
                            <Route path='/*' element={<LoginPage />} />
                        </Routes>
                    </PublicRouter>
                } />


                {/* private */}

                <Route path='/*' element={
                    <PrivateRouter>
                        <HeroesRoutes />
                    </PrivateRouter>
                } />


            </Routes>
        </>
    )
}
