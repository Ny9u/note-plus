## ADDED Requirements

### Requirement: 统一代码格式化规则

系统应在根目录提供 Prettier 配置文件，定义统一的代码格式化标准。

#### Scenario: 使用单引号

- **WHEN** Prettier 格式化 JavaScript/TypeScript 代码
- **THEN** 字符串应使用单引号而非双引号（除非字符串包含单引号）

#### Scenario: 不使用分号

- **WHEN** Prettier 格式化 JavaScript/TypeScript 代码
- **THEN** 语句结尾不应添加分号（除非必要）

#### Scenario: 行宽限制为 100

- **WHEN** Prettier 格式化代码
- **THEN** 应尽量将行宽控制在 100 字符以内

#### Scenario: 使用 2 空格缩进

- **WHEN** Prettier 格式化任何文件
- **THEN** 应使用 2 个空格作为缩进

#### Scenario: 使用 ES5 风格尾逗号

- **WHEN** Prettier 格式化对象或数组
- **THEN** 多行结构的最后一个元素应添加尾逗号（ES5 兼容）

#### Scenario: 使用 LF 行尾符

- **WHEN** Prettier 格式化文件
- **THEN** 应统一使用 LF (`\n`) 作为行尾符

### Requirement: 支持多种文件类型

Prettier 应能够格式化项目中使用的所有文件类型。

#### Scenario: 格式化 TypeScript 文件

- **WHEN** 运行 `prettier --write` 对 `.ts` 或 `.tsx` 文件
- **THEN** 文件应按配置规则被格式化

#### Scenario: 格式化 JavaScript 文件

- **WHEN** 运行 `prettier --write` 对 `.js` 或 `.jsx` 文件
- **THEN** 文件应按配置规则被格式化

#### Scenario: 格式化 JSON 文件

- **WHEN** 运行 `prettier --write` 对 `.json` 文件
- **THEN** JSON 应被格式化为可读格式（带缩进）

#### Scenario: 格式化 Markdown 文件

- **WHEN** 运行 `prettier --write` 对 `.md` 文件
- **THEN** Markdown 格式应被规范化

#### Scenario: 格式化 CSS/SCSS 文件

- **WHEN** 运行 `prettier --write` 对 `.css` 或 `.scss` 文件
- **THEN** 样式代码应按配置规则被格式化

### Requirement: Prettier 忽略文件配置

系统应通过 `.prettierignore` 文件排除不需要格式化的文件和目录。

#### Scenario: 构建产物被忽略

- **WHEN** 运行 `prettier --write` 命令
- **THEN** `.next/`、`dist/`、`node_modules/` 目录应被跳过

#### Scenario: 生成文件被忽略

- **WHEN** 运行格式化命令
- **THEN** `pnpm-lock.yaml` 等自动生成的文件应被跳过

#### Scenario: 特定配置文件被忽略

- **WHEN** 运行格式化命令
- **THEN** `.husky/` 目录下的脚本文件应被跳过（可能包含特定格式）

### Requirement: 命令行工具可用

系统应提供便捷的 npm scripts 用于运行 Prettier。

#### Scenario: 检查格式化状态

- **WHEN** 开发者运行 `pnpm format:check`
- **THEN** 应输出哪些文件未按规则格式化，但不修改文件

#### Scenario: 执行批量格式化

- **WHEN** 开发者运行 `pnpm format` 或 `pnpm format:write`
- **THEN** 所有支持的文件应被自动格式化

#### Scenario: 格式化特定文件

- **WHEN** 开发者运行 `prettier --write <file-path>`
- **THEN** 只有指定文件应被格式化

### Requirement: 与编辑器集成

Prettier 配置应能被主流编辑器识别和使用。

#### Scenario: VS Code 自动格式化

- **WHEN** 开发者在 VS Code 中保存文件且启用了 Prettier 扩展
- **THEN** 文件应按项目配置自动格式化

#### Scenario: 格式化快捷键

- **WHEN** 开发者在 VS Code 中使用 "Format Document" 命令
- **THEN** Prettier 应作为默认格式化工具并应用项目配置
