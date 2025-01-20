import { AspectRatio, Box, Card, Grid, Image } from '@chakra-ui/react'
import { createLazyFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createLazyFileRoute('/movies')({
  component: Movies,
})

const templatePosts = [
  {
    src: 'https://image.tmdb.org/t/p/w440_and_h660_face/x6cLNyJWKK7jdaqL9UNPlvJJoVD.jpg',
    name: '肖申克的救赎',
  },
  {
    src: 'https://image.tmdb.org/t/p/w1280/y03tzUKvkRCYwJ5NWys4W4bnS9m.jpg',
    name: '教父',
  },
  {
    src: 'https://image.tmdb.org/t/p/w1280/4J8jUmjgKPggRPJqqdkjWCj2k0D.jpg',
    name: '教父2',
  },
]

const posts = Array(5).fill(templatePosts).flat()

function Movies() {
  const [hoverd, setHoverd] = useState('')

  const calcLeft = (id: string) => {
    if (!hoverd || hoverd === id) {
      return '0'
    }

    return 'calc(100% + var(--container-spacing))'
  }

  return (
    <Grid
      templateColumns="repeat(auto-fill, minmax(160px, 1fr))"
      gap="var(--container-spacing)"
      overflowX="hidden"
    >
      {posts.map((post, index) => (
        <Box key={index} pos="relative" className="group">
          <AspectRatio
            borderWidth="1px"
            borderColor="transparent"
            ratio={2 / 3}
          >
            <Box></Box>
          </AspectRatio>
          <Card.Root
            w="full"
            h="full"
            rounded="lg"
            overflow="hidden"
            pos="absolute"
            top="0"
            left={calcLeft(String(index))}
            transition="all 0.4s"
            zIndex="docked"
            _groupHover={{
              w: 'calc(200% + var(--container-spacing))',
            }}
            onMouseEnter={() => setHoverd(String(index))}
            onMouseLeave={() => setHoverd('')}
          >
            <Card.Body p="0">
              <AspectRatio ratio={2 / 3}>
                <Image src={post.src} alt={post.name}></Image>
              </AspectRatio>
            </Card.Body>
          </Card.Root>
        </Box>
      ))}
    </Grid>
  )
}
