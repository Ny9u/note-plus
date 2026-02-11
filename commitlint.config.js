module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // 类型枚举
    "type-enum": [
      2,
      "always",
      [
        "feat", // 新功能
        "fix", // 修复bug
        "refactor", // 重构
        "docs", // 文档
        "test", // 测试
        "chore", // 构建/工具
        "perf", // 性能优化
        "ci", // CI配置
        "style", // 代码格式
        "revert", // 回退
      ],
    ],
    // 主题不能为空
    "subject-empty": [2, "never"],
    // 类型不能为空
    "type-empty": [2, "never"],
    // 主题限制小写
    "subject-case": [2, "always", "lower-case"],
    // 主题最大长度
    "subject-max-length": [2, "always", 100],
  },
};
