# Creating Expenses

Note: the default budget set is 10000.

## Happy Case 

This tests a typical case where a note iwth the title "testNote" is added, with value "100".

## Negative Cost

This tests to make sure that trying to create an expense with a negative cost fails, and doesn't render any resulting note.

## Non Number Cost

This tests to make sure that trying to create an expense with an invalid number input, like "ab", fails, and doesn't render any resulting note.

## Overbudget

This tests that when a budget is overbudget, the correct expense is created, and the resulting totals, and remaining budget left is displayed correctly. Correct behavior means that the remaining budget is negative, and the money spent so far matches the sum of all expense costs.

## Empty Name and Cost

Trying to create a expense with no name or no cost should fail.

# Delete Expenses Tests

## Typical Case

Deleting an expense from the list should mean that said expense is no longer rendered in the DOM. Also check that the sums updated correctly.

## Delete all

Deleting all expenses from the list should mean that no expenses are rendered. The remaining budget should also be correct (10000), along with currently spent amount being 0.

# Budget Balance Verification

## Typical Case

Adding three expenses to the list with a total cost of 1110 should result in a remaining budget of $8890, and a spent so far value of $1110.