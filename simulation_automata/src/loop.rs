use simulation::race::Race;
use std::{
    fs::File,
    io::{Read, Seek},
    process::exit,
};

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
        Some(_) => (),
        None => {
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

pub(crate) fn do_step(race: &mut Race) {
    race.step();
    // println!("{}", race.to_json())
}
