# HubAssist Smart Contracts

This directory contains all Soroban smart contracts for the HubAssist platform, deployed on the Stellar blockchain.

## Contracts Overview

### manage_hub
**Purpose**: Core hub management contract handling membership tokens, subscriptions, and administrative functions.

**Key Features**:
- Membership token issuance and management
- Subscription creation and tracking
- Admin controls and pause functionality
- Token transfer with royalty calculations
- Upgrade and migration capabilities

**Build**:
```bash
cd manage_hub
stellar contract build
```

**Test**:
```bash
cd manage_hub
cargo test
```

**Deploy**:
```bash
stellar contract deploy \
  --wasm target/wasm32v1-none/release/manage_hub.wasm \
  --source-account <your-account> \
  --network testnet \
  --alias manage_hub
```

---

### workspace_booking
**Purpose**: Handles workspace booking, seat reservations, and payment escrow.

**Key Features**:
- Booking creation and cancellation
- Seat availability tracking
- Payment escrow management
- Booking history and analytics

**Build**:
```bash
cd workspace_booking
stellar contract build
```

**Test**:
```bash
cd workspace_booking
cargo test
```

**Deploy**:
```bash
stellar contract deploy \
  --wasm target/wasm32v1-none/release/workspace_booking.wasm \
  --source-account <your-account> \
  --network testnet \
  --alias workspace_booking
```

---

### membership_token
**Purpose**: SRC-20 compliant membership token contract with expiry and tier support.

**Key Features**:
- Token minting and burning
- Tier-based membership levels
- Expiry date enforcement
- Transfer restrictions

**Build**:
```bash
cd membership_token
stellar contract build
```

**Test**:
```bash
cd membership_token
cargo test
```

**Deploy**:
```bash
stellar contract deploy \
  --wasm target/wasm32v1-none/release/membership_token.wasm \
  --source-account <your-account> \
  --network testnet \
  --alias membership_token
```

---

### payment_escrow
**Purpose**: Manages payment escrow for bookings and transactions.

**Key Features**:
- Escrow account creation
- Payment holding and release
- Dispute resolution
- Multi-signature support

**Build**:
```bash
cd payment_escrow
stellar contract build
```

**Test**:
```bash
cd payment_escrow
cargo test
```

**Deploy**:
```bash
stellar contract deploy \
  --wasm target/wasm32v1-none/release/payment_escrow.wasm \
  --source-account <your-account> \
  --network testnet \
  --alias payment_escrow
```

---

### access_control
**Purpose**: On-chain role-based access control for contract operations.

**Key Features**:
- Role assignment and revocation
- Permission checking
- Admin delegation
- Audit logging

**Build**:
```bash
cd access_control
stellar contract build
```

**Test**:
```bash
cd access_control
cargo test
```

**Deploy**:
```bash
stellar contract deploy \
  --wasm target/wasm32v1-none/release/access_control.wasm \
  --source-account <your-account> \
  --network testnet \
  --alias access_control
```

---

### common_types
**Purpose**: Shared types and utilities used across all contracts.

**Key Features**:
- Common error types
- Shared data structures
- Utility functions
- Type definitions

**Note**: This is a library crate, not deployable as a standalone contract.

---

### hubassist_hub
**Purpose**: Central hub registry and member management.

**Key Features**:
- Hub registration and configuration
- Member directory
- Hub statistics and analytics
- Multi-hub support

**Build**:
```bash
cd hubassist_hub
stellar contract build
```

**Test**:
```bash
cd hubassist_hub
cargo test
```

**Deploy**:
```bash
stellar contract deploy \
  --wasm target/wasm32v1-none/release/hubassist_hub.wasm \
  --source-account <your-account> \
  --network testnet \
  --alias hubassist_hub
```

---

## Building All Contracts

To build all contracts at once:

```bash
cd contracts
cargo build --release
```

This will compile all workspace members and output WASM binaries to `target/wasm32v1-none/release/`.

## Running Tests

To run tests for all contracts:

```bash
cd contracts
cargo test
```

To run tests for a specific contract:

```bash
cd contracts/<contract-name>
cargo test
```

## Deployment

### Prerequisites
- Stellar CLI installed and configured
- Funded Stellar account
- Network selection (testnet or mainnet)

### Testnet Deployment
```bash
stellar contract deploy \
  --wasm target/wasm32v1-none/release/<contract-name>.wasm \
  --source-account <your-account> \
  --network testnet \
  --alias <contract-name>
```

### Mainnet Deployment
```bash
stellar contract deploy \
  --wasm target/wasm32v1-none/release/<contract-name>.wasm \
  --source-account <your-account> \
  --network public \
  --alias <contract-name>
```

## Development

### Adding a New Contract

1. Create a new directory: `mkdir contracts/new_contract`
2. Initialize Cargo: `cargo init --lib`
3. Update `contracts/Cargo.toml` to add the new contract to workspace members
4. Add dependencies to the new contract's `Cargo.toml`
5. Implement contract logic in `src/lib.rs`
6. Add tests in `src/test.rs`

### Code Style

- Follow Rust conventions and best practices
- Use meaningful variable and function names
- Add documentation comments for public APIs
- Keep functions focused and testable

## Troubleshooting

### Build Errors
- Ensure Rust toolchain is up to date: `rustup update`
- Check that `wasm32v1-none` target is installed: `rustup target add wasm32v1-none`
- Verify Soroban SDK version matches across all contracts

### Test Failures
- Run tests with verbose output: `cargo test -- --nocapture`
- Check contract storage initialization in tests
- Verify mock data and test fixtures

### Deployment Issues
- Confirm account has sufficient XLM for deployment
- Verify network connectivity
- Check contract WASM size (must be under 64KB)

## Resources

- [Soroban Documentation](https://developers.stellar.org/docs/learn/soroban)
- [Stellar CLI Reference](https://developers.stellar.org/docs/tools/stellar-cli)
- [Soroban SDK](https://docs.rs/soroban-sdk/)
