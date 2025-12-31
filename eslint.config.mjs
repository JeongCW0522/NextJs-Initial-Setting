import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';

import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

import reactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';

const eslintConfig = defineConfig([
  // ✅ Next.js 기본 권장 설정
  ...nextVitals,
  ...nextTs,

  // ✅ 우리가 추가한 규칙 세트
  {
    plugins: {
      'react-hooks': reactHooks,
      prettier,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node, // Next.js 서버 환경 대응
      },
    },

    rules: {
      // React Hooks 필수 규칙
      ...reactHooks.configs['recommended-latest'].rules,

      // Prettier 기준을 ESLint 에러로 표시
      'prettier/prettier': ['error'],

      // React 17+ / Next.js App Router 기준
      'react/react-in-jsx-scope': 'off',

      // App Router 실사용 기준에서 자주 끄는 규칙
      '@next/next/no-img-element': 'off',
      '@next/next/no-html-link-for-pages': 'off',
    },
  },

  // ✅ eslint-config-next 기본 ignore + 확장
  globalIgnores(['.next/**', 'out/**', 'build/**', 'dist/**', 'node_modules/**', 'next-env.d.ts']),

  // ✅ ESLint 포맷 규칙 전부 OFF (Prettier와 충돌 방지)
  eslintConfigPrettier,
]);

export default eslintConfig;
