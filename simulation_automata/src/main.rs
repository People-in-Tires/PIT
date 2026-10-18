use crate::{
    cpu_players::{litter_minigame, refuel_minigame, wheel_minigame, wing_minigame},
    db::{get_pool, get_race_states, pull_states, push_states},
    program_utilities::check_args,
};
use rand::{RngExt, SeedableRng, rngs::ChaCha20Rng};
use simulation::race::Race;
use sqlx::PgPool;
use std::{thread::sleep, time::Duration};

#[tokio::main(flavor = "current_thread")]
async fn main() -> ! {
    let args: Vec<String> = check_args();
    let url = &args[1];
    let race_json = &args[2];
    let delta: f64 = args[3].parse().expect("Could not parse value into f64");
    assert_ne!((10. / delta).round() as u32, 0);
    let denominator = (10. / delta).round() as u32;
    let pool: PgPool = get_pool(url).await.expect("Could not connect to database");
    let mut rng: ChaCha20Rng = ChaCha20Rng::seed_from_u64(0xBEEF);
    let mut races: Vec<Race> = match get_race_states(&pool, race_json).await {
        Ok(races) => races,
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
        let _ = pull_states(&pool, &mut races).await;
        for race in &mut races.iter_mut() {
            race.step(delta);
            for racer in race
                .racers()
                .iter_mut()
                .filter(|r| r.in_pit == 0 && r.cpu_pit)
            {
                if rng.random_ratio(1, denominator) {
                    wheel_minigame(racer, &mut rng);
                    refuel_minigame(racer, &mut rng);
                    litter_minigame(racer, &mut rng);
                    wing_minigame(racer, &mut rng);
                    racer.leave_pit();
                    let _ = race.set_racer(*racer);
                }
            }
        }
        let _ = push_states(&pool, &races).await;
        sleep(Duration::from_secs_f64(delta));
    }
}

mod cpu_players;
mod db;
mod program_utilities;
#[cfg(test)]
mod test;
