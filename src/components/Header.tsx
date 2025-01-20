import { Box, Center, Flex, Heading, Text } from '@chakra-ui/react'
import { Link } from '@tanstack/react-router'
import { ColorModeButton } from './ui/color-mode'

const links = [
  { label: 'Home', to: '/' },
  { label: 'Movies', to: '/movies' },
  { label: 'TV-Shows', to: '/tv-shows' },
]

export function Header() {
  return (
    <>
      <Center
        w="full"
        h="12"
        pos="fixed"
        top="0"
        justifyContent="space-between"
        px="4"
        borderWidth="thin"
        zIndex="sticky"
        bg="bg"
      >
        <Heading asChild size="xl" color="cyan.solid">
          <Link to="/">My Midea</Link>
        </Heading>
        <Flex gap="8">
          {links.map((link) => (
            <Text
              asChild
              key={link.to}
              fontSize="sm"
              fontWeight="medium"
              color="fg.muted"
              _hover={{ color: 'fg' }}
              css={{ '&[data-status="active"]': { color: 'fg' } }}
            >
              <Link to={link.to}>{link.label}</Link>
            </Text>
          ))}
        </Flex>
        <Box>
          <ColorModeButton></ColorModeButton>
        </Box>
      </Center>
      <Box h="12"></Box>
    </>
  )
}
