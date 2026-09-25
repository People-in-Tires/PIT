use crate::r#loop::{do_step, get_config};
use crate::program_utilities::usage;
use simulation::race::Race;
use sqlx::{PgPool, postgres::PgPoolOptions};
use std::{env, fs::File, thread::sleep, time::Duration};

async fn get_pool(url: &str) -> Result<PgPool, sqlx::Error> {
    PgPoolOptions::new()
        .max_connections(5)
        .acquire_timeout(Duration::from_secs(3))
        .idle_timeout(Duration::from_secs(10))
        .connect(url)
        .await
}

#[tokio::main(flavor = "current_thread")]
async fn main() -> ! {
    let args: Vec<String> = env::args().collect();

    if args.len() < 3 {
        usage();
    }
    let url = &args[1];
    let race_json = &args[2];
    let pool = get_pool(url).await.expect("Could not connect to database");
    println!(
        "schema: {:?}",
        sqlx::query("SELECT * FROM users").fetch_all(&pool).await
    );
    let mut file =
        File::open(race_json).unwrap_or_else(|_| panic!("Could not open file {}", race_json));
    let mut race: Race = get_config(&mut file);
    loop {
        do_step(&mut race);
        sleep(Duration::from_secs(1));
    }
}

mod r#loop;
mod program_utilities;
#[cfg(test)]
mod test;
