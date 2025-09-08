# 🤖 AI-Generated Documentation Naming Convention

This document establishes naming conventions and organization standards for AI-generated documentation in the Lab1-TodoApp project.

## 📋 Purpose

To maintain consistency and organization of AI-generated content including:

- Development summaries
- Implementation fixes
- Troubleshooting guides
- Feature enhancement documentation

## 📁 Folder Structure

```
docs/ai-generated/
├── summaries/          # Implementation summaries and completion reports
├── fixes/             # Bug fixes and troubleshooting guides
└── prompts/           # AI prompts used for development assistance
```

## 🏷️ Naming Conventions

### Summary Documents

**Format:** `YYYYMMDD_FEATURE_SUMMARY.md`

**Examples:**

- `20250908_AUTHENTICATION_IMPLEMENTATION_SUMMARY.md`
- `20250908_API_REFACTORING_SUMMARY.md`
- `20250908_UI_IMPROVEMENTS_SUMMARY.md`
- `20250908_DATABASE_MIGRATION_SUMMARY.md`

**Structure:**

```markdown
# 📋 [Feature Name] Implementation Summary

## 🎯 Objective

Brief description of what was accomplished

## ✅ Changes Made

Detailed list of changes

## 🚀 Technical Details

Implementation specifics

## 📊 Results

Outcomes and metrics

## 📚 Related Documentation

Links to related docs
```

### Fix Documents

**Format:** `YYYYMMDD_ISSUE_FIX.md`

**Examples:**

- `20250908_CORS_CONFIGURATION_FIX.md`
- `20250908_BUILD_PIPELINE_FIX.md`
- `20250908_DATABASE_CONNECTION_FIX.md`
- `20250908_DEPLOYMENT_SCRIPT_FIX.md`

**Structure:**

```markdown
# 🔧 [Issue Name] Fix

## 🚨 Problem Description

What was broken

## 🔍 Root Cause Analysis

Why it was broken

## ✅ Solution Implementation

How it was fixed

## 🧪 Testing

How the fix was verified

## 🔄 Prevention

How to prevent in the future
```

### Prompt Documents

**Format:** `YYYYMMDD_PURPOSE_PROMPT.md`

**Examples:**

- `20250908_ARCHITECTURE_REVIEW_PROMPT.md`
- `20250908_CODE_OPTIMIZATION_PROMPT.md`
- `20250908_DOCUMENTATION_GENERATION_PROMPT.md`

**Structure:**

```markdown
# 💭 [Purpose] AI Prompt

## 🎯 Context

What the prompt was designed for

## 📝 Prompt Content
```

The actual prompt text used

```

## 🔄 Usage Instructions
How to use this prompt effectively

## 📊 Expected Outcomes
What results this prompt should generate
```

## 📅 Date Format

Use ISO 8601 date format: `YYYYMMDD`

- `20250908` for September 8, 2025
- `20251225` for December 25, 2025

## 🏗️ Content Categories

### Implementation Summaries

- **Feature Development** - New functionality implementation
- **Refactoring** - Code structure improvements
- **Performance** - Optimization implementations
- **Security** - Security enhancements
- **Integration** - Third-party service integrations

### Fix Documentation

- **Bug Fixes** - Specific bug resolution
- **Configuration Fixes** - Environment/setup issues
- **Build Fixes** - CI/CD pipeline issues
- **Deployment Fixes** - Production deployment issues
- **Performance Fixes** - Performance problem resolution

### Prompt Categories

- **Architecture Review** - System design analysis
- **Code Generation** - Automated code creation
- **Documentation** - Documentation generation
- **Testing** - Test case generation
- **Debugging** - Problem diagnosis

## 📝 Required Metadata

Each AI-generated document should include:

```markdown
---
type: summary|fix|prompt
date: YYYY-MM-DD
category: feature|bug|performance|security|deployment
status: completed|in-progress|deprecated
related_pr: #123 (if applicable)
ai_model: gpt-4|claude-3.5|other
author: human-reviewer-name
---
```

## 🔍 Examples

### Good Examples

✅ `20250908_USER_AUTHENTICATION_SUMMARY.md`
✅ `20250908_DOCKER_BUILD_FIX.md`
✅ `20250908_API_DOCUMENTATION_PROMPT.md`

### Bad Examples

❌ `auth_fix.md` (missing date, unclear name)
❌ `SUMMARY_20250908.md` (date at end, no description)
❌ `fix-cors-issue.md` (inconsistent format)

## 🗂️ File Organization

### Monthly Archives

After 6 months, consider moving older files to archive folders:

```
docs/ai-generated/
├── summaries/
│   ├── 2025-09/          # Current month
│   ├── 2025-08/          # Previous months
│   └── archive/          # Older content
├── fixes/
│   ├── 2025-09/
│   └── archive/
└── prompts/
    ├── active/           # Currently used prompts
    └── deprecated/       # Outdated prompts
```

### Index Files

Maintain index files for easy navigation:

```markdown
# AI-Generated Content Index

## Recent Summaries (September 2025)

- [Authentication Implementation](./summaries/20250908_AUTHENTICATION_SUMMARY.md)
- [API Refactoring](./summaries/20250907_API_REFACTORING_SUMMARY.md)

## Recent Fixes (September 2025)

- [CORS Configuration](./fixes/20250908_CORS_FIX.md)
- [Build Pipeline](./fixes/20250906_BUILD_PIPELINE_FIX.md)
```

## 🔄 Review Process

### AI-Generated Content Review

1. **Technical Accuracy** - Verify technical details
2. **Completeness** - Ensure all sections are filled
3. **Relevance** - Confirm content is still applicable
4. **Format Compliance** - Check naming and structure

### Deprecation Process

Mark outdated content with:

```markdown
---
status: deprecated
deprecated_date: YYYY-MM-DD
superseded_by: path/to/new/document.md
---

# ⚠️ DEPRECATED: [Original Title]

**This document has been superseded by [new document](link)**
```

## 🎯 Best Practices

### For Summaries

- Include objective metrics when possible
- Link to related pull requests
- Document any breaking changes
- Include screenshots for UI changes

### For Fixes

- Provide clear reproduction steps
- Include before/after comparisons
- Document the verification process
- Add prevention measures

### For Prompts

- Include context and constraints
- Provide example inputs/outputs
- Document model-specific considerations
- Include usage guidelines

## 📊 Quality Standards

### Required Elements

- Clear, descriptive titles
- Consistent formatting
- Proper categorization
- Accurate timestamps
- Relevant links and references

### Optional Enhancements

- Screenshots or diagrams
- Code snippets with syntax highlighting
- Performance metrics
- Related issue links
- Implementation timelines

---

This naming convention ensures that AI-generated documentation remains organized, searchable, and valuable for future development efforts.
