use crate::{
    cpu_players::{litter_minigame, refuel_minigame, wheel_minigame, wing_minigame},
    db::{create_announcer, get_pool, get_race_states, pull_states, push_messages, push_states},
    program_utilities::check_args,
};
use rand::{RngExt, SeedableRng, rngs::ChaCha20Rng};
use simulation::race::Race;
use sqlx::PgPool;
use std::{thread::sleep, time::Duration};

const CPU_GAME_CHANCE: f64 = 10.;

#[tokio::main(flavor = "current_thread")]
async fn main() -> ! {
    let args: Vec<String> = check_args();
    let url = &args[1];
    let race_json = &args[2];
    let delta: f64 = args[3].parse().expect("Could not parse value into f64");
    let denominator = (CPU_GAME_CHANCE / delta).round() as u32;
    assert_ne!(denominator, 0);
    let pool: PgPool = get_pool(url).await.expect("Could not connect to database");
    let mut rng: ChaCha20Rng = ChaCha20Rng::seed_from_u64(0xBEEF);
    let mut races: Vec<Race> = match get_race_states(&pool, race_json).await {
        Ok(races) => races,
        Err(db::GetRaceStateError::InvalidState(e)) => {
            panic!("database contains invalid state, aborting: {}", e)
        }
        Err(db::GetRaceStateError::Sqlx(sqlx::Error::RowNotFound)) => {
            panic!("row doesnt exist in database, aborting")
        }
        Err(db::GetRaceStateError::Sqlx(e)) => {
            panic!("something is wrong with the database: {}", e)
        }
    };
    if let Err(e) = create_announcer(&pool).await {
        panic!("something went wrong when creating the announcer: {}", e)
    };

    loop {
        let _ = pull_states(&pool, &mut races).await;
        for (i, race) in &mut races.iter_mut().enumerate() {
            if race.racers().is_empty() || race.racers().iter().all(|r| r.finish > 0) {
                continue;
            }
            race.clear_messages();
            race.step(delta);
            for racer in race
                .racers()
                .iter_mut()
                .filter(|r| r.in_pit == 0 && r.cpu_pit && r.finish == -1)
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
            eprintln!("hazard count: {}", race.hazards().len());
            let _ = push_messages(&pool, &race.messages(), i).await;
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
