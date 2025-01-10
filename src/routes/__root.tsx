import { Box, Center } from '@chakra-ui/react'
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
        <Center w="full" h="12" pos="fixed" top="0" bg="gray.muted"></Center>
        <Box h="12"></Box>
        <Outlet />
        <Suspense>
          <TanStackRouterDevtools />
        </Suspense>
      </>
    )
  },
})
