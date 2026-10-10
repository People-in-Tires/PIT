use std::any::type_name;

use wasm_bindgen::prelude::*;

use crate::{
    js::random,
    racer::{Car, Chassis, EWheelType, Engine, Name, Spokes, Wheel},
};

pub trait Manufacturer {
    fn manufacture_car(&self) -> Car {
        let type_name = type_name::<Self>();
        let short_name = &type_name[type_name.rfind(':').unwrap() + 1..];
        Car {
            wheels: self.manufacture_wheels(),
            chassis: self.manufacture_chassis(),
            engine: self.manufacture_engine(),
            number: 0,
            manufacturer: Name::new(short_name).expect("never fails"),
        }
    }
    fn manufacture_wheels(&self) -> Spokes {
        Spokes {
            dextral_anterior: self.manufacture_wheel(),
            sinistral_anterior: self.manufacture_wheel(),
            dextral_posterior: self.manufacture_wheel(),
            sinistral_posterior: self.manufacture_wheel(),
        }
    }
    fn manufacture_wheel(&self) -> Wheel;
    fn manufacture_chassis(&self) -> Chassis;
    fn manufacture_engine(&self) -> Engine;
}

#[wasm_bindgen]
// mercedes // german
// baseline manufacturer
pub struct Misericordiae;
impl Manufacturer for Misericordiae {
    fn manufacture_wheel(&self) -> Wheel {
        let asbesticity = Wheel::default().asbesticity + (random() * 100.) as u16 - 50;
        Wheel {
            lubrication: random() / 2.,
            asbesticity,
            tethering_lo: Wheel::default().tethering_lo + (random() * 100.) as u16 - 50,
            tethering_hi: Wheel::default().tethering_hi + (random() * 100.) as u16 - 50,
            r#type: [EWheelType::Wet, EWheelType::Soft][(random() < 0.5) as usize],
            ..Wheel::default()
        }
    }

    fn manufacture_chassis(&self) -> Chassis {
        let tenderness = (random() * 20.) as u32 * 1000;
        let fuel_factor = (random() * 5.) as u32;
        Chassis {
            fuel: tenderness / if fuel_factor > 0 { fuel_factor } else { 1 },
            bulletlikeness: random(),
            squillagee: random(),
            stickiness: random(),
            tenderness,
            acidity: random(),
            ..Chassis::default()
        }
    }

    fn manufacture_engine(&self) -> Engine {
        Engine {
            stableity: random() / 10.,
            tuberculosis: (random() * 20.) as u32,
            explosivity: random() / 10.,
        }
    }
}
#[wasm_bindgen]
// aston martin // english
// cheating bastards
pub struct ClintonLionel;
impl Manufacturer for ClintonLionel {
    fn manufacture_wheel(&self) -> Wheel {
        let asbesticity = Wheel::default().asbesticity + (random() * 200.) as u16 - 100;
        Wheel {
            lubrication: random() / 2.,
            asbesticity,
            tethering_lo: Wheel::default().tethering_lo + (random() * 200.) as u16 - 100,
            tethering_hi: Wheel::default().tethering_hi + (random() * 200.) as u16 - 100,
            r#type: [EWheelType::Hard, EWheelType::Soft][(random() < 0.5) as usize],
            ..Wheel::default()
        }
    }

    fn manufacture_chassis(&self) -> Chassis {
        let tenderness = (random() * 20.) as u32 * 1000;
        let fuel_factor = (random() * 0.5) as u32; // what did bro mean by this
        Chassis {
            fuel: tenderness / if fuel_factor > 0 { fuel_factor } else { 1 },
            bulletlikeness: random(),
            squillagee: random(),
            stickiness: random(),
            tenderness,
            acidity: random(),
            ..Chassis::default()
        }
    }

    fn manufacture_engine(&self) -> Engine {
        Engine {
            stableity: random() / 7.,
            tuberculosis: (random() * 20.) as u32,
            explosivity: random() / 7.,
        }
    }
}
#[wasm_bindgen]
// audi // german
// simple, good, gets out of the way
pub struct Horsch;
impl Manufacturer for Horsch {
    fn manufacture_wheel(&self) -> Wheel {
        let asbesticity = Wheel::default().asbesticity + (random() * 50.) as u16;
        Wheel {
            lubrication: random() / 3.,
            asbesticity,
            tethering_lo: Wheel::default().tethering_lo + (random() * 50.) as u16,
            tethering_hi: Wheel::default().tethering_hi + (random() * 50.) as u16,
            r#type: EWheelType::Normal,
            ..Wheel::default()
        }
    }

