#[macro_use]
mod js;
mod point;
mod race;
mod racer;
mod weather;

use crate::js::*;
use crate::point::Point;

use wasm_bindgen::prelude::*;

#[wasm_bindgen(start, private)]
pub fn main() {
    console_log!("working on getting points, and therefore arbitrary structs, to make sense");
}

#[cfg(test)]
mod tests;
