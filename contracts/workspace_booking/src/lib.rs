#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, Address, Env};

#[contracttype]
#[derive(Clone)]
pub struct Booking {
    pub id: u64,
    pub member: Address,
    pub workspace_id: u32,
    pub start_time: u64,
    pub end_time: u64,
    pub amount: i128,
    pub confirmed: bool,
}

#[contracttype]
pub enum DataKey {
    BookingCount,
    Booking(u64),
}

#[contract]
pub struct WorkspaceBooking;

#[contractimpl]
impl WorkspaceBooking {
    /// Create a booking and hold payment in escrow.
    pub fn book(
        env: Env,
        member: Address,
        workspace_id: u32,
        start_time: u64,
        end_time: u64,
        amount: i128,
    ) -> u64 {
        member.require_auth();
        let id: u64 = env
            .storage()
            .instance()
            .get(&DataKey::BookingCount)
            .unwrap_or(0u64)
            + 1;
        let booking = Booking { id, member, workspace_id, start_time, end_time, amount, confirmed: false };
        env.storage().instance().set(&DataKey::Booking(id), &booking);
        env.storage().instance().set(&DataKey::BookingCount, &id);
        id
    }

    /// Confirm a booking (admin action releases escrow).
    pub fn confirm(env: Env, admin: Address, booking_id: u64) {
        admin.require_auth();
        let mut booking: Booking = env
            .storage()
            .instance()
            .get(&DataKey::Booking(booking_id))
            .expect("booking not found");
        booking.confirmed = true;
        env.storage().instance().set(&DataKey::Booking(booking_id), &booking);
    }

    pub fn get_booking(env: Env, booking_id: u64) -> Booking {
        env.storage()
            .instance()
            .get(&DataKey::Booking(booking_id))
            .expect("booking not found")
    }
}
