use wasm_bindgen::prelude::*;

use crate::{js::random, race::Race, racer::Racer};

#[derive(Copy, Clone, Default)]
#[wasm_bindgen]
pub enum Weather {
    #[default]
    Sunny,
    Buggy,
    Laggy,
    CatsAndDogs,
    Thunderstorm,
}
impl Fallout for Weather {
    fn effect_racer(&self, r: &mut Racer)
    where
        Self: Sized,
    {
        match self {
            Weather::Sunny => Sunny {}.effect_racer(r),
            Weather::Buggy => Buggy {}.effect_racer(r),
            Weather::Laggy => Laggy {}.effect_racer(r),
            Weather::CatsAndDogs => CatsAndDogs {}.effect_racer(r),
            Weather::Thunderstorm => Thunderstorm {}.effect_racer(r),
        }
    }
    fn effect_track(&self, r: &mut Race)
    where
        Self: Sized,
    {
        match self {
            Weather::Sunny => Sunny {}.effect_track(r),
            Weather::Buggy => Buggy {}.effect_track(r),
            Weather::Laggy => Laggy {}.effect_track(r),
            Weather::CatsAndDogs => CatsAndDogs {}.effect_track(r),
            Weather::Thunderstorm => Thunderstorm {}.effect_track(r),
        }
    }
}

#[allow(unused)]
pub trait Fallout {
    fn effect_racer(&self, r: &mut Racer)
    where
        Self: Sized;
    fn effect_track(&self, r: &mut Race)
    where
        Self: Sized;
}

#[allow(unused)]
struct Sunny;
impl Fallout for Sunny {
    fn effect_racer(&self, _r: &mut Racer) {}
    fn effect_track(&self, _r: &mut Race) {}
}

#[allow(unused)]
struct Buggy;
impl Fallout for Buggy {
    fn effect_racer(&self, _r: &mut Racer) {}
    fn effect_track(&self, _r: &mut Race) {}
}

#[allow(unused)]
struct Laggy;
impl Fallout for Laggy {
    fn effect_racer(&self, _r: &mut Racer) {}
    fn effect_track(&self, _r: &mut Race) {}
}

#[allow(unused)]
struct CatsAndDogs;
impl Fallout for CatsAndDogs {
    fn effect_racer(&self, _r: &mut Racer) {}
    fn effect_track(&self, _r: &mut Race) {}
}

#[allow(unused)]
struct Thunderstorm;
impl Fallout for Thunderstorm {
    fn effect_racer(&self, r: &mut Racer) {
        if r.t == random() {
            r.driver.alive = false;
        }
    }
    fn effect_track(&self, _r: &mut Race) {}
}
