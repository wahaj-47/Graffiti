import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: [
    "../app/stories/**/*.mdx",
    "../app/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  core: {
    builder: {
      name: "@storybook/builder-vite",
      options: {
        viteConfigPath: "vite-sb.config.ts",
      },
    },
  },
};
export default config;
