import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from '../auth/';
import { CalendarPage } from '../calendar';
import { useAuthStore } from '../hooks';

export const AppRouter = () => {

  const { status } = useAuthStore();

  return (
    <>
      <Routes>
        {
          status === 'not-authenticated'
            ? <Route path='/auth/*' element={<LoginPage />} />
            : <Route path='/*' element={<CalendarPage />} />
        }

        <Route path='/*' element={<Navigate to='/auth/login' />} />
      </Routes>
    </>
  )
}
