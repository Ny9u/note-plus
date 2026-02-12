## ADDED Requirements

### Requirement: Root ESLint configuration

系统应在根目录提供 ESLint 基础配置，定义适用于所有工作空间的通用规则。

#### Scenario: TypeScript 文件应用根配置

- **WHEN** 开发者在任意工作空间编辑 `.ts` 或 `.tsx` 文件
- **THEN** ESLint 应用根配置中定义的 TypeScript 规则

#### Scenario: 导入语句排序检查

- **WHEN** 文件包含未排序的 import 语句
- **THEN** ESLint 应报告警告或错误

#### Scenario: 未使用变量检查

- **WHEN** 代码包含未使用的变量或导入
- **THEN** ESLint 应报告错误

### Requirement: Next.js 工作空间 ESLint 配置

系统应为 `apps/web` 工作空间提供 Next.js 特定的 ESLint 配置。

#### Scenario: React Hooks 规则检查

- **WHEN** 开发者在前端工作空间使用 React Hooks
- **THEN** ESLint 应强制执行 Hooks 规则（如依赖数组完整性）

#### Scenario: Next.js 图片优化提示

- **WHEN** 开发者使用 `<img>` 标签而非 `<Image>` 组件
- **THEN** ESLint 应报告警告建议使用 Next.js Image 组件

#### Scenario: 继承根配置

- **WHEN** 前端工作空间的 ESLint 配置被加载
- **THEN** 应自动继承根目录的基础配置

### Requirement: NestJS 工作空间 ESLint 配置

系统应为 `apps/api` 工作空间提供 NestJS 特定的 ESLint 配置。

#### Scenario: 装饰器语法支持

- **WHEN** 开发者在后端代码中使用 TypeScript 装饰器
- **THEN** ESLint 应正确解析装饰器语法不报错

#### Scenario: 异步函数返回类型检查

- **WHEN** 异步函数未显式声明返回类型
- **THEN** ESLint 应报告警告

#### Scenario: 继承根配置

- **WHEN** 后端工作空间的 ESLint 配置被加载
- **THEN** 应自动继承根目录的基础配置

### Requirement: ESLint 忽略文件配置

系统应通过 `.eslintignore` 文件排除不需要检查的文件和目录。

#### Scenario: 构建产物被忽略

- **WHEN** 运行 `pnpm lint` 命令
- **THEN** `.next/`、`dist/`、`node_modules/` 目录应被跳过

#### Scenario: 配置文件被检查

- **WHEN** 运行 lint 检查
- **THEN** `.eslintrc.js`、`tailwind.config.ts` 等配置文件应被检查

### Requirement: 与 Prettier 规则兼容

ESLint 配置不得与 Prettier 格式化规则冲突。

#### Scenario: 分号规则不冲突

- **WHEN** Prettier 配置为不使用分号
- **THEN** ESLint 不应强制要求分号

#### Scenario: 引号规则不冲突

- **WHEN** Prettier 配置为使用单引号
- **THEN** ESLint 不应强制要求双引号

#### Scenario: 行宽规则不冲突

- **WHEN** Prettier 配置行宽为 100
- **THEN** ESLint 不应报告行长度错误

### Requirement: 支持自动修复

ESLint 应支持通过 `--fix` 参数自动修复可修复的问题。

#### Scenario: 运行自动修复命令

- **WHEN** 开发者运行 `pnpm lint --fix`
- **THEN** 可自动修复的问题（如导入排序）应被自动修复

#### Scenario: 不可修复问题仍报告

- **WHEN** 运行自动修复后仍有问题
- **THEN** 应在控制台输出剩余问题列表
