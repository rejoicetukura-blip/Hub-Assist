use soroban_sdk::{Env, Address, contracterror};

#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
pub enum GuardError {
    Unauthorized = 1,
    ContractPaused = 2,
    UsdcContractNotSet = 3,
    InvalidExpiryDate = 4,
    InvalidPayment = 5,
}

pub fn require_admin(env: &Env, caller: &Address) -> Result<(), GuardError> {
    let admin_key = soroban_sdk::symbol_short!("admin");
    let admin: Address = env.storage()
        .persistent()
        .get(&admin_key)
        .ok_or(GuardError::Unauthorized)?;

    caller.require_auth();

    if caller != &admin {
        return Err(GuardError::Unauthorized);
    }

    Ok(())
}

pub fn require_not_paused(env: &Env) -> Result<(), GuardError> {
    let pause_key = soroban_sdk::symbol_short!("paused");
    let is_paused: bool = env.storage()
        .persistent()
        .get(&pause_key)
        .unwrap_or(false);

    if is_paused {
        return Err(GuardError::ContractPaused);
    }

    Ok(())
}

pub fn require_usdc_set(env: &Env) -> Result<Address, GuardError> {
    let usdc_key = soroban_sdk::symbol_short!("usdc");
    env.storage()
        .persistent()
        .get(&usdc_key)
        .ok_or(GuardError::UsdcContractNotSet)
}

pub fn validate_expiry_date(env: &Env, expiry_date: u64) -> Result<(), GuardError> {
    let current_time = env.ledger().timestamp();

    if expiry_date <= current_time {
        return Err(GuardError::InvalidExpiryDate);
    }

    Ok(())
}

pub fn validate_payment(env: &Env, payment_token: &Address, amount: i128) -> Result<(), GuardError> {
    if amount <= 0 {
        return Err(GuardError::InvalidPayment);
    }

    let usdc = require_usdc_set(env)?;

    if payment_token != &usdc {
        return Err(GuardError::InvalidPayment);
    }

    Ok(())
}
