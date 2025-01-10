import {
  createSystem,
  defaultConfig,
  defineConfig,
  defineTokens,
  mergeConfigs,
} from '@chakra-ui/react'

const config = mergeConfigs(
  defaultConfig,
  defineConfig({
    theme: {
      tokens: defineTokens({
        borderWidths: {
          thin: { value: '1px' },
          thick: { value: '2px' },
          medium: { value: '1.5px' },
        },
      }),
    },
  }),
)

export default createSystem(config)
