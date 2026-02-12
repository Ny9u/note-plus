## ADDED Requirements

### Requirement: Git pre-commit hook 集成

系统应在 Git pre-commit 阶段自动执行 lint 检查和代码格式化。

#### Scenario: 提交时自动检查 staged 文件

- **WHEN** 开发者执行 `git commit`
- **THEN** 只有 staged 的文件应被 lint 检查和格式化

#### Scenario: Lint 失败阻止提交

- **WHEN** staged 文件存在 ESLint 错误且自动修复失败
- **THEN** Git commit 应被中止，并输出错误信息

#### Scenario: 自动修复成功后提交

- **WHEN** staged 文件存在可自动修复的问题
- **THEN** 问题应被自动修复，修复后的文件应包含在提交中

#### Scenario: 跳过 pre-commit 检查

- **WHEN** 开发者使用 `git commit --no-verify`
- **THEN** pre-commit hook 应被跳过（紧急情况使用）

### Requirement: lint-staged 配置

系统应使用 lint-staged 只对 staged 文件执行检查，提高性能。

#### Scenario: TypeScript 文件执行 ESLint 和 Prettier

- **WHEN** staged 文件包含 `.ts` 或 `.tsx` 文件
- **THEN** 应依次执行 `eslint --fix` 和 `prettier --write`

#### Scenario: JavaScript 文件执行 ESLint 和 Prettier

- **WHEN** staged 文件包含 `.js` 或 `.jsx` 文件
- **THEN** 应依次执行 `eslint --fix` 和 `prettier --write`

#### Scenario: JSON 文件只执行 Prettier

- **WHEN** staged 文件包含 `.json` 文件
- **THEN** 只应执行 `prettier --write`

#### Scenario: Markdown 文件只执行 Prettier

- **WHEN** staged 文件包含 `.md` 文件
- **THEN** 只应执行 `prettier --write`

#### Scenario: 忽略非源码文件

- **WHEN** staged 文件包含图片、字体等二进制文件
- **THEN** 这些文件应被跳过

### Requirement: Turborepo lint 任务

系统应在 Turborepo 中配置 `lint` 任务，支持跨工作空间的 lint 检查。

#### Scenario: 根目录运行所有工作空间 lint

- **WHEN** 开发者在根目录运行 `pnpm lint`
- **THEN** 所有工作空间的 lint 任务应并行执行

#### Scenario: 特定工作空间运行 lint

- **WHEN** 开发者运行 `pnpm --filter web lint`
- **THEN** 只有前端工作空间的 lint 应被执行

#### Scenario: Lint 任务不缓存

- **WHEN** 连续两次运行 `pnpm lint`
- **THEN** 每次都应重新执行检查（不使用 Turborepo 缓存）

#### Scenario: Lint 失败返回非零退出码

- **WHEN** 任意工作空间的 lint 检查失败
- **THEN** 命令应返回非零退出码，便于 CI 集成

### Requirement: 工作空间 package.json 脚本

每个工作空间应在 `package.json` 中定义 lint 相关脚本。

#### Scenario: 前端工作空间 lint 脚本

- **WHEN** 开发者在 `apps/web` 目录运行 `pnpm lint`
- **THEN** 应执行 `next lint` 命令

#### Scenario: 后端工作空间 lint 脚本

- **WHEN** 开发者在 `apps/api` 目录运行 `pnpm lint`
- **THEN** 应执行 `eslint "{src,apps,libs,test}/**/*.ts" --fix`

#### Scenario: 前端工作空间 format 脚本

- **WHEN** 开发者在 `apps/web` 目录运行 `pnpm format`
- **THEN** 应执行 Prettier 格式化所有支持的文件

#### Scenario: 后端工作空间 format 脚本

- **WHEN** 开发者在 `apps/api` 目录运行 `pnpm format`
- **THEN** 应执行 Prettier 格式化所有支持的文件

### Requirement: 根目录统一脚本

根目录应提供统一的 lint 和 format 脚本便于批量操作。

#### Scenario: 根目录全局 lint

- **WHEN** 开发者在根目录运行 `pnpm lint`
- **THEN** 应通过 Turborepo 执行所有工作空间的 lint

#### Scenario: 根目录全局 format

- **WHEN** 开发者在根目录运行 `pnpm format`
- **THEN** 应格式化根目录和所有工作空间的文件

#### Scenario: 根目录检查格式

- **WHEN** 开发者在根目录运行 `pnpm format:check`
- **THEN** 应检查所有文件是否符合格式规范但不修改

### Requirement: CI 集成支持

Lint 任务应设计为可在 CI 环境中运行。

#### Scenario: CI 中运行 lint 检查

- **WHEN** CI 流水线执行 `pnpm lint`
- **THEN** 所有 lint 错误应导致 CI 失败

#### Scenario: CI 中检查代码格式

- **WHEN** CI 流水线执行 `pnpm format:check`
- **THEN** 任何未格式化的文件应导致 CI 失败

#### Scenario: CI 中不修改代码

- **WHEN** 在 CI 环境运行 lint 任务
- **THEN** 不应使用 `--fix` 参数，只应检查和报告问题

### Requirement: 性能优化

Lint 自动化应优化执行速度，不显著降低开发体验。

#### Scenario: 只检查变更文件

- **WHEN** 使用 lint-staged 在 pre-commit hook 中
- **THEN** 只有 staged 文件被检查，而非整个代码库

#### Scenario: 并行执行多工作空间

- **WHEN** 在根目录运行 `pnpm lint`
- **THEN** Turborepo 应并行执行各工作空间的 lint 任务

#### Scenario: 增量 lint 支持

- **WHEN** Next.js 工作空间运行 `next lint`
- **THEN** 应支持增量 lint（只检查变更文件）
