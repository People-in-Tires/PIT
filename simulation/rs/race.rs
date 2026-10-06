use crate::fallout::Fallout;
use crate::hazards::{EHazardType, Hazard};
use crate::js::*;
use crate::point::Point;
use crate::racer::{Driver, EWheelType, Racer, Wheel};
use crate::weather::EWeather;
use include_f64_matrix::*;
use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(Clone, Deserialize, Serialize)]
pub struct Race {
    pub(crate) racers: Vec<Racer>,
    pub(crate) track: Vec<Point>,
    pub(crate) track_points: Vec<Point>,
    pub weather: EWeather,
    pub duration: u64,
    pub(crate) hazards: Vec<Hazard>,
    pub(crate) messages: Vec<String>,
}

#[wasm_bindgen]
impl Race {
    pub(crate) fn update_racer_positions(&mut self) {
        for racer in &mut self.racers {
            let track_pos = Self::curve(&self.track_points, racer.t);
            racer.position =
                Self::normal(&self.track_points, racer.t) * racer.offset * 5. + track_pos;
        }
    }

    fn update_race(&mut self) {
        let weather = self.weather;
        weather.effect_track(self);
        for hazard in self.hazards() {
            hazard.effect_track(self)
        }
    }
    pub fn step(&mut self) {
        self.duration += 1;
        fn update_racer(
            track_points: &[Point],
            r: &mut Racer,
            weather: EWeather,
            msg: &mut Vec<String>,
            hazards: &mut Vec<Hazard>,
        ) {
            fn update_t(track_points: &[Point], r: &mut Racer, msg: &mut Vec<String>) {
                let accelerate = |r: &mut Racer| {
                    if r.car.chassis.fuel > 0 {
                        // TODO(add some bs for corners and slowing down or whatever)
                        r.speed = f64::min(
                            r.speed
                                + r.car.engine.explosivity
                                    * r.driver.ego.posterior_sensitivity
                                    * (1.0 - r.car.wheels.average_lubrication()),
                            r.car.engine.stableity * r.driver.ego.posterior_sensitivity,
                        );
                    } else {
                        r.speed *=
                            r.car.chassis.bulletlikeness * r.car.wheels.average_lubrication();
                    }
                };
                accelerate(r);

                let track_pos = Race::curve(track_points, r.t);
                let offset_pos = Race::normal(track_points, r.t) * r.offset + track_pos;
                let target = Race::curve(track_points, r.t + r.speed);
                let offset_bonus = {
                    let offset_bonus =
                        target.distance(&offset_pos) / target.distance(&track_pos) - 1.;
                    if !offset_bonus.is_normal() {
                        0.
                    } else {
                        offset_bonus
                    }
                };
                r.t = r.t + r.speed + offset_bonus / 2.0;
                if r.t >= 1.0 {
                    r.passed_go = true;
                    if r.should_pit {
                        r.t = 0.0;
                        r.speed = 0.0;
                        r.offset = 0.0;
                        r.in_pit = 0;
                        r.should_pit = false;
                        msg.push(format!(
                            "{} has drifted into the pit lane!",
                            r.driver.name()
                        ));
                    } else {
                        r.t %= 1.0
                    }
                } else {
                    r.passed_go = false;
                }
            }

            fn update_offset(r: &mut Racer) {
                r.offset = random() * 2. - 1.
            }

            fn update_conditions(
                r: &mut Racer,
                weather: EWeather,
                haz: &mut Vec<Hazard>,
                msg: &mut Vec<String>,
            ) {
                fn consume_fuel(r: &mut Racer) {
                    let chassis = &mut r.car.chassis;
                    let engine = &r.car.engine;
                    let burn_rate = (engine.tuberculosis as f64 * (2.0 - chassis.tightened)) as u32;
                    if burn_rate < chassis.fuel {
                        chassis.fuel -= burn_rate;
                    } else {
                        chassis.fuel = 0;
                        r.should_pit = true;
                    }
                }
                fn update_wear(
                    r: &mut Racer,
                    _weather: EWeather,
                    haz: &mut Vec<Hazard>,
                    msg: &mut Vec<String>,
                ) {
                    fn degrade_wheel(w: &mut Wheel) {
                        if w.wear >= 50 {
                            w.lubrication *= 1.0 + (w.wear - 50) as f64 / 100.0;
                        }
                    }
                    fn pit_wheel_predicate(w: Wheel, d: Driver) -> bool {
                        d.aggressiveness.recklessness
                            < (w.wear as f64 / 100.0) * d.aggressiveness.accounting
                    }
                    fn wheel_fall_off(w: &mut Wheel) -> bool {
                        if random() < (1.0 - w.tightened).powi(2) {
                            *w = Wheel {
                                wear: 0,
                                heat: Wheel::default().heat,
                                lubrication: 1.0,
                                asbesticity: u16::MAX,
                                tethering_lo: u16::MIN,
                                tethering_hi: u16::MAX,
                                tightened: 1.0,
                                r#type: EWheelType::Unknown,
                            };
                            true
                        } else {
                            false
                        }
                    }
                    let wheels = &mut r.car.wheels;

                    let base_rate: u8 = u8::max((r.car.chassis.acidity * r.speed * 100.) as u8, 1);
                    wheels.apply_to_tires(&|w: &mut Wheel| {
                        if u8::MAX - w.wear < base_rate {
                            w.wear = u8::MAX;
                        } else {
                            w.wear += base_rate
                        }
                    });
                    wheels.apply_to_tires(&degrade_wheel);
                    if wheels
                        .to_array()
                        .iter()
                        .any(|w| pit_wheel_predicate(**w, r.driver))
                    {
                        r.should_pit = true;
                    }
                    for _ in wheels.to_mut_array().iter_mut().map(|w| wheel_fall_off(w)) {
                        let random_offset = (random() * 2.0 - 1.0) * r.speed;
                        haz.push(Hazard {
                            location: r.t + random_offset,
                            r#type: EHazardType::Obstacle,
                        });
                        msg.push(format!("{}'s wheel drove away!", r.driver.name()));
                    }
                }
                fn update_heat(
                    r: &mut Racer,
                    weather: EWeather,
                    haz: &mut Vec<Hazard>,
                    msg: &mut Vec<String>,
                ) {
                    fn apply_heat(w: &mut Wheel, base_heat: u16) {
                        w.heat += (base_heat as f64 * (1.0 - w.lubrication)) as u16;
                    }
                    fn spontaenously_combust(
                        r: Racer,
                        w: &mut Wheel,
                        haz: &mut Vec<Hazard>,
                        msg: &mut Vec<String>,
                    ) -> bool {
                        if w.heat >= w.asbesticity {
                            haz.push(Hazard {
                                location: r.t,
                                r#type: EHazardType::Obstacle,
                            });
                            *w = Wheel {
                                wear: 0,
                                heat: Wheel::default().heat,
                                lubrication: 1.0,
                                asbesticity: u16::MAX,
                                tethering_lo: u16::MIN,
                                tethering_hi: u16::MAX,
                                tightened: 1.0,
                                r#type: EWheelType::Unknown,
                            };
                            msg.push(format!("{}'s wheel exploded!", r.driver.name()));
                            true
                        } else {
                            false
                        }
                    }
                    if r.speed > 0.0 {
                        let base_rate = r.speed * 100.;
                        let weather_mod = if weather == EWeather::Sunny { 1.5 } else { 1. };
                        let heat_rate = (base_rate * weather_mod) as u16;
                        let apply_current_heat = |w: &mut Wheel| apply_heat(w, heat_rate);
                        r.car.wheels.apply_to_tires(&apply_current_heat);
                    }
                    let racer_copy = *r;
                    for w in r.car.wheels.to_mut_array() {
                        if spontaenously_combust(racer_copy, w, haz, msg) {
                            r.should_pit = true;
                        }
                    }
                }
                fn apply_weather(r: &mut Racer, w: EWeather, msg: &mut Vec<String>) {
                    w.effect_racer(r, msg);
                }
                consume_fuel(r);
                update_wear(r, weather, haz, msg);
                update_heat(r, weather, haz, msg);
                apply_weather(r, weather, msg);
            }

            update_t(track_points, r, msg);
            update_offset(r);
            update_conditions(r, weather, hazards, msg);
        }
        for r in &mut self.racers {
            if r.in_pit == -1 {
                update_racer(
                    &self.track_points,
                    r,
                    self.weather,
                    &mut self.messages,
                    &mut self.hazards,
                );
            }
        }
        self.update_racer_positions();
        self.update_race()
    }

