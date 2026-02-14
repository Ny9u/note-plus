## Why

项目当前缺少统一的代码风格和质量检查工具。作为一个包含 Next.js 15 前端和 NestJS 10 后端的 monorepo 项目，需要确保跨多个工作空间的代码一致性和质量。ESLint 提供代码质量检查和最佳实践规范，Prettier 提供自动化的代码格式化，两者结合可以减少代码审查中的格式争议，提高代码可维护性。

## What Changes

- 在根目录和各工作空间添加 ESLint 配置，支持 TypeScript、React、Next.js 和 NestJS
- 添加 Prettier 配置，统一代码格式化规则
- 配置 ESLint 和 Prettier 的集成，避免规则冲突
- 添加 Git pre-commit hooks，在提交前自动运行 lint 检查和格式化
- 在 Turborepo 中添加 `lint` 和 `format` 任务
- 为根目录和各工作空间添加相应的 npm scripts
- 添加 `.eslintignore` 和 `.prettierignore` 文件排除构建产物和依赖目录

## Capabilities

### New Capabilities

- `eslint-config`: ESLint 配置和规则集，包括 TypeScript、React、Next.js 和 NestJS 的最佳实践
- `prettier-config`: Prettier 代码格式化配置，定义统一的格式规范
- `lint-automation`: 自动化 lint 检查和格式化，通过 Git hooks 和 Turborepo 任务实现

### Modified Capabilities

<!-- 无现有能力需要修改 -->

## Impact

**受影响的代码**：

- 所有 TypeScript/JavaScript 源文件（`.ts`, `.tsx`, `.js`, `.jsx`）
- 配置文件将被格式化

**受影响的配置**：

- 根目录 `package.json` - 添加 ESLint 和 Prettier 相关依赖和脚本
- `apps/web/package.json` - 添加前端特定的 lint 配置
- `apps/api/package.json` - 添加后端特定的 lint 配置
- `turbo.json` - 添加 `lint` 和 `format` 任务
- `.husky/pre-commit` - 可能需要添加 lint-staged 钩子

**新增文件**：

- `.eslintrc.js` (根目录)
- `apps/web/.eslintrc.js`
- `apps/api/.eslintrc.js`
- `.prettierrc`
- `.prettierignore`
- `.eslintignore`

**开发体验**：

- 开发者需要安装 VS Code ESLint 和 Prettier 扩展以获得实时反馈
- 首次运行 lint 可能会发现现有代码的格式问题，需要批量修复
