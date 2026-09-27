use crate::db::{get_pool, get_race_state, push_state};
use crate::r#loop::do_step;
use crate::program_utilities::usage;
use sqlx::PgPool;
use std::{env, thread::sleep, time::Duration};

#[tokio::main(flavor = "current_thread")]
async fn main() -> ! {
    let args: Vec<String> = env::args().collect();

    if args.len() < 3 {
        usage();
    }
    let url = &args[1];
    let race_json = &args[2];
    let pool: PgPool = get_pool(url).await.expect("Could not connect to database");
    let mut race = match get_race_state(&pool, race_json).await {
        Ok(race) => race,
        Err(db::GetRaceStateError::InvalidState) => {
            panic!("database contains invalid state, aborting")
        }
        Err(db::GetRaceStateError::Sqlx(sqlx::Error::RowNotFound)) => {
            panic!("row doesnt exist in database, aborting")
        }
        Err(db::GetRaceStateError::Sqlx(e)) => {
            panic!("something is wrong with the database: {}", e)
        }
    };
    loop {
        do_step(&mut race);
        let _ = push_state(&pool, &race).await;
        sleep(Duration::from_secs(1));
    }
}

mod db;
mod r#loop;
mod program_utilities;
#[cfg(test)]
mod test;
