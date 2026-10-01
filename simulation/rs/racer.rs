use crate::Point;
use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

#[derive(Default)]
#[wasm_bindgen]
#[derive(Copy, Clone, Serialize, Deserialize)]
pub enum WheelType {
    #[default]
    Unknown = "",
    Gnome = "gnome",
    Ski = "ski",
    Rock = "rock",
}

#[derive(Copy, Clone, Serialize, Deserialize)]
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
impl Default for Wheel {
    fn default() -> Self {
        Self {
            wear: 0,
            heat: 273,
            lubrication: 0.5,
            asbesticity: 423,
            tethering_lo: 348,
            tethering_hi: 398,
            r#type: WheelType::Unknown,
        }
    }
}

#[derive(Copy, Clone, Default, Serialize, Deserialize)]
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
impl Spokes {
    pub fn apply_to_tires(&mut self, f: &dyn Fn(&mut Wheel)) {
        f(&mut self.dextral_anterior);
        f(&mut self.sinistral_anterior);
        f(&mut self.dextral_posterior);
        f(&mut self.sinistral_posterior);
    }
}

#[derive(Copy, Clone, Serialize, Deserialize)]
#[wasm_bindgen]
pub struct Chassis {
    pub fuel: u32,
    /// drag
    pub bulletlikeness: f64,
    /// weather buildup
    pub naughtiness: f64,
    /// weather resistance
    pub squillagee: f64,
    /// downforce
    pub stickiness: f64,
    /// fuel capacity
    pub tenderness: u32,
    /// tyre degradation rate
    pub acidity: f64,
}
impl Default for Chassis {
    fn default() -> Self {
        Self {
            bulletlikeness: 0.5,
            naughtiness: 0.,
            squillagee: 0.5,
            stickiness: 0.5,
            tenderness: 100 * 1000,
            fuel: 100 * 1000,
            acidity: 0.5, // 5 wear / tick
        }
    }
}

#[derive(Copy, Clone, Serialize, Deserialize)]
#[wasm_bindgen]
pub struct Engine {
    /// top speed
    pub stableity: f64,
    /// fuel consumption
    pub tuberculosis: u32,
    /// acceleration
    pub explosivity: f64,
}
impl Default for Engine {
    fn default() -> Self {
        Self {
            stableity: 0.1,
            tuberculosis: 10,
            explosivity: 0.05,
        }
    }
}

#[wasm_bindgen]
#[derive(Copy, Clone, Default, Serialize, Deserialize)]
pub struct Car {
    pub wheels: Spokes,
    pub chassis: Chassis,
    pub engine: Engine,
}

#[wasm_bindgen]
#[derive(Copy, Clone, Serialize, Deserialize)]
pub struct Skill {
    /// speed modifier on straightaways
    pub closetedness: f64,
    /// how tight a corner they drive
    pub procrastination: f64,
    /// max turn angle (min 10)
    pub fingers: u8,
}
impl Default for Skill {
    fn default() -> Self {
        Self {
            closetedness: 0.5,
            procrastination: 0.5,
            fingers: 10,
        }
    }
}

#[wasm_bindgen]
#[derive(Copy, Clone, Serialize, Deserialize)]
pub struct Aggressiveness {
    /// how much attention they pay to the car's condition
    pub accounting: f64,
    /// tolerance for driving in shit conditions
    pub recklessness: f64,
    /// willingness to actively sabotage other players
    pub sportsmanship: f64,
}
impl Default for Aggressiveness {
    fn default() -> Self {
        Self {
            accounting: 0.5,
            recklessness: 0.5,
            sportsmanship: 0.5,
        }
    }
}

#[wasm_bindgen]
#[derive(Copy, Clone, Serialize, Deserialize)]
pub struct Ego {
    /// ability to make use of car's capabilities // multiply all car stats with this????
    pub posterior_sensitivity: f64,
    /// propensity to inflate stats
    pub mythomania: f64,
    /// chance to _not_ listen to PIT crew
    pub skepticism: f64,
}
impl Default for Ego {
    fn default() -> Self {
        Self {
            posterior_sensitivity: 0.5,
            mythomania: 0.5,
            skepticism: 0.5,
        }
    }
}