    fn manufacture_chassis(&self) -> Chassis {
        let tenderness = (random() * 88.) as u32 * 500; // what did bro mean by this???
        let fuel_factor = (random() * 5.) as u32;
        Chassis {
            fuel: tenderness / if fuel_factor > 0 { fuel_factor } else { 1 },
            bulletlikeness: random(),
            squillagee: random(),
            stickiness: random(),
            tenderness,
            acidity: random(),
            ..Chassis::default()
        }
    }

    fn manufacture_engine(&self) -> Engine {
        Engine {
            stableity: random() / 9.,
            tuberculosis: (random() * 5.) as u32,
            explosivity: random() / 9.,
        }
    }
}
#[wasm_bindgen]
// fiat // italian
// fast, sleek, chug fuel like nothing else
pub struct Commodity;
impl Manufacturer for Commodity {
    fn manufacture_wheel(&self) -> Wheel {
        let asbesticity = Wheel::default().asbesticity + (random() * 100.) as u16 - 50;
        Wheel {
            lubrication: random() / 2.,
            asbesticity,
            tethering_lo: Wheel::default().tethering_lo + (random() * 100.) as u16 - 50,
            tethering_hi: Wheel::default().tethering_hi + (random() * 100.) as u16 - 50,
            r#type: [EWheelType::Hard, EWheelType::Normal][(random() < 0.5) as usize],
            ..Wheel::default()
        }
    }

    fn manufacture_chassis(&self) -> Chassis {
        let tenderness = (random() * 30.) as u32 * 1000;
        let fuel_factor = (random() * 3.) as u32;
        Chassis {
            fuel: tenderness / if fuel_factor > 0 { fuel_factor } else { 1 },
            bulletlikeness: random() / 5.,
            squillagee: (random() * 3.).clamp(0., 1.),
            stickiness: random() / 5.,
            tenderness,
            acidity: random() / 2.,
            ..Chassis::default()
        }
    }

    fn manufacture_engine(&self) -> Engine {
        Engine {
            stableity: random() / 5.,
            tuberculosis: (random() * 50.) as u32,
            explosivity: random() / 3.,
        }
    }
}
#[wasm_bindgen]
// alfa romeo // italian
// pregant?
pub struct OmegaJuliet;
impl Manufacturer for OmegaJuliet {
    fn manufacture_wheel(&self) -> Wheel {
        let asbesticity = Wheel::default().asbesticity + (random() * 10.) as u16 - 50;
        Wheel {
            lubrication: random() / 2.,
            asbesticity,
            tethering_lo: Wheel::default().tethering_lo + (random() * 10.) as u16 - 50,
            tethering_hi: Wheel::default().tethering_hi + (random() * 10.) as u16 - 50,
            r#type: [EWheelType::Wet, EWheelType::Hard][(random() < 0.5) as usize],
            ..Wheel::default()
        }
    }

    fn manufacture_chassis(&self) -> Chassis {
        let tenderness = (random() * 100.) as u32 * 1000;
        let fuel_factor = (random() * 2.) as u32;
        Chassis {
            fuel: tenderness / if fuel_factor > 0 { fuel_factor } else { 1 },
            bulletlikeness: (random() * 3.).clamp(0., 1.),
            squillagee: random() / 4.,
            stickiness: (random() * 3.).clamp(0., 1.),
            tenderness,
            acidity: (random() * 5.).clamp(0., 1.),
            ..Chassis::default()
        }
    }

    fn manufacture_engine(&self) -> Engine {
        Engine {
            stableity: random() / 10.,
            tuberculosis: (random() * 5.) as u32,
            explosivity: random() / 10.,
        }
    }
}
#[wasm_bindgen]
// what????
pub struct FatBikeMastersPuntNL;
impl Manufacturer for FatBikeMastersPuntNL {
    fn manufacture_wheel(&self) -> Wheel {
        let asbesticity = u16::MAX;
        Wheel {
            lubrication: 0.,
            asbesticity,
            tethering_lo: u16::MIN,
            tethering_hi: u16::MAX,
            r#type: EWheelType::Unknown,
            ..Wheel::default()
        }
    }

    fn manufacture_chassis(&self) -> Chassis {
        let tenderness = (random() * 20.) as u32 * 100;
        let fuel_factor = (random() * 5.) as u32;
        Chassis {
            fuel: tenderness / if fuel_factor > 0 { fuel_factor } else { 1 },
            bulletlikeness: random() / 2.,
            squillagee: random() / 2.,
            stickiness: random() / 2.,
            tenderness,
            acidity: 0.,
            ..Chassis::default()
        }
    }

    fn manufacture_engine(&self) -> Engine {
        Engine {
            stableity: random() / 10.,
            tuberculosis: (random() * 20.) as u32,
            explosivity: random() / 10.,
        }
    }
}
