use rand::{RngExt, rngs::ChaCha20Rng};
use simulation::{
    manufacturer::Manufacturer,
    racer::{Chassis, Racer, Wheel},
};

pub(crate) fn wheel_minigame(racer: &mut Racer, rng: &mut ChaCha20Rng) {
    fn fix_wheel(w: &mut Wheel, manufacturer: &dyn Manufacturer, rng: &mut ChaCha20Rng) {
        *w = Wheel {
            tightened: rng.random_range(0.0..=1.),
            ..manufacturer.manufacture_wheel()
        }
    }
    let manufacturer = racer.car.manufacturer();
    let spokes = &mut racer.car.wheels;
    for wheel in spokes.to_mut_array() {
        fix_wheel(wheel, &*manufacturer, rng)
    }
}

pub(crate) fn refuel_minigame(racer: &mut Racer, rng: &mut ChaCha20Rng) {
    let manufacturer = racer.car.get_manufacturer();
    let chassis = &mut racer.car.chassis;
    match manufacturer {
        val if val == "ClintonLionel" => {
            *chassis = Chassis {
                fuel: rng.random_range((chassis.tenderness / 2)..(chassis.tenderness * 2)),
                tightened_cap: rng.random_range(0.0..=1.),
                ..*chassis
            }
        }
        _ => {
            *chassis = Chassis {
                fuel: rng.random_range((chassis.tenderness / 4)..chassis.tenderness),
                tightened_cap: rng.random_range(0.0..=1.),
                ..*chassis
            };
        }
    }
}

pub(crate) fn litter_minigame(racer: &mut Racer, rng: &mut ChaCha20Rng) {
    let chassis = &mut racer.car.chassis;
    *chassis = Chassis {
        naughtiness: rng.random_range(0.0..=0.5),
        ..*chassis
    };
}

pub(crate) fn wing_minigame(racer: &mut Racer, rng: &mut ChaCha20Rng) {
    const MIN_ROT: f64 = -20.;
    const MAX_ROT: f64 = 0.;
    let chassis = &mut racer.car.chassis;
    *chassis = Chassis {
        stickiness: -rng.random_range(MIN_ROT..=MAX_ROT) / 20.,
        ..*chassis
    };
}
