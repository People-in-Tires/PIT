#[macro_use]
mod js;
mod fallout;
mod hazards;
mod point;
mod race;
mod racer;
mod weather;

use crate::js::*;
use crate::point::Point;

use wasm_bindgen::prelude::*;

fn set_prefix<const SIZE: usize, T: Copy>(arr: &mut [T; SIZE], prefix: &[T]) -> Option<()> {
    if prefix.len() > SIZE {
        None
    } else {
        let slice = &mut arr[..prefix.len()];
        slice.copy_from_slice(prefix);
        Some(())
    }
}

#[wasm_bindgen(start, private)]
pub fn main() {
    console_log!("working on getting points, and therefore arbitrary structs, to make sense");
}

#[cfg(test)]
mod tests;
