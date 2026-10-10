use std::any::type_name;

use rand::{rng, seq::IndexedRandom};
use wasm_bindgen::prelude::*;

use crate::{
    js::random,
    racer::{Aggressiveness, Driver, Ego, Name, Skill},
};

pub trait Sponsor {
    fn scout(&self) -> Driver {
        let type_name = type_name::<Self>();
        let short_name = &type_name[type_name.rfind(':').unwrap() + 1..];
        Driver {
            skill: self.cultivate_skill(),
            aggressiveness: self.cultivate_aggressiveness(),
            ego: self.cultivate_ego(),
            alive: 1.,
            forename: self.cultivate_name(),
            surname: self.cultivate_name(),
            sponsor: Name::new(short_name).expect("never fails"),
        }
    }
    fn cultivate_name(&self) -> Name<64> {
        let mut rng = rng();
        let stems: &[&'static str] = &["max", "imillian", "ver", "stappen"];
        Name::new(&(stems.choose(&mut rng).unwrap().to_string() + *stems.choose(&mut rng).unwrap()))
            .unwrap()
    }
    fn cultivate_skill(&self) -> Skill;
    fn cultivate_aggressiveness(&self) -> Aggressiveness;
    fn cultivate_ego(&self) -> Ego;
}

#[wasm_bindgen]
// red bull // austrian
pub struct BlueOx;
impl Sponsor for BlueOx {
    fn cultivate_skill(&self) -> Skill {
        let fingers = {
            let random = (random() * 20.) as u8;
            if random > 10 { random } else { 10 }
        };
        Skill {
            closetedness: random(),
            procrastination: (random() * 5.).clamp(0., 1.),
            fingers,
        }
    }

    fn cultivate_aggressiveness(&self) -> Aggressiveness {
        Aggressiveness {
            accounting: random() * 0.1,
            recklessness: random() / 2. + 0.5,
            sportsmanship: random() / 2.,
        }
    }

    fn cultivate_ego(&self) -> Ego {
        Ego {
            posterior_sensitivity: random() / 2. + 0.5,
            mythomania: random() / 3. + 0.666,
            skepticism: random() / 5. + 0.8,
        }
    }
}
#[wasm_bindgen]
// AWS // american
pub struct HyperboreanSoulGoods;
impl Sponsor for HyperboreanSoulGoods {
    fn cultivate_skill(&self) -> Skill {
        let fingers = {
            let random = (random() * 30.) as u8;
            if random > 10 { random } else { 10 }
        };
        Skill {
            closetedness: random() / 5., // probably, but i got a job to do so idc
            procrastination: 0.,         // piss bottles
            fingers,
        }
    }

    fn cultivate_aggressiveness(&self) -> Aggressiveness {
        Aggressiveness {
            accounting: random() / 3. + 0.333,
            recklessness: random(),
            sportsmanship: random() / 2.,
        }
    }

    fn cultivate_ego(&self) -> Ego {
        Ego {
            posterior_sensitivity: random() / 4. + 0.5,
            mythomania: random() / 5. + 0.6,
            skepticism: random(),
        }
    }
}
#[wasm_bindgen]
// Shell // english
pub struct Dollar;
impl Sponsor for Dollar {
    fn cultivate_skill(&self) -> Skill {
        let fingers = {
            let random = (random() * 100.) as u8;
            if random > 10 { random } else { 10 }
        };
        Skill {
            closetedness: random(),
            procrastination: random() / 5.,
            fingers,
        }
    }

    fn cultivate_aggressiveness(&self) -> Aggressiveness {
        Aggressiveness {
            accounting: 1.,
            recklessness: random() / 2. + 0.25,
            sportsmanship: random() / 5.,
        }
    }

    fn cultivate_ego(&self) -> Ego {
        Ego {
            posterior_sensitivity: random(),
            mythomania: random() / 2. + 0.5,
            skepticism: random(),
        }
    }
}
#[wasm_bindgen]
// tiktok // chinese // i took Douyin (vibrating sound), flipped it
// (still silence) and then google translated it to chinese
pub struct YiranYipianJijing;
impl Sponsor for YiranYipianJijing {
    fn cultivate_skill(&self) -> Skill {
        let fingers = {
            let random = (random() * 15.) as u8;
            if random > 10 { random } else { 10 }
        };
        Skill {
            closetedness: random() / 4., // being queer is a positive in the current media landscape
            // or something. idk, its late i want to go home leave me alone
            procrastination: random() / 4. + 0.5, // jobless behaviour
            fingers,
        }
    }

    fn cultivate_aggressiveness(&self) -> Aggressiveness {
        Aggressiveness {
            accounting: random(),
            recklessness: random() / 4.,  // im going to self-unalive
            sportsmanship: random() / 4., // have you seen the website?
        }
    }

    fn cultivate_ego(&self) -> Ego {
        Ego {
            posterior_sensitivity: random() / 3. + 0.666, // they literally only sit on their ass all
            // day
            mythomania: random() / 10. + 0.9, // yea
            skepticism: random(),
        }
    }
}
#[wasm_bindgen]
// Players Unknown Battle Grounds Mobile // South Korean
pub struct SpectatorsKnownDiscussionSkiesStationary;
impl Sponsor for SpectatorsKnownDiscussionSkiesStationary {
    fn cultivate_skill(&self) -> Skill {
        let fingers = {
            let random = (random() * 104.) as u8;
            if random > 10 { random } else { 10 }
        };
        Skill {
            closetedness: random() / 2. + 0.5,
            procrastination: random() / 3.,
            fingers,
        }
    }

    fn cultivate_aggressiveness(&self) -> Aggressiveness {
        Aggressiveness {
            accounting: random() / 3. + 0.5,
            recklessness: random() / 4. + 0.5,
            sportsmanship: random() / 3.,
        }
    }

    fn cultivate_ego(&self) -> Ego {
        Ego {
            posterior_sensitivity: random() / 3. + 0.666,
            mythomania: random() / 2. + 0.25,
            skepticism: random() / 2. + 0.25,
        }
    }
}
#[wasm_bindgen]
pub struct Bol;
impl Sponsor for Bol {
    fn cultivate_skill(&self) -> Skill {
        let fingers = {
            let random = (random() * 255.) as u8;
            if random > 10 { random } else { 10 }
        };
        Skill {
            closetedness: random(),
            procrastination: random() / 4. + 0.75,
            fingers,
        }
    }

    fn cultivate_aggressiveness(&self) -> Aggressiveness {
        Aggressiveness {
            accounting: random() / 3.,
            recklessness: random() / 3.,
            sportsmanship: random(),
        }
    }

    fn cultivate_ego(&self) -> Ego {
        Ego {
            posterior_sensitivity: random(),
            mythomania: random() / 2. + 0.25,
            skepticism: random(),
        }
    }
}
