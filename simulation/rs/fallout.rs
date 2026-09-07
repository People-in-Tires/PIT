use crate::{race::Race, racer::Racer};

pub trait Fallout {
    fn effect_racer(&self, r: &mut Racer)
    where
        Self: Sized;
    fn effect_track(&self, r: &mut Race)
    where
        Self: Sized;
}
