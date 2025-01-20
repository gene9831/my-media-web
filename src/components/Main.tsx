import { Container } from '@chakra-ui/react'
import type { PropsWithChildren } from 'react'

type MainProps = PropsWithChildren

export function Main({ children }: MainProps) {
  return <Container py={{ base: '4', md: '6', lg: '8' }}>{children}</Container>
}
