use soroban_sdk::{contract, contractimpl, Env};
use crate::upgrade_errors::UpgradeError;

#[contract]
pub struct MigrationModule;

#[contractimpl]
impl MigrationModule {
    pub fn migrate_v1_to_v2(env: Env, admin: soroban_sdk::Address) -> Result<(), UpgradeError> {
        admin.require_auth();

        let version_key = soroban_sdk::symbol_short!("version");
        let current_version: u32 = env.storage()
            .persistent()
            .get(&version_key)
            .unwrap_or(1u32);

        if current_version >= 2 {
            return Ok(());
        }

        env.storage().persistent().set(&version_key, &2u32);

        Ok(())
    }

    pub fn get_migration_version(env: Env) -> u32 {
        let version_key = soroban_sdk::symbol_short!("version");
        env.storage()
            .persistent()
            .get(&version_key)
            .unwrap_or(1u32)
    }
}
