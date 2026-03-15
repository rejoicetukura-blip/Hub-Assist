#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, Address, Env, String, Vec};

#[contracttype]
#[derive(Clone)]
pub struct Member {
    pub address: Address,
    pub role: String,
    pub active: bool,
}

#[contracttype]
pub enum DataKey {
    Admin,
    Members,
}

#[contract]
pub struct BlueCollarHub;

#[contractimpl]
impl BlueCollarHub {
    /// Initialize the hub with an admin address.
    pub fn initialize(env: Env, admin: Address) {
        admin.require_auth();
        env.storage().instance().set(&DataKey::Admin, &admin);
        let members: Vec<Member> = Vec::new(&env);
        env.storage().instance().set(&DataKey::Members, &members);
    }

    /// Register a new member.
    pub fn register_member(env: Env, caller: Address, role: String) {
        caller.require_auth();
        let mut members: Vec<Member> = env
            .storage()
            .instance()
            .get(&DataKey::Members)
            .unwrap_or(Vec::new(&env));
        members.push_back(Member { address: caller, role, active: true });
        env.storage().instance().set(&DataKey::Members, &members);
    }

    /// Return total member count.
    pub fn member_count(env: Env) -> u32 {
        let members: Vec<Member> = env
            .storage()
            .instance()
            .get(&DataKey::Members)
            .unwrap_or(Vec::new(&env));
        members.len()
    }
}
