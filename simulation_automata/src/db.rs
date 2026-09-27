use std::{fs::File, time::Duration};

use simulation::race::Race;
use sqlx::{Database, Pool, Postgres, pool::PoolOptions, postgres::PgQueryResult};

use crate::r#loop::get_config;

pub(crate) async fn get_pool<T: Database>(url: &str) -> Result<Pool<T>, sqlx::Error> {
    PoolOptions::<T>::new()
        .max_connections(5)
        .acquire_timeout(Duration::from_secs(3))
        .idle_timeout(Duration::from_secs(10))
        .connect(url)
        .await
}

pub(crate) enum GetRaceStateError {
    Sqlx(sqlx::Error),
    InvalidState,
}
impl From<sqlx::Error> for GetRaceStateError {
    fn from(value: sqlx::Error) -> Self {
        Self::Sqlx(value)
    }
}

pub(crate) async fn get_race_state(
    pool: &Pool<Postgres>,
    backup_file: &str,
) -> Result<Race, GetRaceStateError> {
    let states: Vec<(String,)> =
        sqlx::query_as("SELECT state FROM raceState ORDER BY timestamp DESC LIMIT 2")
            .fetch_all(pool)
            .await
            .unwrap_or_else(|_| vec![("".into(),)]);
    let (state,) = &states[0];

    if state.is_empty() {
        Ok(get_config(&mut File::open(backup_file).unwrap_or_else(
            |_| panic!("Could not open file {}", backup_file),
        )))
    } else {
        Race::from_json(state.to_string()).ok_or(GetRaceStateError::InvalidState)
    }
}

pub(crate) async fn push_state(
    pool: &Pool<Postgres>,
    race: &Race,
) -> Result<PgQueryResult, sqlx::Error> {
    sqlx::query(sqlx::AssertSqlSafe(format!(
        "INSERT INTO raceState VALUES (DEFAULT, '{}')",
        race.to_json()
    )))
    .execute(pool)
    .await
}
