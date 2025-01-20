import { Header } from '@/components/Header'
import { Main } from '@/components/Main'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import React, { Suspense } from 'react'

const TanStackRouterDevtools =
  process.env.NODE_ENV === 'production'
    ? () => null // Render nothing in production
    : React.lazy(() =>
        // Lazy load in development
        import('@tanstack/router-devtools').then((mod) => ({
          default: mod.TanStackRouterDevtools,
        })),
      )

export const Route = createRootRoute({
  component: () => {
    return (
      <>
        <Header></Header>
        <Main>
          <Outlet />
        </Main>
        <Suspense>
          <TanStackRouterDevtools />
        </Suspense>
      </>
    )
  },
})
