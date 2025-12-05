Args: $ARGUMENTS (day part)

Review `src/days/$ARGUMENTS/*.ts` for clarity and readability.

## Guidelines

- Write clean, idiomatic code
- Don't use unusual syntax to work around style rules
- If it helps readiblity, extract small helper functions when:
  - Logic is reused
  - A function exceeds ~15 lines
  - It makes the main function's intent clearer
- Prefer declarative patterns (`.filter().length`) over imperative loops when equally readable
- Only add comments for non-obvious logic

Check your work with `bun local-ci
