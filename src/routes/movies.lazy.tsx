import { AspectRatio, Card, Grid, Image } from '@chakra-ui/react'
import { createLazyFileRoute } from '@tanstack/react-router'

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
  return (
    <>
      <Grid
        templateColumns="repeat(auto-fill, minmax(160px, 1fr))"
        gap={{ base: '4', md: '6', lg: '8' }}
      >
        {posts.map((post, index) => (
          <Card.Root key={index} rounded="lg" overflow="hidden">
            <Card.Body p="0">
              <AspectRatio ratio={2 / 3}>
                <Image src={post.src} alt={post.name}></Image>
              </AspectRatio>
            </Card.Body>
          </Card.Root>
        ))}
      </Grid>
    </>
  )
}
