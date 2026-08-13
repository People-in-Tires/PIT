use crate::Point;
use wasm_bindgen::prelude::*;

// TODO: add cartesian coordinate to struct for ease of use in js
#[wasm_bindgen]
#[derive(Copy, Clone)]
pub struct Racer {
    pub t: f64,
    pub offset: f64,
    pub position: Point,
}

#[wasm_bindgen]
impl Racer {
    #[wasm_bindgen(constructor)]
    pub fn new(t: f64, offset: f64) -> Racer {
        Racer {
            t,
            offset,
            position: Point { x: 0.0, y: 0.0 },
        }
    }
}

impl Default for Racer {
    fn default() -> Self {
        Self::new(0., 0.)
    }
}
