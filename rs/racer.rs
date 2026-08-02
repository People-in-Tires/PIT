use wasm_bindgen::prelude::*;

// TODO: add cartesian coordinate to struct for ease of use in js
#[wasm_bindgen]
pub struct Racer {
    pub t: f64,
    pub offset: f64,
}

#[wasm_bindgen]
impl Racer {
    #[wasm_bindgen(constructor)]
    pub fn new(t: f64, offset: f64) -> Racer {
        Racer { t, offset }
    }
}

impl Default for Racer {
    fn default() -> Self {
        Self::new(0., 0.)
    }
}
