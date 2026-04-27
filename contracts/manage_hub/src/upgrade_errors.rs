use soroban_sdk::contracterror;

#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
pub enum UpgradeError {
    Unauthorized = 1,
    UpgradeNotScheduled = 2,
    TimeLockActive = 3,
    InvalidWasmHash = 4,
}
