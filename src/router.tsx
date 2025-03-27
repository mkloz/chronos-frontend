import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { App } from './app';
import { ActivateAccountPage } from './modules/auth/pages/activate-account-page';
import { ForgotPasswordPage } from './modules/auth/pages/forgot-password-page';
import { LoginPage } from './modules/auth/pages/login-page';
import { ResetPasswordPage } from './modules/auth/pages/reset-password-page';
import { SignUpPage } from './modules/auth/pages/sign-up-page';
import { CalendarPage } from './modules/calendar/pages/calendar-page';
import { DashboardPage } from './modules/dashboard/pages/dashboard-page';
import { HomePage } from './modules/home/pages/home-page';
import { InvitationPage } from './modules/invitation/pages/invitation-page';
import { PublicCalendarsPage } from './modules/public-calendars/pages/public-calendars-page';
import { AuthGuard } from './shared/guard/auth-guard';
import NotFoundPage from './shared/pages/not-found-page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: '/sign-up',
        element: <SignUpPage />
      },
      {
        path: '/forgot-password',
        element: <ForgotPasswordPage />
      },
      {
        path: '/auth/reset-password/:token',
        element: <ResetPasswordPage />
      },
      {
        path: '/auth/activate/:token',
        element: (
          <AuthGuard>
            <ActivateAccountPage />
          </AuthGuard>
        )
      },
      {
        path: '/dashboard',
        element: (
          <AuthGuard>
            <DashboardPage />
          </AuthGuard>
        )
      },
      {
        path: '/calendar',
        element: (
          <AuthGuard>
            <CalendarPage />
          </AuthGuard>
        )
      },
      {
        path: '/public-calendars',
        element: (
          <AuthGuard>
            <PublicCalendarsPage />
          </AuthGuard>
        )
      },
      {
        path: '/calendar-invitation/:calendarId/accept/:invitationId',
        element: (
          <AuthGuard>
            <InvitationPage type="calendar" action="accept" />
          </AuthGuard>
        )
      },
      {
        path: '/calendar-invitation/:calendarId/decline/:invitationId',
        element: (
          <AuthGuard>
            <InvitationPage type="calendar" action="decline" />
          </AuthGuard>
        )
      },
      {
        path: '/event-invitation/:eventId/accept/:invitationId',
        element: (
          <AuthGuard>
            <InvitationPage type="event" action="accept" />
          </AuthGuard>
        )
      },
      {
        path: '/event-invitation/:eventId/decline/:invitationId',
        element: (
          <AuthGuard>
            <InvitationPage type="event" action="decline" />
          </AuthGuard>
        )
      },
      {
        path: '*',
        element: <NotFoundPage />
      }
    ]
  }
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};
