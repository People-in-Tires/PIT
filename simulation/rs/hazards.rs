use crate::{fallout::Fallout, race::Race, racer::Racer};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(Copy, Clone, Default)]
pub struct Hazard {
    // some value T, we probably dont care for offset here
    location: f64,
    r#type: HazardType,
}

#[wasm_bindgen]
#[derive(Copy, Clone, Default)]
pub enum HazardType {
    #[default]
    Unknown,
    Slick,
    Creature,
}

impl Fallout for Hazard {
    fn effect_racer(&self, r: &mut Racer) {
        match self.r#type {
            HazardType::Unknown => Unknown(self.location).effect_racer(r),
            HazardType::Slick => Slick(self.location).effect_racer(r),
            HazardType::Creature => Creature(self.location).effect_racer(r),
        }
    }

    fn effect_track(&self, r: &mut Race) {
        match self.r#type {
            HazardType::Unknown => Unknown(self.location).effect_track(r),
            HazardType::Slick => Slick(self.location).effect_track(r),
            HazardType::Creature => Creature(self.location).effect_track(r),
        }
    }
}

#[derive(Copy, Clone, Default)]
#[allow(unused)]
struct Unknown(f64);
impl Fallout for Unknown {
    fn effect_racer(&self, _r: &mut Racer) {}
    fn effect_track(&self, _r: &mut Race) {}
}
#[derive(Copy, Clone, Default)]
struct Slick(f64);
impl Fallout for Slick {
    fn effect_racer(&self, r: &mut Racer) {
        if self.0 < r.t && r.t < self.0 + 0.01 {
            todo!()
        }
    }
    fn effect_track(&self, _r: &mut Race) {}
}
#[derive(Copy, Clone, Default)]
struct Creature(f64);
impl Fallout for Creature {
    fn effect_racer(&self, r: &mut Racer) {
        if self.0 < r.t && r.t < self.0 + 0.01 {
            todo!()
        }
    }
    fn effect_track(&self, _r: &mut Race) {}
}
