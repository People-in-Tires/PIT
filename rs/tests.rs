
use super::*;

#[test]
fn test_wrapping_control_points() -> Result<(), String> {
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
    let actual: Vec<Point> = wrapping_control_points(POINTS.into());
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