    fn curve(track_points: &[Point], t: f64) -> Point {
        track_points[(t * track_points.len() as f64) as usize % track_points.len()]
    }
    fn normal(track_points: &[Point], t: f64) -> Point {
        let t = (t * track_points.len() as f64) as usize;
        let behind = track_points[(t - 1) % track_points.len()];
        let ahead = track_points[(t + 1) % track_points.len()];
        let midpoint = Point {
            x: (behind.x + ahead.x) / 2.0,
            y: (behind.y + ahead.y) / 2.0,
        };
        Point {
            x: midpoint.x + (behind.y - midpoint.y),
            y: midpoint.y - (behind.x - midpoint.x),
        } - midpoint
    }
    pub fn generate_track_f64(points: Vec<f64>) -> Vec<f64> {
        let wrapped_points: Vec<Point> = Self::wrapping_control_points(
            points
                .chunks(2)
                .map(|pair| {
                    let (x, y): (f64, f64) = (pair[0], pair[1]);
                    Point { x, y }
                })
                .collect(),
        );
        wrapped_points.iter().flat_map(|p| [p.x, p.y]).collect()
    }
    #[allow(clippy::excessive_precision)] // numpy my beloathed
    pub fn wrapping_control_points(points: Vec<Point>) -> Vec<Point> {
        const OVERLAP_OFFSET: usize = 3;
        const INDEX_OFFSET: usize = 1;
        const N: u32 = 3;
        const INPUT_LEN: usize = 2usize.pow(N) + OVERLAP_OFFSET - INDEX_OFFSET;
        static MATRIX: [[f64; INPUT_LEN + 1]; 2500] = include_f64_matrix!("precomputed-matrix.txt");

        MATRIX.iter().fold(vec![], |mut acc, t| {
            acc.push(Point {
                x: t.iter()
                    .zip(points.iter().map(|x| x.x))
                    .fold(0 as f64, |acc, (t, x)| acc + t * x),
                y: t.iter()
                    .zip(points.iter().map(|x| x.y))
                    .fold(0 as f64, |acc, (t, y)| acc + t * y),
            });
            acc
        })
    }
}
