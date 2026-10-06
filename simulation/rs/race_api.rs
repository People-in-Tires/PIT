use crate::hazards::Hazard;
use crate::point::Point;
use crate::race::*;
use crate::racer::Racer;
use crate::weather::EWeather;
use wasm_bindgen::prelude::wasm_bindgen;

#[wasm_bindgen]
impl Race {
    #[wasm_bindgen(constructor)]
    pub fn new(racers: Vec<Racer>, track: Vec<Point>, weather: EWeather) -> Race {
        let track_points = Self::wrapping_control_points(track.clone());
        let mut rv = Race {
            racers,
            track,
            track_points,
            weather,
            duration: 0,
            hazards: Vec::default(),
            messages: Vec::default(),
        };
        rv.update_racer_positions();
        rv
    }

    #[wasm_bindgen(js_name = clone)]
    pub fn dup(&self) -> Self {
        self.clone()
    }

    #[wasm_bindgen]
    pub fn to_json(&self) -> String {
        serde_json::to_string(self).unwrap()
    }
    #[wasm_bindgen]
    pub fn from_json(json: String) -> Option<Race> {
        serde_json::from_str(&json).ok()
    }

    #[wasm_bindgen(getter)]
    pub fn racers(&self) -> Vec<Racer> {
        self.racers.clone()
    }
    #[wasm_bindgen]
    pub fn set_racer(&mut self, r: Racer, i: usize) -> bool {
        if self.racers.len() < i {
            true
        } else {
            self.racers[i] = r;
            false
        }
    }

    #[wasm_bindgen(getter)]
    pub fn track(&self) -> Vec<Point> {
        self.track.clone()
    }
    #[wasm_bindgen(getter)]
    pub fn track_points(&self) -> Vec<Point> {
        self.track_points.clone()
    }

    #[wasm_bindgen(getter)]
    pub fn hazards(&self) -> Vec<Hazard> {
        self.hazards.clone()
    }

    #[wasm_bindgen(getter)]
    pub fn messages(&self) -> Vec<String> {
        self.messages.clone()
    }
    #[wasm_bindgen]
    pub fn clear_messages(&mut self) {
        self.messages.clear()
    }
}
