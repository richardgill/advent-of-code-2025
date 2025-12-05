Args: $ARGUMENTS (day part)

Use TodoWrite to create these todos:

[ ] Use the SlashCommand tool to invoke `/prep-day $ARGUMENTS`
[ ] Solve the part per CLAUDE.md approach (create example files, implement solution). Check if answer is correct: `./scripts/check-answer.sh $ARGUMENTS`
[ ] Use the SlashCommand tool to invoke `/review-part $ARGUMENTS`
[ ] Run `bun local-ci` and fix any issues
