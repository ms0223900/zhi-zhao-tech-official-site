# Refactor Command Guide

This command guides you through a systematic code refactoring process following best practices and maintaining code quality.

## Refactoring Philosophy

- **Small Steps, Fast Iterations**: Refactor in small, incremental changes
- **Test-Driven Refactoring**: Ensure tests pass before and after each change
- **Quality Over Speed**: Prioritize code quality and maintainability
- **Preserve Functionality**: Never change behavior, only improve structure
- **Follow SOLID Principles**: Apply Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion

## Pre-Refactoring Checklist

Before starting any refactoring:

- [ ] All existing tests pass
- [ ] TypeScript compilation succeeds (`npm run lint`)
- [ ] Build succeeds (`npm run build`)
- [ ] Refactoring scope is clearly defined and small
- [ ] Dependencies and impacts are identified
- [ ] Refactoring plan is documented

## Refactoring Process

### Phase 1: Preparation

1. **Identify Refactoring Scope**
   - Determine specific code to refactor
   - Identify related files and dependencies
   - Document current behavior and expected outcome

2. **Create TODO List**
   - Break down refactoring into small, atomic steps
   - Each step should be independently verifiable
   - Estimate effort for each step

3. **Ensure Test Coverage**
   - Verify existing tests cover the code to be refactored
   - Add missing tests if necessary (do this BEFORE refactoring)
   - Ensure tests validate behavior, not implementation

4. **Run Baseline Checks**
   ```bash
   npm run lint      # TypeScript and code quality checks
   npm run build     # Build verification
   ```

### Phase 2: Execution

1. **Execute Small Steps**
   - Refactor only one small portion at a time
   - Each step should be a single, focused change
   - Examples of small steps:
     - Extract a function
     - Rename a variable
     - Split a large component into smaller ones
     - Extract a custom hook
     - Move a utility function to a separate file

2. **Verify After Each Step**
   ```bash
   npm run lint      # Verify code quality
   npm run build     # Verify build still works
   ```
   - Ensure TypeScript compilation succeeds
   - Ensure no new linting errors
   - Verify functionality manually or through tests

3. **Commit Small Changes**
   - Consider committing after each successful small step
   - Use descriptive commit messages
   - This allows easy rollback if needed

### Phase 3: Validation

After completing all refactoring steps:

1. **Final Verification**
   ```bash
   npm run lint      # Ensure all checks pass
   npm run build     # Ensure build succeeds
   ```

2. **Functional Verification**
   - Test the refactored code manually
   - Verify all features still work as expected
   - Check for any regressions

3. **Code Quality Review**
   - Verify code is more maintainable
   - Check that complexity is reduced
   - Ensure naming is clear and consistent
   - Verify SOLID principles are followed

## Post-Refactoring Checklist

- [ ] All linting checks pass
- [ ] Build succeeds without errors
- [ ] Functionality behavior is unchanged
- [ ] Code quality has improved (readability, maintainability)
- [ ] No new dependencies added (unless necessary)
- [ ] Refactoring aligns with project conventions
- [ ] Related documentation updated if needed

## Common Refactoring Patterns

### Extract Function/Component
- Identify duplicated code or complex logic
- Extract into reusable function/component
- Maintain same interface and behavior
- Update all call sites

### Rename for Clarity
- Use descriptive names that reveal intent
- Update all references
- Ensure TypeScript catches all usages

### Split Large Component
- Identify logical boundaries
- Split into smaller, focused components
- Maintain component interface
- Ensure props are properly typed

### Extract Custom Hook
- Identify component logic that can be reused
- Extract into custom hook
- Follow React hook naming conventions (use*)
- Ensure proper dependency arrays

### Move to Appropriate Location
- Move utility functions to `src/lib/`
- Move types to `src/types/` or appropriate location
- Update all imports
- Ensure proper exports

### Simplify Conditional Logic
- Extract complex conditions to well-named variables
- Use early returns where appropriate
- Consider using ternary operators for simple cases
- Avoid nested ternaries

## React-Specific Refactoring Guidelines

### Component Refactoring
- Prefer React Server Components (RSC) where possible
- Minimize 'use client' directives
- Extract client-side logic to separate client components
- Use proper TypeScript types for props

### State Management Refactoring
- Consider if state can be moved to URL (using nuqs)
- Evaluate if state should be lifted up or moved down
- Use `useActionState` for form state (React 19)
- Minimize client-side state

### Performance Refactoring
- Use React.memo only when necessary and beneficial
- Use useCallback for stable function references passed to memoized children
- Use useMemo for expensive computations
- Don't overuse optimization hooks

## TypeScript Refactoring Guidelines

### Type Safety
- Always maintain type safety during refactoring
- Use proper type inference where possible
- Prefer interfaces over types
- Use `satisfies` operator for type validation

### Type Improvements
- Add missing types
- Improve type specificity
- Use const assertions where appropriate
- Avoid `any` types

## Error Handling

If refactoring encounters issues:

1. **Stop immediately** if tests fail
2. **Revert the last change** if needed
3. **Investigate the issue** thoroughly
4. **Fix the problem** before proceeding
5. **Re-run all checks** before continuing

## Best Practices

1. **Never refactor and add features simultaneously**
   - Keep refactoring separate from feature development
   - Complete refactoring first, then add features

2. **Document complex refactoring decisions**
   - Add comments explaining why, not what
   - Update relevant documentation

3. **Maintain backward compatibility**
   - Don't break existing APIs
   - Consider deprecation strategy for breaking changes

4. **Review with team**
   - For large refactorings, get code review
   - Share knowledge about improvements made

5. **Measure improvements**
   - Compare code complexity before/after
   - Verify performance hasn't regressed
   - Document improvements made

## Commands Reference

```bash
# Before refactoring - establish baseline
npm run lint      # TypeScript and ESLint checks
npm run build     # Build verification

# During refactoring - verify each step
npm run lint      # Verify code quality maintained
npm run build     # Verify build still works

# After refactoring - final validation
npm run lint      # Final code quality check
npm run build     # Final build verification
```

## Example Refactoring Workflow

1. **Identify**: "This component is too large (300+ lines)"

2. **Plan**:
   - Extract header section → Header component
   - Extract form logic → Custom hook
   - Extract utility functions → `src/lib/utils.ts`

3. **Execute**:
   - Step 1: Extract Header component
     - Create `Header.tsx`
     - Move header JSX and styles
     - Update imports
     - Run `npm run lint && npm run build`
   
   - Step 2: Extract form hook
     - Create `useFormData.ts`
     - Move form state and handlers
     - Update component to use hook
     - Run `npm run lint && npm run build`
   
   - Step 3: Extract utilities
     - Move functions to `src/lib/utils.ts`
     - Update imports
     - Run `npm run lint && npm run build`

4. **Validate**:
   - All checks pass
   - Component is now smaller and more maintainable
   - Functionality unchanged

---

Remember: Refactoring is about improving code quality while preserving functionality. Take small steps, verify frequently, and prioritize maintainability.

