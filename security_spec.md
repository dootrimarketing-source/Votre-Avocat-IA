# Security Specification for Votre Avocat IA

## Data Invariants
1. A Message must belong to a Dossier.
2. A Dossier must be owned by the user who created it.
3. Access to messages is strictly linked to Dossier ownership.
4. Users cannot modify system-generated fields like `createdAt` after creation.

## The Dirty Dozen Payloads (Targeting Firestore)
1. Creating a Dossier with someone else's `userId`.
2. Updating a Dossier's `userId` to steal it.
3. Reading messages of a Dossier owned by another user.
4. Injecting a 2MB string into `title`.
5. Creating a message in a dossier you don't own.
6. Updating a message's `role` (user -> admin-like role spoofing).
7. Deleting a Dossier you don't own.
8. Listing all dossiers (blanket read attempt).
9. Updating `createdAt` on an existing dossier.
10. Creating a dossier without `title`.
11. Updating `contractDraft` with a non-string type.
12. Updating `updatedAt` to a past date.

## Test Runner (Logic Verification)
The rules will be verified using ESLint and the security pillars logic.
