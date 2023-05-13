import { extendTheme, ThemeConfig } from "@chakra-ui/react";

// LocalStroage를 확인해보면, chakra-ui-color-mode: light가 설정된 것을 확인할 수 있습니다.
// 이를 삭제하면 dark 모드가 활성화됩니다.

const config: ThemeConfig = {
  initialColorMode: "dark",
};

const theme = extendTheme({
  config,
  colors: {
    gray: {
      50: "#f9f9f9",
      100: "#ededed",
      200: "#d3d3d3",
      300: "#b3b3b3",
      400: "#a0a0a0",
      500: "#898989",
      600: "#6c6c6c",
      700: "#202020",
      800: "#121212",
      900: "#111",
    },
  },
});

export default theme;
