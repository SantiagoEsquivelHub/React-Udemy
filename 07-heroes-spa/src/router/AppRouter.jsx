import { Routes, Route } from 'react-router-dom'
import { LoginPage } from '../auth/'
import { HeroesRoutes } from '../heroes'
import { PrivateRoute } from './private/PrivateRoute'
import { PublicRoute } from './public/PublicRoute'

export const AppRouter = () => {
    return (
        <>
            <Routes>
                {/* public */}

                <Route path='login' element={
                    <PublicRoute>
                        {/* <LoginPage /> */}
                        <Routes>
                            <Route path='/*' element={<LoginPage />} />
                        </Routes>
                    </PublicRoute>
                } />


                {/* private */}

                <Route path='/*' element={
                    <PrivateRoute>
                        <HeroesRoutes />
                    </PrivateRoute>
                } />


            </Routes>
        </>
    )
}
