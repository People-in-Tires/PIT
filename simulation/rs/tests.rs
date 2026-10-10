use super::*;

use crate::{
    manufacturer::{
        ClintonLionel, Commodity, FatBikeMastersPuntNL, Horsch, Manufacturer, Misericordiae,
        OmegaJuliet,
    },
    race::*,
    sponsor::{
        BlueOx, Bol, Dollar, HyperboreanSoulGoods, SpectatorsKnownDiscussionSkiesStationary,
        Sponsor, YiranYipianJijing,
    },
};
use include_f64_matrix::include_f64_matrix;

#[test]
fn wrapping_control_points() -> Result<(), String> {
    const EPSILON: f64 = 0.00000000000001;
    static REFERENCE_POINTS: [[f64; 2]; 2500] = include_f64_matrix!("points.py");
    const POINTS: [Point; 11] = [
        Point { x: 1.0, y: 2.0 },
        Point { x: 2.0, y: 3.0 },
        Point { x: 3.5, y: 2.0 },
        Point { x: 3.0, y: 10.0 },
        Point { x: 4.0, y: 10.0 },
        Point { x: 3.5, y: 2.0 },
        Point { x: 6.0, y: -12.0 },
        Point { x: 4.0, y: -5.0 },
        Point { x: 1.0, y: 2.0 },
        Point { x: 2.0, y: 3.0 },
        Point { x: 3.0, y: 2.0 },
    ];

    let reference: Vec<Point> = REFERENCE_POINTS
        .iter()
        .map(|v: &[f64; 2]| Point { x: v[0], y: v[1] })
        .collect();
    let actual: Vec<Point> = Race::wrapping_control_points(POINTS.into());
    if reference.len() != actual.len() {
        return Err(format!(
            "different amount of points between reference and actual result ({}, {})",
            reference.len(),
            actual.len()
        ));
    } else {
        for i in 0..reference.len() {
            if reference[i].distance(&actual[i]) > EPSILON {
                return Err(format!(
                    "difference between points on line {} is larger than {}: {} ({}, {})",
                    i,
                    EPSILON,
                    reference[i].distance(&actual[i]),
                    reference[i],
                    actual[i]
                ));
            }
        }
    }
    Ok(())
}
#[test]
fn driver_name() -> Result<(), String> {
    let mut r = racer::Driver::default();
    assert_eq!(r.name(), "Jessie Doe");
    assert_eq!(r.set_surname("Sigma"), Ok(()));
    assert_eq!(r.name(), "Jessie Sigma");
    assert_eq!(r.set_forename("John"), Ok(()));
    assert_eq!(r.set_forename(""), Ok(()));
    assert_eq!(r.name(), "[RADIO STATIC] Sigma");
    assert_eq!(r.set_surname(""), Ok(()));
    assert_eq!(r.name(), "[RADIO STATIC] [RADIO STATIC]");
    assert_eq!(
        r.set_forename(&"c".repeat(65)),
        Err(racer::ENameError::TooLong)
    );
    assert_eq!(
        r.set_surname(&"c".repeat(65)),
        Err(racer::ENameError::TooLong)
    );
    Ok(())
}

#[test]
fn type_name() -> Result<(), String> {
    // manufacturers
    assert_eq!(
        Misericordiae.manufacture_car().manufacturer(),
        "Misericordiae"
    );
    assert_eq!(
        ClintonLionel.manufacture_car().manufacturer(),
        "ClintonLionel"
    );
    assert_eq!(Horsch.manufacture_car().manufacturer(), "Horsch");
    assert_eq!(Commodity.manufacture_car().manufacturer(), "Commodity");
    assert_eq!(OmegaJuliet.manufacture_car().manufacturer(), "OmegaJuliet");
    assert_eq!(
        FatBikeMastersPuntNL.manufacture_car().manufacturer(),
        "FatBikeMastersPuntNL"
    );
    // sponsors
    assert_eq!(BlueOx.scout().sponsor(), "BlueOx");
    assert_eq!(
        HyperboreanSoulGoods.scout().sponsor(),
        "HyperboreanSoulGoods"
    );
    assert_eq!(Dollar.scout().sponsor(), "Dollar");
    assert_eq!(YiranYipianJijing.scout().sponsor(), "YiranYipianJijing");
    assert_eq!(
        SpectatorsKnownDiscussionSkiesStationary.scout().sponsor(),
        "SpectatorsKnownDiscussionSkiesStationary"
    );
    assert_eq!(Bol.scout().sponsor(), "Bol");
    Ok(())
}
