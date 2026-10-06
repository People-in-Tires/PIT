use crate::db::{get_pool, get_race_state, push_state};
use crate::r#loop::do_step;
use crate::program_utilities::usage;
use simulation::point::Point;
use simulation::race::Race;
use simulation::racer::Racer;
use sqlx::PgPool;
use std::io::Write;
use std::process::exit;
use std::{env, thread::sleep, time::Duration};

#[tokio::main(flavor = "current_thread")]
async fn main() -> ! {
    let args: Vec<String> = env::args().collect();

    if args.len() < 3 {
        usage();
    }
    if args[1] == "new" {
        fn new_racer(forename: &str, surname: &str) -> Racer {
            let mut rv = Racer::new(0.0, 0.0);
            assert!(rv.driver.set_forename(forename).is_ok());
            assert!(rv.driver.set_surname(surname).is_ok());
            rv
        }
        let racers = vec![
            new_racer("John", "Fortnite"),
            new_racer("Jon", "Fork Knife"),
            new_racer("Jhon", "Fork Nite"),
            new_racer("Joen", "Fort Night"),
            new_racer("Jan", "Fort Haight"),
            new_racer("Jann", "For Height"),
            new_racer("Jame", "For Head"),
            new_racer("James", "Four Head"),
            new_racer("Jamie", "Four Tnite"),
            new_racer("Pablo", "Four Kite"),
            new_racer("Johnathan", "For To Night"),
            new_racer("Jonathan", "Four Two Nite"),
            new_racer("Johnatan", "Forty Nighty"),
            new_racer("Jonatan", "Nort Fite"),
            new_racer("Journathan", "Biweekly"),
            new_racer("Johannes", "Twice a week"),
            new_racer("Joe", "Fort Knight"),
            new_racer("Jo", "For Knight"),
            new_racer("Joan", "4"),
            new_racer("Jenn", "nite"),
            new_racer("Jhesus", "Cniste"),
            new_racer("Tije", "Verloop"),
            new_racer("Tiyea", "Fortnite"),
            new_racer("Jehova", "Witness"),
        ];
        let track = vec![
            Point { x: 0.1, y: 0.1 },
            Point { x: 0.5, y: 0.1 },
            Point { x: 0.9, y: 0.1 },
            Point { x: 0.9, y: 0.5 },
            Point { x: 0.9, y: 0.9 },
            Point { x: 0.5, y: 0.9 },
            Point { x: 0.1, y: 0.9 },
            Point { x: 0.1, y: 0.5 },
            Point { x: 0.1, y: 0.1 },
            Point { x: 0.5, y: 0.1 },
            Point { x: 0.9, y: 0.1 },
        ];
        let race = Race::new(racers, track, simulation::weather::EWeather::Sunny);
        if let Ok(mut file) = std::fs::File::create(args[2].clone()) {
            match file.write_all(&race.to_json().into_bytes()) {
                Ok(()) => exit(0),
                Err(e) => {
                    eprintln!("an error occurred while writing to {}: {}", args[2], e);
                    exit(1)
                }
            }
        } else {
            exit(1);
        }
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
