use soroban_sdk::Env;

pub struct RoyaltyModule;

impl RoyaltyModule {
    pub fn calculate_royalty(amount: i128, royalty_percentage: u32) -> i128 {
        if royalty_percentage == 0 {
            return 0;
        }

        (amount * royalty_percentage as i128) / 100
    }

    pub fn apply_royalty_on_transfer(
        env: &Env,
        transfer_amount: i128,
        royalty_percentage: u32,
    ) -> (i128, i128) {
        let royalty = Self::calculate_royalty(transfer_amount, royalty_percentage);
        let net_amount = transfer_amount - royalty;

        let royalty_key = soroban_sdk::symbol_short!("royalty");
        let current_royalties: i128 = env.storage()
            .persistent()
            .get(&royalty_key)
            .unwrap_or(0i128);

        env.storage()
            .persistent()
            .set(&royalty_key, &(current_royalties + royalty));

        (net_amount, royalty)
    }
}
