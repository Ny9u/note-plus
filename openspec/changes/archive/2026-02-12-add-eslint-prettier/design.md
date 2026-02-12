## Context

**当前状态**：

- 项目是基于 pnpm workspaces 和 Turborepo 的 monorepo
- 包含 Next.js 15 前端 (`apps/web`) 和 NestJS 10 后端 (`apps/api`)
- 已有 Husky + commitlint 用于 Git commit 规范
- Turborepo 已配置 `lint` 任务但各工作空间尚未实现

**技术约束**：

- 必须使用 pnpm 作为包管理器
- 必须兼容 Turborepo 的缓存机制
- 需要支持 TypeScript 5.3+
- 前端使用 React 18+ 和 Next.js 15
- 后端使用 NestJS 10

**利益相关者**：

- 开发团队：需要一致的代码风格和自动化工具
- CI/CD：需要可靠的 lint 检查

## Goals / Non-Goals

**Goals:**

- 提供统一的代码风格和质量检查标准
- 实现自动化的代码格式化和 lint 检查
- 在 Git pre-commit 阶段强制执行代码规范
- 支持 IDE 实时反馈（VS Code）
- 最小化配置复杂度，遵循业界最佳实践

**Non-Goals:**

- 不修改现有代码的业务逻辑
- 不引入新的构建工具或测试框架
- 不改变现有的 Git 工作流（除了添加 pre-commit 检查）
- 不强制特定的编辑器配置（但提供推荐）

## Decisions

### 1. ESLint 配置策略

**决策**：采用分层配置 (root + workspace overrides)

**理由**：

- 根目录配置通用 TypeScript 规则
- 各工作空间继承根配置并添加特定规则（Next.js、NestJS）
- 避免配置重复，便于维护

**备选方案**：

- ❌ 共享配置包：过度工程化，增加维护成本
- ❌ 单一配置文件：无法针对不同工作空间定制

### 2. ESLint 插件选择

**决策**：使用以下插件

- `@typescript-eslint/eslint-plugin` - TypeScript 支持
- `eslint-plugin-react` + `eslint-plugin-react-hooks` - React 规则
- `eslint-plugin-import` - import 排序和路径检查
- `eslint-config-next` - Next.js 官方配置（前端）
- `@typescript-eslint/eslint-plugin` - NestJS 使用标准 TS 规则（后端）

**理由**：

- 使用官方和社区广泛认可的插件
- Next.js 官方配置已包含大部分最佳实践
- NestJS 不需要特殊插件，标准 TS 规则即可

### 3. Prettier 集成方式

**决策**：使用 `eslint-config-prettier` 禁用 ESLint 的格式化规则

**理由**：

- Prettier 专注格式化，ESLint 专注代码质量
- 避免规则冲突
- 行业标准做法

**备选方案**：

- ❌ `eslint-plugin-prettier`：性能较差，已不推荐
- ❌ 仅使用 ESLint 格式化：Prettier 格式化能力更强

### 4. Git Hooks 实现

**决策**：使用 `lint-staged` + 现有 Husky

**理由**：

- 项目已有 Husky，只需添加 lint-staged
- 只检查 staged 文件，速度快
- 支持自动修复（`--fix`）

**配置**：

- TypeScript/JavaScript 文件：`eslint --fix` + `prettier --write`
- JSON/Markdown 文件：`prettier --write`

### 5. Turborepo 任务配置

**决策**：添加 `lint` 和 `format` 任务，`lint` 不缓存输出

**理由**：

- `lint` 应每次运行以捕获最新问题
- `format` 用于批量格式化，可选执行
- 与现有 `build` 任务保持一致的命名风格

### 6. Prettier 配置选择

**决策**：使用以下配置

```json
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 100,
  "tabWidth": 2,
  "endOfLine": "lf"
}
```

**理由**：

- `semi: false`：现代 JavaScript 趋势，减少视觉噪音
- `singleQuote: true`：与项目现有代码风格一致
- `printWidth: 100`：现代显示器宽度，平衡可读性
- 其他为社区主流配置

## Risks / Trade-offs

### 风险 1：首次 lint 发现大量格式问题

**影响**：可能需要修复数百个文件

**缓解措施**：

- 首次运行使用 `--fix` 自动修复
- 将格式修复作为单独提交，便于回滚
- 在非关键路径上先实施和测试

### 风险 2：开发者本地没有安装 VS Code 扩展

**影响**：无法获得实时反馈

**缓解措施**：

- 在项目 README 中添加 IDE 设置指南
- 在 `.vscode/extensions.json` 中推荐扩展
- Git hooks 作为最后一道防线

### 风险 3：Lint 检查降低开发速度

**影响**：pre-commit 钩子可能需要数秒执行

**缓解措施**：

- 使用 `lint-staged` 只检查变更文件
- 允许 `--no-verify` 跳过检查（特殊情况）
- Turborepo 缓存机制减少重复检查

### Trade-off 1：配置复杂度 vs 灵活性

**选择**：中等复杂度配置（分层但不过度工程化）

**权衡**：

- 牺牲了一些灵活性（如动态规则）
- 获得了可维护性和清晰度

### Trade-off 2：严格度 vs 开发体验

**选择**：使用 `warn` 而非 `error` 对于非关键规则

**权衡**：

- 不会阻断开发流程
- 仍然提供警告信息
- 关键问题（如安全问题）使用 `error`

## Migration Plan

### 阶段 1：安装依赖和配置文件（无影响）

```bash
# 根目录
pnpm add -D eslint prettier @typescript-eslint/parser @typescript-eslint/eslint-plugin \
  eslint-config-prettier eslint-plugin-import lint-staged

# 前端工作空间
pnpm add -D eslint-config-next eslint-plugin-react eslint-plugin-react-hooks --filter web

# 后端工作空间
pnpm add -D @typescript-eslint/eslint-plugin --filter api
```

- 创建所有配置文件
- 更新 `package.json` 脚本
- 更新 `turbo.json`

### 阶段 2：首次批量格式化（一次性提交）

```bash
pnpm format  # 格式化所有文件
git add .
git commit -m "chore: 初始化代码格式化（ESLint + Prettier）"
```

### 阶段 3：启用 Git Hooks

```bash
# 配置 lint-staged
# 更新 .husky/pre-commit
```

### 阶段 4：文档和团队沟通

- 更新 `CLAUDE.md` 添加 lint 和 format 相关说明
- 在 README 中添加 IDE 设置指南
- 创建 `.vscode/extensions.json` 推荐扩展

### Rollback 策略

如果出现严重问题：

1. **禁用 Git Hooks**：删除 `.husky/pre-commit` 中的 lint-staged
2. **保留配置**：保留 ESLint 和 Prettier 配置，但不强制执行
3. **逐步启用**：先在特定工作空间启用，验证后再全局启用

## Open Questions

1. ~~是否需要为 JSON/YAML 配置文件也添加 lint 检查？~~
   - 决定：仅使用 Prettier 格式化，不添加额外 lint

2. ~~是否需要配置 `.editorconfig` 文件？~~
   - 决定：不需要，Prettier 已足够

3. **待定**：是否需要在 CI 中添加 lint 检查步骤？
   - 建议：在后续 CI 配置中添加
