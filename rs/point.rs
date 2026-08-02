use std::ops::{Add, Mul, Sub};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(Clone, Copy)]
pub struct Point {
    pub x: f64,
    pub y: f64,
}

#[wasm_bindgen]
impl Point {
    #[wasm_bindgen(constructor)]
    pub fn new(x: f64, y: f64) -> Point {
        Point { x, y }
    }

    #[wasm_bindgen(js_name = clone)]
    pub fn dup(&self) -> Point {
        *self
    }
    pub fn distance(&self, other: &Point) -> f64 {
        ((self.x - other.x).powi(2) + (self.y - other.y).powi(2)).sqrt()
    }
    pub fn add(&self, other: &Point) -> Point {
        Point {
            x: self.x + other.x,
            y: self.y + other.y,
        }
    }
}
impl Add for Point {
    type Output = Self;

    fn add(self, other: Self) -> Self {
        Self {
            x: self.x + other.x,
            y: self.y + other.y,
        }
    }
}
impl Add<&Point> for Point {
    type Output = Self;

    fn add(self, other: &Self) -> Self {
        Self {
            x: self.x + other.x,
            y: self.y + other.y,
        }
    }
}
impl Add<f64> for Point {
    type Output = Self;
    fn add(self, other: f64) -> Self {
        Self {
            x: self.x + other,
            y: self.y + other,
        }
    }
}
impl Sub for Point {
    type Output = Self;
    fn sub(self, other: Self) -> Self {
        Self {
            x: self.x - other.x,
            y: self.y - other.y,
        }
    }
}
impl Sub<&Point> for Point {
    type Output = Self;
    fn sub(self, other: &Self) -> Self {
        Self {
            x: self.x - other.x,
            y: self.y - other.y,
        }
    }
}
impl Sub<f64> for Point {
    type Output = Self;
    fn sub(self, other: f64) -> Self {
        Self {
            x: self.x - other,
            y: self.y - other,
        }
    }
}
impl Mul<f64> for Point {
    type Output = Self;
    fn mul(self, other: f64) -> Self {
        Self {
            x: self.x * other,
            y: self.y * other,
        }
    }
}
impl std::fmt::Display for Point {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        write!(f, "(x: {}, y: {})", self.x, self.y)
    }
}
