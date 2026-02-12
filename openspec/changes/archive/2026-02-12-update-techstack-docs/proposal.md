## Why

项目文档中存在技术栈描述不一致的问题。`openspec/project.md` 中明确声明使用 Less 作为 CSS 预处理器(ADR-001),但实际项目已经采用 **Tailwind CSS + shadcn/ui** 作为样式解决方案。此外,多个文档对前端架构、开发工具和部署方式的描述存在冲突或过时信息,这会误导新加入的开发者和 Claude Code 助手,降低开发效率。

## What Changes

- 更新 `openspec/project.md` 中前端技术栈描述,纠正 CSS 方案为 Tailwind CSS + shadcn/ui
- 移除或标记为"已废弃"的 ADR-001(Less 相关决策)
- 更新 `docs/技术方案.md` 中的前端技术栈描述,补充 shadcn/ui、Tailwind CSS 等实际使用的工具
- 更新 `docs/产品文档.md` 中的技术选型部分,确保与实际技术栈一致
- 更新 `CLAUDE.md` 中的关键技术决策说明(如有需要)
- 更新 `README.md` 中的关键技术说明(如有需要)
- 统一所有文档中对依赖版本、开发工具、UI 组件库的描述

## Capabilities

### New Capabilities

无新增能力(本次为文档修正)

### Modified Capabilities

无修改能力(本次为文档修正)

## Impact

**受影响的文件:**

- `openspec/project.md` - 需要大量修改(前端技术栈、ADR-001 等)
- `docs/技术方案.md` - 需要补充和纠正前端技术栈描述
- `docs/产品文档.md` - 需要更新技术选型表格
- `CLAUDE.md` - 可能需要微调关键架构决策说明
- `README.md` - 可能需要更新关键技术说明(如 Tailwind CSS、shadcn/ui 等)

**不影响:**

- 任何源代码(纯文档更新)
- 任何依赖配置
- 任何构建流程

**好处:**

- 文档与实际代码库保持一致
- 减少新开发者的困惑
- Claude Code 助手能获得准确的技术栈信息
- 便于后续技术决策的追溯和理解
