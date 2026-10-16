use colored::Colorize;
use simulation::{
    manufacturer::{Manufacturer, RandomManufacturer},
    point::Point,
    race::Race,
    racer::Racer,
    sponsor::{RandomSponsor, Sponsor},
};
use std::{
    array::from_fn,
    env,
    fs::File,
    io::{Read, Seek, Write},
    process::exit,
};

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
    fn new_racer() -> Racer {
        let mut rv = Racer::new(0.0, 0.0);
        rv.car = RandomManufacturer.manufacture_car();
        rv.driver = RandomSponsor.scout();
        rv
    }
    let racers: [Racer; 24] = from_fn(|_| new_racer());
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
    let race = Race::new(racers.to_vec(), track, simulation::weather::EWeather::Sunny);
    race.racers()
        .iter()
        .map(|r| println!("racer {} has entered the PIT!", r.driver.name()))
        .fold((), |_, _| ());
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

pub(crate) fn get_config(config_file: &mut File) -> Race {
    match config_file.lock() {
        Ok(_) => (),
        Err(e) => {
            eprintln!(
                "Fatal filesystem error while trying to lock config file: {}",
                e
            );
            exit(1)
        }
    };
    let mut config_string = String::new();
    match config_file.read_to_string(&mut config_string) {
        Ok(_) => (),
        Err(e) => {
            eprintln!("Could not read file: {}", e);
            exit(1);
        }
    };
    let race = Race::from_json(config_string.clone());
    match race {
        Ok(_) => (),
        Err(_) => {
            eprintln!("invalid config '{}'", config_string);
            exit(1);
        }
    }
    match config_file.rewind() {
        Ok(_) => (),
        Err(e) => {
            eprintln!("Could not rewind file: {}", e);
            exit(1);
        }
    }
    match config_file.unlock() {
        Ok(_) => (),
        Err(e) => {
            eprintln!(
                "Fatal filesystem error while trying to lock config file: {}",
                e
            );
            exit(1)
        }
    }
    race.unwrap()
}
