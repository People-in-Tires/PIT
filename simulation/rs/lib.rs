#![allow(arithmetic_overflow)]
#[macro_use]
pub mod js;
pub mod fallout;
pub mod hazards;
pub mod point;
pub mod race;
pub mod racer;
pub mod weather;

use crate::js::*;
use crate::point::Point;

use wasm_bindgen::prelude::*;

#[wasm_bindgen(start, private)]
pub fn main() {
    console_log!("working on getting points, and therefore arbitrary structs, to make sense");
}

#[cfg(test)]
mod tests;
