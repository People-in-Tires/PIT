use crate::{fallout::Fallout, js::random, race::Race, racer::Racer};
use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

const EPSILON: f64 = 0.01;

#[wasm_bindgen]
#[derive(Copy, Clone, Default, Serialize, Deserialize)]
pub struct Hazard {
    // some value T, we probably dont care for offset here
    pub location: f64,
    pub r#type: EHazardType,
}

#[wasm_bindgen]
#[derive(Copy, Clone, Default, Serialize, Deserialize)]
pub enum EHazardType {
    #[default]
    Unknown,
    Slick,
    Creature,
    Obstacle,
}

impl Fallout for Hazard {
    fn effect_racer(&self, r: &mut Racer, msg: &mut Vec<String>) {
        match self.r#type {
            EHazardType::Unknown => Unknown(self.location).effect_racer(r, msg),
            EHazardType::Slick => Slick(self.location).effect_racer(r, msg),
            EHazardType::Creature => Creature(self.location).effect_racer(r, msg),
            EHazardType::Obstacle => Obstacle(self.location).effect_racer(r, msg),
        }
    }

    fn effect_track(&self, r: &mut Race) {
        match self.r#type {
            EHazardType::Unknown => Unknown(self.location).effect_track(r),
            EHazardType::Slick => Slick(self.location).effect_track(r),
            EHazardType::Creature => Creature(self.location).effect_track(r),
            EHazardType::Obstacle => Obstacle(self.location).effect_track(r),
        }
    }
}

#[derive(Copy, Clone, Default)]
#[allow(unused)]
struct Unknown(f64);
impl Fallout for Unknown {
    fn effect_racer(&self, _r: &mut Racer, _msg: &mut Vec<String>) {}
    fn effect_track(&self, _r: &mut Race) {}
}
#[derive(Copy, Clone, Default)]
struct Slick(f64);
impl Fallout for Slick {
    fn effect_racer(&self, r: &mut Racer, msg: &mut Vec<String>) {
        if self.0 < r.t && r.t < self.0 + EPSILON {
            msg.push(format!("{} hit a spot of slick!", r.driver.name()));
        }
    }
    fn effect_track(&self, _r: &mut Race) {}
}
#[derive(Copy, Clone, Default)]
struct Creature(f64);
impl Fallout for Creature {
    fn effect_racer(&self, r: &mut Racer, msg: &mut Vec<String>) {
        const ALIVE_DECREMENT: f64 = 0.05;
        if self.0 < r.t && r.t < self.0 + EPSILON {
            r.driver.alive -= ALIVE_DECREMENT;
            r.car.chassis.naughtiness += random() - r.car.chassis.squillagee;
            msg.push(format!("{} hit a creature!", r.driver.name()));
        }
    }
    fn effect_track(&self, _r: &mut Race) {}
}

#[derive(Copy, Clone, Default)]
struct Obstacle(f64);
impl Fallout for Obstacle {
    fn effect_racer(&self, r: &mut Racer, msg: &mut Vec<String>) {
        const DELTA: f64 = 0.05;
        const ALIVE_DECREMENT: f64 = 0.1;
        if self.0 < r.t && r.t < self.0 + EPSILON {
            r.car.chassis.naughtiness += random() - r.car.chassis.squillagee;
            r.speed -= DELTA;
            r.driver.alive -= ALIVE_DECREMENT;
            msg.push(format!("{} hit an obstacle on the track!", r.driver.name()));
        }
    }

    fn effect_track(&self, _r: &mut Race) {}
}
