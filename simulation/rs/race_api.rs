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
        rv.set_car_numbers();
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
    pub fn from_json(json: String) -> Result<Race, String> {
        serde_json::from_str(&json).map_err(|e| e.to_string())
    }

    #[wasm_bindgen(getter)]
    pub fn racers(&self) -> Vec<Racer> {
        self.racers.clone()
    }
    #[wasm_bindgen]
    pub fn set_racer_by_index(&mut self, r: Racer, i: usize) -> Result<(), &'static str> {
        if self.racers.len() < i {
            Err("index out of bounds")
        } else {
            self.racers[i] = r;
            Ok(())
        }
    }
    #[wasm_bindgen]
    pub fn set_racer(&mut self, r: Racer) -> Result<(), &'static str> {
        if let Some(racer) = self
            .racers
            .iter_mut()
            .find(|candidate| candidate.car.number == r.car.number)
        {
            *racer = r;
            Ok(())
        } else {
            Err("no racer with same number on track")
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

    #[wasm_bindgen]
    pub fn get_track_position(&self, t: f64) -> Result<Point, &'static str> {
        if t.is_sign_positive() && t <= 1. {
            Ok(Self::curve(&self.track_points, t))
        } else {
            Err("t out of bounds")
        }
    }
    #[wasm_bindgen]
    pub fn get_track_normal(&self, t: f64) -> Result<Point, &'static str> {
        if t.is_sign_positive() && t <= 1. {
            Ok(Self::normal(&self.track_points, t))
        } else {
            Err("t out of bounds")
        }
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
