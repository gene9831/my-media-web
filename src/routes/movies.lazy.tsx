import { movies } from '@/mock/movies'
import {
  AspectRatio,
  Box,
  Card,
  Flex,
  Grid,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react'
import { createLazyFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { LuDot } from 'react-icons/lu'

export const Route = createLazyFileRoute('/movies')({
  component: Movies,
})

const POST_URL = 'https://image.tmdb.org/t/p/w342'
const BACKDROP_URL = 'https://image.tmdb.org/t/p/w500'
const item = Array<typeof movies>(5).fill(movies).flat()

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
      {item.map((item, index) => (
        <Box key={index} pos="relative">
          <AspectRatio
            borderWidth="1px"
            borderColor="transparent"
            ratio={2 / 3}
          >
            <Box></Box>
          </AspectRatio>
          <Card.Root
            rounded="lg"
            overflow="hidden"
            pos="absolute"
            top="0"
            bottom="0"
            left={calcLeftAndRight(index).left}
            right={calcLeftAndRight(index).right}
            zIndex="docked"
            transition="all 0.4s"
            onMouseEnter={(event) =>
              handleMouseEnter(event, String(index), index)
            }
          >
            <Card.Body
              pos="relative"
              backgroundImage={`linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),url(${BACKDROP_URL}${item.backdrop_path})`}
              backgroundSize="cover"
              backgroundPosition="center"
            >
              <Image
                src={`${POST_URL}${item.poster_path}`}
                w="full"
                pos="absolute"
                top="0"
                left="0"
                opacity={hoverd.id === String(index) ? '0' : '1'}
                transition="all 0.4s"
              ></Image>
              <Stack
                p="6"
                w="full"
                h="full"
                pos="absolute"
                top="0"
                left="0"
                opacity={hoverd.id === String(index) ? '1' : '0'}
                transition="all 0.4s"
              >
                <Box flex="1"></Box>
                <Text
                  fontSize="lg"
                  fontWeight="bold"
                  color="white"
                  textShadow="1px 1px 2px black"
                  textWrap="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  title={item.title}
                >
                  {item.title}
                </Text>
                <Flex color="white" alignItems="center">
                  <Text textShadow="1px 1px 2px black">
                    {item.release_date.split('-')[0]}
                  </Text>
                  <LuDot />
                  <Text textShadow="1px 1px 2px black">
                    {Math.floor(item.runtime / 60)}h {item.runtime % 60}m
                  </Text>
                </Flex>
              </Stack>
            </Card.Body>
          </Card.Root>
        </Box>
      ))}
    </Grid>
  )
}
