# Note Plus

基于 AI 的知识库应用系统 - Monorepo 基础架构

## 项目结构

```
note-plus/
├── apps/
│   ├── web/                # Next.js 15 前端 (App Router + Tailwind + shadcn/ui)
│   └── api/                # NestJS 后端
├── packages/
│   ├── shared-types/       # 共享类型定义
│   └── shared-utils/       # 共享工具函数
├── pnpm-workspace.yaml     # pnpm workspace 配置
├── turbo.json              # Turbo 构建配置
└── tsconfig.base.json      # 基础 TypeScript 配置
```

## 技术栈

- **包管理**: pnpm workspace
- **构建工具**: Turborepo
- **前端**: Next.js 15 (App Router) + Tailwind CSS 3 + shadcn/ui
- **后端**: NestJS 10
- **语言**: TypeScript

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 开发模式

**同时启动前后端**:

```bash
pnpm dev
```

**或分别启动**:

```bash
# 启动前端 (http://localhost:3000)
pnpm dev:web

# 启动后端 (http://localhost:3001)
pnpm dev:api
```

### 构建

```bash
pnpm build
```

### 验证运行

- 前端: http://localhost:3000
- 后端健康检查: http://localhost:3001/api/health

## 当前状态

✅ Monorepo 基础架构已完成
✅ Next.js 前端可运行（Tailwind CSS + shadcn/ui）
✅ NestJS 后端可运行（健康检查端点）
✅ 共享 packages 目录结构已创建

⏳ 业务功能待实现

## 端口配置

- 前端 (Next.js): 3000
- 后端 (NestJS): 3001

## 开发指南

### Git 提交规范

本项目使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范，提交时会自动校验。

**格式**: `<type>: <subject>`

**类型**: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `ci`

**示例**:
```bash
git commit -m "feat: 添加用户登录功能"
git commit -m "fix: 修复 PDF 预览问题"
```

详细说明请查看 [COMMIT_CONVENTION.md](./COMMIT_CONVENTION.md)

### 添加新的共享包

1. 在 `packages/` 目录创建新目录
2. 添加 `package.json` 和 `tsconfig.json`
3. 在 `pnpm-workspace.yaml` 中自动识别

### 工作区命令

```bash
# 在特定工作区运行命令
pnpm --filter web <command>
pnpm --filter api <command>

# 清理所有构建产物
pnpm clean
```

## License

MIT
