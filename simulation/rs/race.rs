use crate::js::*;
use crate::point::Point;
use crate::racer::{Racer, Wheel};
use crate::weather::{Fallout, Weather};
use include_f64_matrix::*;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct Race {
    racers: Vec<Racer>,
    track: Vec<Point>,
    track_points: Vec<Point>,
    weather: Weather,
}

#[wasm_bindgen]
impl Race {
    #[wasm_bindgen(constructor)]
    pub fn new(racers: Vec<Racer>, track: Vec<Point>, weather: Weather) -> Race {
        let track_points = Self::wrapping_control_points(track.clone());
        let mut rv = Race {
            racers,
            track,
            track_points,
            weather,
        };
        rv.update_racer_positions();
        rv
    }

    fn update_racer_positions(&mut self) {
        for racer in &mut self.racers {
            let track_pos = Self::curve(&self.track_points, racer.t);
            racer.position =
                Self::normal(&self.track_points, racer.t) * racer.offset * 5. + track_pos;
        }
    }

    #[wasm_bindgen(getter)]
    pub fn racers(&self) -> Vec<Racer> {
        self.racers.clone()
    }
    #[wasm_bindgen(getter)]
    pub fn track(&self) -> Vec<Point> {
        self.track.clone()
    }
    #[wasm_bindgen(getter)]
    pub fn track_points(&self) -> Vec<Point> {
        self.track_points.clone()
    }
    pub fn step(&mut self) {
        fn update_racer(track_points: &[Point], r: &mut Racer, weather: Weather) {
            fn update_t(track_points: &[Point], r: &mut Racer) {
                let accelerate = |r: &mut Racer| {
                    if r.car.chassis.fuel > 0 {
                        // TODO(add some bs for corners and slowing down or whatever)
                        r.speed = f64::min(
                            r.speed + r.car.engine.explosivity * r.driver.ego.posterior_sensitivity,
                            r.car.engine.stableity,
                        );
                    } else {
                        r.speed *= r.car.chassis.bulletlikeness;
                    }
                };
                accelerate(r);

                let track_pos = Race::curve(track_points, r.t);
                let offset_pos = Race::normal(track_points, r.t) * r.offset + track_pos;
                let target = Race::curve(track_points, r.t + r.speed);
                let offset_bonus = target.distance(&offset_pos) / target.distance(&track_pos) - 1.;
                console_log!("offset_bonus: {}", offset_bonus);
                r.t = (r.t + r.speed + offset_bonus / 2.0) % 1.0
            }

            fn update_offset(r: &mut Racer) {
                r.offset = random() * 2. - 1.
            }

            fn update_conditions(r: &mut Racer, weather: Weather) {
                fn consume_fuel(r: &mut Racer) {
                    let chassis = &mut r.car.chassis;
                    let engine = &mut r.car.engine;
                    if engine.tuberculosis < chassis.fuel {
                        chassis.fuel -= engine.tuberculosis;
                    } else {
                        chassis.fuel = 0;
                        r.should_pit = true;
                    }
                }
                fn update_wear(r: &mut Racer) {
                    let base_rate: u8 = u8::max((r.car.chassis.acidity * r.speed * 100.) as u8, 1);
                    r.car
                        .wheels
                        .apply_to_tires(&|w: &mut Wheel| w.wear += base_rate);
                }
                fn update_heat(_r: &mut Racer) {
                    // TODO(implement heat somehow)
                }
                fn apply_weather(r: &mut Racer, w: Weather) {
                    w.effect_racer(r);
                }

                consume_fuel(r);
                update_wear(r);
                update_heat(r);
                apply_weather(r, weather);
            }

            update_t(track_points, r);
            update_offset(r);
            update_conditions(r, weather);
        }
        for r in &mut self.racers {
            update_racer(&self.track_points, r, self.weather);
        }
        self.update_racer_positions();
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
