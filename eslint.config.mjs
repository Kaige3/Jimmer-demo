import { defineConfig } from 'eslint';

export default defineConfig({
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'vue/multi-word-component-names': 'off',
    'prettier/prettier': [
      'warn',
      {
        endOfLine: 'auto',
      },
    ],
  },
  overrides: [
    {
      files: ['src/**/*.{ts,tsx,js,jsx,vue}'], // 修改为匹配 src 目录中的文件
      rules: {
        // 在这里可以为这些文件类型指定特定的规则
      },
    },
  ],
});
