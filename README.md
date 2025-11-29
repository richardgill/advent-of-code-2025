# Advent of Code 2025

## Structure

```
src/
├── lib/
│   └── utils.ts              # Shared utilities
└── days/
    ├── 01.1/
    │   ├── index.ts          # Solution
    │   ├── index.test.ts     # Tests
    │   └── data/
    │       ├── input.txt     # Puzzle input
    │       ├── example1.txt  # Example from problem
    │       └── example2.txt
    ├── 01.2/
    ... (through 12.2)
```

## Usage

```bash
bun install
```

```bash
# Run a solution
bun src/days/01.1/index.ts

# With hot reload while developing
bun --hot src/days/01.1/index.ts

# Run tests for a specific day
bun test src/days/01.1/

# Watch tests for a specific day
bun test --watch src/days/01.1/

# Run all tests
bun test
```
