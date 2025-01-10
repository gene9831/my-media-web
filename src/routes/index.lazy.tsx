import { Button } from '@/components/ui/button'
import { Box, HStack, Link } from '@chakra-ui/react'
import { createLazyFileRoute, Link as RouterLink } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <HStack>
      <Button>Click me</Button>
      <Button>Click me</Button>
      <Link
        href={`iina://open?url=http%3A%2F%2Fomv.lan%3A5244%2Fd%2FMovies%2FAlien%2520(1979)%2520DC%2520(1080p%2520BluRay%2520x265%2520HEVC%252010bit%2520HDR%2520AAC%25205.1%2520afm72)%2FAlien%2520(1979)%2520DC%2520(1080p%2520BluRay%2520x265%2520HDR%2520afm72).mkv&mpv_start=01:10:00`}
      >
        Go
      </Link>
      <Box h="64" w="40" bg="red.solid" borderWidth="thin"></Box>
      <RouterLink to="/about">About</RouterLink>
    </HStack>
  )
}
