use crate::Point;
use wasm_bindgen::prelude::*;

#[derive(Copy, Clone, Default)]
#[wasm_bindgen]
pub enum WheelType {
    #[default]
    Unknown = "",
    Gnome = "gnome",
    Ski = "ski",
    Rock = "rock",
}

#[derive(Copy, Clone, Default)]
#[wasm_bindgen]
pub struct Wheel {
    pub wear: u8,
    /// measured in Kelvin
    pub heat: u16,
    /// ground friction
    pub lubrication: f64,
    /// heat capacity
    pub asbesticity: u16,
    /// hotspot lower bound
    pub tethering_lo: u16,
    /// hotspot lower bound
    pub tethering_hi: u16,
    pub r#type: WheelType,
}

#[derive(Copy, Clone, Default)]
#[wasm_bindgen]
pub struct Spokes {
    /// front-right
    pub dextral_anterior: Wheel,
    /// front-left
    pub sinistral_anterior: Wheel,
    /// back-right
    pub dextral_posterior: Wheel,
    /// back-left
    pub sinistral_posterior: Wheel,
}

#[derive(Copy, Clone, Default)]
#[wasm_bindgen]
pub struct Chassis {
    pub fuel: u32,
    /// drag
    pub bulletlikeness: f64,
    /// weather resistance
    pub squillagee: f64,
    /// downforce
    pub stickiness: f64,
    /// fuel capacity
    pub tenderness: u32,
    /// tyre degradation rate
    pub acidity: f64,
}
#[derive(Copy, Clone, Default)]
#[wasm_bindgen]
pub struct Engine {
    /// top speed
    pub stableity: f64,
    /// fuel consumption
    pub tuberculosis: u32,
    /// acceleration
    pub explosivity: f64,
}

#[wasm_bindgen]
#[derive(Copy, Clone, Default)]
pub struct Car {
    pub wheels: Spokes,
    pub chassis: Chassis,
    pub engine: Engine,
}

#[wasm_bindgen]
#[derive(Copy, Clone, Default)]
pub struct Skill {
    /// speed modifier on straightaways
    pub closetedness: f64,
    /// how tight a corner they drive
    pub procrastination: f64,
    /// max turn angle (min 10)
    pub fingers: u8,
}

#[wasm_bindgen]
#[derive(Copy, Clone, Default)]
pub struct Aggressiveness {
    /// how much attention they pay to the car's condition
    pub accounting: f64,
    /// tolerance for driving in shit conditions
    pub recklessness: f64,
    /// willingness to actively sabotage other players
    pub sportsmanship: f64,
}

#[wasm_bindgen]
#[derive(Copy, Clone, Default)]
pub struct Ego {
    /// ability to make use of car's capabilities // multiply all car stats with this????
    pub posterior_sensitivity: f64,
    /// propensity to inflate stats
    pub mythomania: f64,
    /// chance to _not_ listen to PIT crew
    pub skepticism: f64,
}

#[wasm_bindgen]
#[derive(Copy, Clone, Default)]
pub struct Driver {
    pub skill: Skill,
    pub aggressiveness: Aggressiveness,
    pub ego: Ego,
}

#[derive(Copy, Clone)]
#[wasm_bindgen]
pub struct Racer {
    pub t: f64,
    pub offset: f64,
    pub position: Point,
    pub speed: f64,
    pub acceleration: f64,
    pub driver: Driver,
    pub car: Car,
}

#[wasm_bindgen]
impl Racer {
    #[wasm_bindgen(constructor)]
    pub fn new(t: f64, offset: f64) -> Self {
        Self {
            t,
            offset,
            position: Point { x: 0.0, y: 0.0 },
            speed: 0f64,
            acceleration: 0.1,
            car: Car::default(),
            driver: Driver::default(),
        }
    }
}

impl Default for Racer {
    fn default() -> Self {
        Self::new(0., 0.)
    }
}
