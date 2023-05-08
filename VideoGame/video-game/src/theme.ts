import { extendTheme, ThemeConfig } from "@chakra-ui/react";

// LocalStroage를 확인해보면, chakra-ui-color-mode: light가 설정된 것을 확인할 수 있습니다.
// 이를 삭제하면 dark 모드가 활성화됩니다.

const config: ThemeConfig = {
  initialColorMode: "dark",
};

const theme = extendTheme({ config });

export default theme;