#[wasm_bindgen]
#[derive(Debug, PartialEq, Eq, Copy, Clone)]
pub enum NameError {
    TooLong,
}
#[derive(Copy, Clone, Serialize, Deserialize)]
struct Name<const N: usize> {
    #[serde(with = "serde_arrays")]
    arr: [char; N],
}
impl<const N: usize> Default for Name<N> {
    fn default() -> Self {
        Self { arr: ['\0'; N] }
    }
}
impl<const N: usize> Name<N> {
    pub fn new(name: &str) -> Result<Self, NameError> {
        let mut rv = Name::default();
        rv.set(name)?;
        Ok(rv)
    }
    fn set_prefix(&mut self, prefix: &[char]) -> Option<()> {
        if prefix.len() > N {
            None
        } else {
            let slice = &mut self.arr[..prefix.len()];
            slice.copy_from_slice(prefix);
            Some(())
        }
    }
    fn set(&mut self, name: &str) -> Result<(), NameError> {
        match name.trim() {
            s if s.len() > N => Err(NameError::TooLong),
            mut s => {
                if s.is_empty() {
                    s = "[RADIO STATIC]";
                }
                let mut name: Name<N> = Name { arr: ['\0'; N] };
                name.set_prefix(s.chars().collect::<Vec<char>>().as_slice());
                *self = name;
                Ok(())
            }
        }
    }
}

#[wasm_bindgen]
#[derive(Copy, Clone, Serialize, Deserialize)]
pub struct Driver {
    pub skill: Skill,
    pub aggressiveness: Aggressiveness,
    pub ego: Ego,
    pub alive: f64,
    forename: Name<64>,
    surname: Name<64>,
}

impl Default for Driver {
    fn default() -> Self {
        const FORENAME: &str = "Jessie";
        const SURNAME: &str = "Doe";

        Self {
            skill: Default::default(),
            aggressiveness: Default::default(),
            ego: Default::default(),
            alive: 1.,
            forename: Name::new(FORENAME).expect("Could not create forename"),
            surname: Name::new(SURNAME).expect("Could not create surname"),
        }
    }
}

#[wasm_bindgen]
impl Driver {
    #[wasm_bindgen(getter)]
    pub fn name(&self) -> String {
        format!(
            "{} {}",
            self.forename
                .arr
                .iter()
                .filter(|c| **c != '\0')
                .collect::<String>(),
            self.surname
                .arr
                .iter()
                .filter(|c| **c != '\0')
                .collect::<String>()
        )
    }
    #[wasm_bindgen]
    pub fn set_forename(&mut self, forename: &str) -> Result<(), NameError> {
        self.forename.set(forename)
    }
    #[wasm_bindgen]
    pub fn set_surname(&mut self, surname: &str) -> Result<(), NameError> {
        self.surname.set(surname)
    }
}

#[derive(Copy, Clone, Serialize, Deserialize)]
#[wasm_bindgen]
pub struct Racer {
    pub t: f64,
    pub offset: f64,
    pub position: Point,
    pub speed: f64,
    pub driver: Driver,
    pub car: Car,
    pub in_pit: i32,
    pub should_pit: bool,
}

#[wasm_bindgen]
impl Racer {
    #[wasm_bindgen(constructor)]
    pub fn new(t: f64, offset: f64) -> Self {
        Self {
            t,
            offset,
            position: Point::default(),
            speed: 0f64,
            car: Car::default(),
            driver: Driver::default(),
            in_pit: -1,
            should_pit: false,
        }
    }
    #[allow(clippy::wrong_self_convention)]
    #[wasm_bindgen]
    pub fn to_json(&self) -> String {
        serde_json::to_string(self).unwrap()
    }
    #[wasm_bindgen]
    pub fn from_json(json: &str) -> Option<Self> {
        serde_json::from_str(json).ok()
    }
}

impl Default for Racer {
    fn default() -> Self {
        Self::new(0., 0.)
    }
}
