# GitHub Copilot Instructions for Interconnect.Exchange

## Critical: Interconnect Made Easy Schema Compliance

This project implements the **Interconnect Made Easy** specification for telecommunications rate cards. All rate card generation, validation, and manipulation **MUST** follow the official schema.

### Schema Reference

- **NPM Package**: `@connexcs/interconnect-made-easy`
- **Schema File**: `docs-content/schema/interconnect-made-easy.schema.json`
- **Specification Doc**: `docs-content/SPECIFICATION.md`
- **Card Types Doc**: `docs-content/CARD-TYPES.md`

### Functionality

All added functionality should as priority attempt to use functions provided by the `@connexcs/interconnect-made-easy` package for before looking to implement custom logic.