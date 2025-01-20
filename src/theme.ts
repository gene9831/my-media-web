import {
  createSystem,
  defaultConfig,
  defineSemanticTokens,
  defineTokens,
  mergeConfigs,
} from '@chakra-ui/react'

const tokens = defineTokens({
  colors: {
    primary: {
      50: { value: '#e7f5ff' },
      100: { value: '#d0ebff' },
      200: { value: '#a5d8ff' },
      300: { value: '#74c0fc' },
      400: { value: '#4dabf7' },
      500: { value: '#339af0' },
      600: { value: '#228be6' },
      700: { value: '#1c7ed6' },
      800: { value: '#1971c2' },
      900: { value: '#1864ab' },
    },
  },
})

const semanticTokens = defineSemanticTokens({
  colors: {
    primary: {
      contrast: { value: { base: 'white', _dark: 'white' } },
      fg: {
        value: { base: '{colors.primary.700}', _dark: '{colors.primary.300}' },
      },
      subtle: {
        value: { base: '{colors.primary.100}', _dark: '{colors.primary.900}' },
      },
      muted: {
        value: { base: '{colors.primary.200}', _dark: '{colors.primary.800}' },
      },
      emphasized: {
        value: { base: '{colors.primary.300}', _dark: '{colors.primary.700}' },
      },
      solid: {
        value: { base: '{colors.primary.600}', _dark: '{colors.primary.600}' },
      },
      focusRing: {
        value: { base: '{colors.primary.600}', _dark: '{colors.primary.600}' },
      },
    },
  },
})

const config = mergeConfigs(defaultConfig, {
  theme: { tokens, semanticTokens },
})

export const system = createSystem(config)
