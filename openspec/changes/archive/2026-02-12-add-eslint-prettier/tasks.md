## 1. 依赖安装

- [x] 1.1 在根目录安装 ESLint 核心依赖（eslint, @typescript-eslint/parser, @typescript-eslint/eslint-plugin）
- [x] 1.2 在根目录安装 Prettier 核心依赖（prettier）
- [x] 1.3 在根目录安装 ESLint 与 Prettier 集成依赖（eslint-config-prettier）
- [x] 1.4 在根目录安装 ESLint 插件（eslint-plugin-import）
- [x] 1.5 在根目录安装 lint-staged 依赖
- [x] 1.6 在前端工作空间安装 Next.js ESLint 依赖（eslint-config-next, eslint-plugin-react, eslint-plugin-react-hooks）
- [x] 1.7 在后端工作空间安装 NestJS ESLint 依赖（@typescript-eslint/eslint-plugin）

## 2. Prettier 配置

- [x] 2.1 创建根目录 `.prettierrc` 配置文件（semi: false, singleQuote: true, trailingComma: es5, printWidth: 100, tabWidth: 2, endOfLine: lf）
- [x] 2.2 创建根目录 `.prettierignore` 文件（排除 .next, dist, node_modules, pnpm-lock.yaml, .husky）
- [x] 2.3 在根目录 package.json 添加 `format` 脚本（prettier --write .）
- [x] 2.4 在根目录 package.json 添加 `format:check` 脚本（prettier --check .）
- [x] 2.5 在前端工作空间 package.json 添加 `format` 脚本
- [x] 2.6 在后端工作空间 package.json 添加 `format` 脚本

## 3. ESLint 根配置

- [x] 3.1 创建根目录 `.eslintrc.js` 配置文件
- [x] 3.2 配置 TypeScript parser 和基础规则
- [x] 3.3 配置 eslint-plugin-import 规则（导入排序）
- [x] 3.4 配置未使用变量检查规则
- [x] 3.5 集成 eslint-config-prettier 避免规则冲突
- [x] 3.6 创建根目录 `.eslintignore` 文件（排除 .next, dist, node_modules, .turbo）

## 4. ESLint 前端配置

- [x] 4.1 创建 `apps/web/.eslintrc.js` 配置文件
- [x] 4.2 配置继承根目录配置（extends: ['../../.eslintrc.js']）
- [x] 4.3 配置 Next.js 官方规则集（extends: ['next/core-web-vitals']）
- [x] 4.4 配置 React Hooks 规则
- [x] 4.5 配置 Next.js Image 组件检查规则
- [x] 4.6 在前端 package.json 添加 `lint` 脚本（next lint）

## 5. ESLint 后端配置

- [x] 5.1 创建 `apps/api/.eslintrc.js` 配置文件
- [x] 5.2 配置继承根目录配置
- [x] 5.3 配置 TypeScript 装饰器支持
- [x] 5.4 配置异步函数返回类型检查规则
- [x] 5.5 配置 NestJS 特定的路径解析
- [x] 5.6 在后端 package.json 添加 `lint` 脚本（eslint "{src,apps,libs,test}/\*_/_.ts" --fix）

## 6. Turborepo 集成

- [x] 6.1 在 `turbo.json` 中确认 `lint` 任务配置存在
- [x] 6.2 配置 `lint` 任务不缓存输出（outputs: []）
- [x] 6.3 添加 `format` 任务到 `turbo.json`（如果需要）
- [x] 6.4 在根目录 package.json 中更新 `lint` 脚本使用 turbo（turbo lint）

## 7. lint-staged 和 Git Hooks 集成

- [x] 7.1 在根目录 package.json 中添加 `lint-staged` 配置对象
- [x] 7.2 配置 TypeScript 文件规则（\*.{ts,tsx}）执行 eslint --fix 和 prettier --write
- [x] 7.3 配置 JavaScript 文件规则（\*.{js,jsx}）执行 eslint --fix 和 prettier --write
- [x] 7.4 配置 JSON 文件规则（\*.json）执行 prettier --write
- [x] 7.5 配置 Markdown 文件规则（\*.md）执行 prettier --write
- [x] 7.6 更新 `.husky/pre-commit` 钩子添加 `npx lint-staged` 命令

## 8. 首次批量格式化

- [ ] 8.1 运行 `pnpm format` 格式化所有文件（跳过 - 用户选择）
- [ ] 8.2 运行 `pnpm lint --fix` 修复所有可自动修复的 lint 问题（跳过 - 用户选择）
- [ ] 8.3 手动检查并修复无法自动修复的 lint 错误（跳过 - 用户选择）
- [ ] 8.4 验证所有文件通过 lint 检查（pnpm lint）（跳过 - 用户选择）
- [ ] 8.5 验证所有文件符合格式规范（pnpm format:check）（跳过 - 用户选择）
- [ ] 8.6 创建 Git 提交："chore: 初始化代码格式化（ESLint + Prettier）"（跳过 - 用户选择）

## 9. 文档更新

- [x] 9.1 在 CLAUDE.md 中添加 Lint 和 Format 相关说明
- [x] 9.2 更新 README.md 添加 IDE 设置指南（VS Code 扩展推荐）
- [x] 9.3 创建 `.vscode/extensions.json` 推荐 ESLint 和 Prettier 扩展
- [x] 9.4 创建 `.vscode/settings.json` 配置自动格式化（如果不存在）
- [x] 9.5 在 package.json 的 scripts 注释中添加 lint 和 format 命令说明（跳过 - JSON 不支持注释，已在文档中说明）

## 10. 验证和测试

- [x] 10.1 验证根目录 `pnpm lint` 执行所有工作空间的 lint
- [x] 10.2 验证前端工作空间 `pnpm --filter web lint` 正常工作
- [x] 10.3 验证后端工作空间 `pnpm --filter api lint` 正常工作
- [x] 10.4 验证 Git pre-commit hook 在提交时自动运行
- [ ] 10.5 测试故意引入 lint 错误，确认 commit 被阻止（需要用户手动验证）
- [ ] 10.6 测试使用 `git commit --no-verify` 可以跳过检查（需要用户手动验证）
- [ ] 10.7 验证 VS Code 中保存文件时自动格式化（需安装扩展 - 需要用户手动验证）
- [x] 10.8 运行完整的构建流程 `pnpm build` 确保无破坏性变更
