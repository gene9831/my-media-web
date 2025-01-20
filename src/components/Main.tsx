import { Container } from '@chakra-ui/react'
import type { PropsWithChildren } from 'react'

type MainProps = PropsWithChildren

export function Main({ children }: MainProps) {
  return (
    <Container
      py="var(--container-spacing)"
      css={{
        '--container-spacing': {
          base: 'spacing.4',
          md: 'spacing.6',
          lg: 'spacing.8',
        },
      }}
    >
      {children}
    </Container>
  )
}
