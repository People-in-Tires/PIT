use crate::{fallout::Fallout, js::random, race::Race, racer::Racer};
use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

const EPSILON: f64 = 0.005;

#[wasm_bindgen]
#[derive(Copy, Clone, Default, Serialize, Deserialize)]
pub struct Hazard {
    // some value T, we probably dont care for offset here
    pub location: f64,
    pub r#type: EHazardType,
}

impl PartialEq for Hazard {
    fn eq(&self, other: &Self) -> bool {
        self.r#type == other.r#type
            && self.location - EPSILON / 2. < other.location
            && other.location < self.location + EPSILON / 2.
    }
}
impl Eq for Hazard {}

impl PartialOrd for Hazard {
    fn partial_cmp(&self, other: &Self) -> Option<std::cmp::Ordering> {
        Some(self.cmp(other))
    }
}
impl Ord for Hazard {
    fn cmp(&self, other: &Self) -> std::cmp::Ordering {
        match self.r#type.cmp(&other.r#type) {
            core::cmp::Ordering::Equal => f64::total_cmp(&self.location, &other.location),
            ord => ord,
        }
    }
}

#[wasm_bindgen]
#[derive(Copy, Clone, PartialEq, Eq, PartialOrd, Ord, Default, Serialize, Deserialize)]
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
            r.car.chassis.naughtiness =
                (r.car.chassis.naughtiness + random() - r.car.chassis.squillagee).clamp(0., 1.);
            msg.push(format!("{} hit a creature!", r.driver.name()));
        }
    }
    fn effect_track(&self, _r: &mut Race) {}
}

#[derive(Copy, Clone, Default)]
struct Obstacle(f64);
impl Fallout for Obstacle {
    fn effect_racer(&self, r: &mut Racer, msg: &mut Vec<String>) {
        const SLOW_FACTOR: f64 = 0.50;
        const ALIVE_DECREMENT: f64 = 0.1;
        if self.0 < r.t && r.t < self.0 + EPSILON {
            r.car.chassis.naughtiness =
                (r.car.chassis.naughtiness + random() - r.car.chassis.squillagee).clamp(0., 1.);
            if r.speed > 0. {
                r.speed *= SLOW_FACTOR;
            }
            r.driver.alive -= ALIVE_DECREMENT;
            msg.push(format!("{} hit an obstacle on the track!", r.driver.name()));
        }
    }

    fn effect_track(&self, _r: &mut Race) {}
}
