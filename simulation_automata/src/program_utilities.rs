use colored::Colorize;
use std::{env, process::exit};

pub(crate) fn usage() -> ! {
    let program_name = env::args().next().unwrap();

    eprintln!(
        "{} {} [race description].json",
        "[USAGE]".bold().white(),
        program_name
    );
    exit(1)
}
