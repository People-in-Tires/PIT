use colored::Colorize;
use simulation::{point::Point, race::Race, racer::Racer};
use std::{env, io::Write, process::exit};

pub(crate) fn usage() -> ! {
    let program_name = env::args().next().unwrap();

    eprintln!(
        "{} {} [race description].json",
        "[USAGE]".bold().white(),
        program_name
    );
    exit(1)
}

pub(crate) fn check_args() -> Vec<String> {
    let args: Vec<String> = env::args().collect();
    if args.len() < 3 {
        usage()
    } else if args[1] == "new" {
        create_new_race(&args[2])
    } else if args.len() != 4 {
        usage()
    } else {
        args
    }
}

pub(crate) fn create_new_race(filepath: &str) -> ! {
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
    if let Ok(mut file) = std::fs::File::create(filepath) {
        match file.write_all(&race.to_json().into_bytes()) {
            Ok(()) => exit(0),
            Err(e) => {
                eprintln!("an error occurred while writing to {}: {}", filepath, e);
                exit(1)
            }
        }
    } else {
        exit(1);
    }
}
