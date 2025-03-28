import { FlatCompat } from '@eslint/eslintrc';
import reactCompilerPlugin from 'eslint-plugin-react-compiler';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  reactCompilerPlugin.configs.recommended,
];

export default eslintConfig;
