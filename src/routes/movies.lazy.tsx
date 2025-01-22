import { AspectRatio, Box, Card, Center, Grid } from '@chakra-ui/react'
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
  const initialValueOfHoverd = { id: '', index: -1, row: -1 }
  const [hoverd, setHoverd] = useState(initialValueOfHoverd)
  // hoverd的卡片延伸方向
  const [extensionDirection, setExtensionDirection] = useState<
    'left' | 'right'
  >('right')
  const [columns, setColumns] = useState(0)

  const calcColumns = (containerElem: HTMLElement, cellElem: HTMLElement) => {
    const containerRect = containerElem.getBoundingClientRect()
    const cellRect = cellElem.getBoundingClientRect()

    const spacing = getComputedStyle(cellElem).getPropertyValue(
      '--container-spacing',
    )
    const fontSize = getComputedStyle(document.documentElement).fontSize

    return Math.ceil(
      containerRect.width /
        (cellRect.width + parseFloat(spacing) * parseFloat(fontSize)),
    )
  }

  const handleMouseEnter = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: string,
    index: number,
  ) => {
    console.log(index)
    const cellElem = event.currentTarget.parentElement
    const containerElem = cellElem?.parentElement

    if (!(cellElem && containerElem)) {
      return
    }

    const columns = calcColumns(containerElem, cellElem)
    setColumns(columns)
    setHoverd({ id, index, row: Math.floor(index / columns) })

    // hover的是当前行的第一个
    if (index % columns === 0) {
      setExtensionDirection('right')
    }
    // hover的是当前行的最后一个
    if ((index + 1) % columns === 0) {
      setExtensionDirection('left')
    }
  }

  const handleMouseLeave = () => {
    setHoverd(initialValueOfHoverd)
  }

  const calcLeftAndRight = (index: number) => {
    // 未hover任何卡片
    if (!hoverd.id) {
      return { left: '0', right: '0' }
    }

    // 非当前行
    const currentRow = Math.floor(index / columns)
    if (currentRow !== hoverd.row) {
      return { left: '0', right: '0' }
    }

    const indexMirror = extensionDirection === 'right' ? index : columns - index
    const hoverdIndexMirror =
      extensionDirection === 'right' ? hoverd.index : columns - hoverd.index

    let result = { left: '0', right: '0' }

    if (indexMirror === hoverdIndexMirror) {
      result = { left: '0', right: 'calc(-100% - var(--container-spacing))' }
    } else if (indexMirror > hoverdIndexMirror) {
      result = {
        left: 'calc(100% + var(--container-spacing))',
        right: 'calc(-100% - var(--container-spacing))',
      }
    }

    if (extensionDirection === 'right') {
      return result
    }

    return { left: result.right, right: result.left }
  }

  return (
    <Grid
      templateColumns="repeat(auto-fill, minmax(160px, 1fr))"
      gap="var(--container-spacing)"
      overflowX="hidden"
      onMouseLeave={handleMouseLeave}
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
            h="full"
            rounded="lg"
            overflow="hidden"
            pos="absolute"
            top="0"
            left={calcLeftAndRight(index).left}
            right={calcLeftAndRight(index).right}
            zIndex="docked"
            transition="all 0.4s"
            onMouseEnter={(event) =>
              handleMouseEnter(event, String(index), index)
            }
          >
            <Card.Body p="0">
              {/* <Image src={post.src} alt={post.name}></Image> */}
              <Center bg="bg.muted" h="full">
                {index}
              </Center>
            </Card.Body>
          </Card.Root>
        </Box>
      ))}
    </Grid>
  )
}
