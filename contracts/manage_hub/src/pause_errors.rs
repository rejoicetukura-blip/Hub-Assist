use soroban_sdk::contracterror;

#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
pub enum PauseError {
    Unauthorized = 1,
    AlreadyPaused = 2,
    NotPaused = 3,
}
