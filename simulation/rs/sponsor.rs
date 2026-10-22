use std::any::type_name;

use crate::{
    js::random,
    racer::{Aggressiveness, Driver, Ego, Name, Skill},
};
use rand::{rng, seq::IndexedRandom};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct ConcreteSponsor {
    sponsor: Box<dyn Sponsor>,
}

#[wasm_bindgen]
pub enum ESponsor {
    Random,
    BlueOx,
    HyperboreanSoulGoods,
    Dollar,
    YiranYipianJijing,
    SpectatorsKnownDiscussionSkiesStationary,
    Bol,
}

#[wasm_bindgen]
impl ConcreteSponsor {
    #[wasm_bindgen(constructor)]
    pub fn new(sponsor: ESponsor) -> ConcreteSponsor {
        match sponsor {
            ESponsor::Random => Self {
                sponsor: Box::new(RandomSponsor),
            },
            ESponsor::BlueOx => Self {
                sponsor: Box::new(BlueOx),
            },
            ESponsor::HyperboreanSoulGoods => Self {
                sponsor: Box::new(HyperboreanSoulGoods),
            },
            ESponsor::Dollar => Self {
                sponsor: Box::new(Dollar),
            },
            ESponsor::YiranYipianJijing => Self {
                sponsor: Box::new(YiranYipianJijing),
            },
            ESponsor::SpectatorsKnownDiscussionSkiesStationary => Self {
                sponsor: Box::new(SpectatorsKnownDiscussionSkiesStationary),
            },
            ESponsor::Bol => Self {
                sponsor: Box::new(Bol),
            },
        }
    }
    pub fn scout(&self) -> Driver {
        self.sponsor.scout()
    }
}

pub trait Sponsor {
    fn stems(&self) -> &[&str; 60] {
        const STEMS: [&str; 60] = [
            "marve",
            "arvid",
            "fleks",
            "nes",
            "magn",
            "hild",
            "mod",
            "er'n",
            "ola",
            "kari",
            "nord",
            "mann",
            "mary",
            "sue",
            "gary",
            "stu",
            "pihti",
            "putaan",
            "mum",
            "mo",
            "alice",
            "bob",
            "carol",
            "dave",
            "me",
            "del",
            "svens",
            "son",
            "홍",
            "길",
            "동",
            "전",
            "mateusz",
            "dorota",
            "kowalski",
            "nowak",
            "jean",
            "lefèvre",
            "giovanni",
            "ferrari",
            "hans",
            "schmidt",
            "kovács",
            "jános",
            "ivan",
            "kuznetsov",
            "sean",
            "mcgowan",
            "jan",
            "met",
            "de",
            "pet",
            "志",
            "明",
            "春",
            "嬌",
            "aam",
            "admi",
            "ashok",
            "kumar",
        ];
        &STEMS
    }
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
        let stems = self.stems();
        let name = stems.choose(&mut rng).unwrap().to_string() + *stems.choose(&mut rng).unwrap();
        Name::new(&name).unwrap_or_else(|_| panic!("failed to create random name: {}", name))
    }
    fn cultivate_skill(&self) -> Skill;
    fn cultivate_aggressiveness(&self) -> Aggressiveness;
    fn cultivate_ego(&self) -> Ego;
}

#[wasm_bindgen]
// red bull // austrian
pub struct BlueOx;
impl Sponsor for BlueOx {
    fn stems(&self) -> &[&str; 60] {
        const STEMS: [&str; 60] = [
            "max",
            "emillian",
            "ver",
            "stappen",
            "isack",
            "alexandre",
            "had",
            "jar",
            "liam",
            "jared",
            "law",
            "son",
            "yu",
            "ki",
            "tsun",
            "oda",
            "sergio",
            "michel",
            "perez",
            "mendoza",
            "alexander",
            "philippe",
            "albon",
            "ansusinha",
            "pierre",
            "jean",
            "jacque",
            "gasly",
            "daniel",
            "joseph",
            "ricci",
            "ardo",
            "daniil",
            "vyacheslav",
            "ovich",
            "kvyat",
            "sebas",
            "tian",
            "vet",
            "tel",
            "mark",
            "alan",
            "webb",
            "er",
            "david",
            "marshall",
            "coult",
            "hard",
            "robert",
            "michael",
            "doorn",
            "bos",
            "vitan",
            "tonio",
            "liu",
            "zzi",
            "chris",
            "tian",
            "kli",
            "en",
        ];
        &STEMS
    }
    fn cultivate_name(&self) -> Name<64> {
        let mut rng = rng();
        let stems = self.stems();
        let name = stems.choose(&mut rng).unwrap().to_string() + *stems.choose(&mut rng).unwrap();
        Name::new(&name).unwrap_or_else(|_| panic!("failed to create random name: {}", name))
    }
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
    fn stems(&self) -> &[&str; 60] {
        const STEMS: [&str; 60] = [
            "alb",
            "erto",
            "as",
            "cari",
            "juan",
            "manuel",
            "fan",
            "gio",
            "john",
            "michael",
            "haw",
            "thorn",
            "phillip",
            "toll",
            "hill",
            "jr.",
            "john",
            "normann",
            "sur",
            "tees",
            "andreas",
            "nikolaus",
            "niki",
            "lauda",
            "jody",
            "david",
            "scheck",
            "ter",
            "mic",
            "hael",
            "schu",
            "macher",
            "kimi",
            "matias",
            "räik",
            "könen",
            "charles",
            "marc",
            "hervé perce",
            "val leclerc",
            "sir lewis",
            "carl",
            "davidson",
            "hamilton",
            "antonio",
            "maria",
            "giovi",
            "nazzi",
            "ludo",
            "vico",
            "scar",
            "fiotti",
            "emilio",
            "giuseppe",
            "nino",
            "farina",
            "loren",
            "zo",
            "ban",
            "dini",
        ];
        &STEMS
    }
    fn cultivate_name(&self) -> Name<64> {
        let mut rng = rng();
        let stems = self.stems();
        let name = stems.choose(&mut rng).unwrap().to_string() + *stems.choose(&mut rng).unwrap();
        Name::new(&name).unwrap_or_else(|_| panic!("failed to create a random name: {}", name))
    }
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
    fn stems(&self) -> &[&str; 60] {
        const STEMS: [&str; 60] = [
            "di", "no", "began", "ovic", "rafael", "rafa", "chaves", "câmara", "tuukka", "matti",
            "samuli", "taponen", "no", "ah", "bag", "lin", "fil", "ippo", "sa", "la", "alba",
            "hurup", "lar", "sen", "nic", "colò", "macca", "gnani", "jules", "lucien", "andré",
            "bianchi", "oliver", "james", "bear", "man", "mi", "rko", "borto", "lotti", "brandon",
            "bruno", "raymond", "maïsano", "lance", "jacob", "strulo", "vitch", "raffaele",
            "lello", "mar", "ciello", "ant", "onio", "fuo", "co", "周", "冠", "guan", "yu",
        ];
        &STEMS
    }
    fn cultivate_name(&self) -> Name<64> {
        let mut rng = rng();
        let stems = self.stems();
        let name = stems.choose(&mut rng).unwrap().to_string() + *stems.choose(&mut rng).unwrap();
        Name::new(&name).unwrap_or_else(|_| panic!("failed to create a random name: {}", name))
    }
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
    fn stems(&self) -> &[&str; 60] {
        const STEMS: [&str; 60] = [
            "esteban",
            "josé",
            "ocon",
            "khelfane",
            "nico",
            "las",
            "hülken",
            "berg",
            "fernando",
            "alonzo",
            "dí",
            "az",
            "maurice",
            "bienvenu",
            "jean-paul",
            "trintignant",
            "roy",
            "francesco",
            "salva",
            "dori",
            "carroll",
            "hall",
            "shel",
            "by",
            "池",
            "newman",
            "振",
            "睿",
            "mat",
            "hilda",
            "pa",
            "atz",
            "josé",
            "maría",
            "navalón",
            "boya",
            "carlston",
            "jakston",
            "craw",
            "ford",
            "felipe",
            "drugo",
            "vich",
            "roncato",
            "tina",
            "larissa",
            "haus",
            "mann",
            "ro",
            "land",
            "na",
            "gy",
            "av",
            "a",
            "law",
            "rence",
            "nik",
            "las",
            "schauf",
            "ler",
        ];
        &STEMS
    }
    fn cultivate_name(&self) -> Name<64> {
        let mut rng = rng();
        let stems = self.stems();
        let name = stems.choose(&mut rng).unwrap().to_string() + *stems.choose(&mut rng).unwrap();
        Name::new(&name).unwrap_or_else(|_| panic!("failed to create a random name: {}", name))
    }
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
    fn stems(&self) -> &[&str; 60] {
        const STEMS: [&str; 60] = [
            "lan",
            "do",
            "nor",
            "ris",
            "oscar",
            "jack",
            "pi",
            "astri",
            "leo",
            "nardo",
            "forna",
            "roli",
            "patricio",
            "pato",
            "o'ward",
            "junco",
            "rich",
            "ard",
            "ver",
            "schoor",
            "grég",
            "oire",
            "matthieu",
            "saucy",
            "mat",
            "teo",
            "de",
            "paolo",
            "ella",
            "mai",
            "ll",
            "oyd",
            "dries",
            "van",
            "langen",
            "donck",
            "mika",
            "pauli",
            "häkk",
            "inen",
            "emer",
            "son",
            "fitti",
            "paldi",
            "james",
            "simon",
            "wallis",
            "hunt",
            "alain",
            "marie",
            "pascal",
            "prost",
            "ayrton",
            "senna",
            "da",
            "silva",
            "jenson",
            "alexander",
            "lyons",
            "button",
        ];
        &STEMS
    }
    fn cultivate_name(&self) -> Name<64> {
        let mut rng = rng();
        let stems = self.stems();
        let name = stems.choose(&mut rng).unwrap().to_string() + *stems.choose(&mut rng).unwrap();
        Name::new(&name).unwrap_or_else(|_| panic!("failed to create a random name: {}", name))
    }
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
    fn stems(&self) -> &[&str; 60] {
        const STEMS: [&str; 60] = [
            "an", "na", "jo", "hanna", "elisa", "beth", "adri", "ana", "hel", "ena", "l", "ena",
            "joa", "nna", "ma", "ria", "maa", "ike", "el", "s", "a", "nke", "fem", "ke", "miek",
            "e", "in", "grid", "mar", "ijke", "ja", "n", "hen", "drik", "pie", "ter", "wil", "lem",
            "jac", "ob", "di", "rk", "ar", "ie", "j", "ohan", "pi", "et", "ke", "es", "he", "nk",
            "jaa", "p", "je", "roen", "mar", "k", "joos", "t",
        ];
        &STEMS
    }
    fn cultivate_name(&self) -> Name<64> {
        let mut rng = rng();
        let stems = self.stems();
        let name = stems.choose(&mut rng).unwrap().to_string() + *stems.choose(&mut rng).unwrap();
        Name::new(&name).unwrap_or_else(|_| panic!("failed to create a random name: {}", name))
    }
    fn cultivate_skill(&self) -> Skill {
        let fingers = {
            let random = (random() * (u8::MAX as f64)) as u8;
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

#[wasm_bindgen]
pub struct RandomSponsor;
impl Sponsor for RandomSponsor {
    fn cultivate_name(&self) -> Name<64> {
        let mut rng = rng();
        let stems = {
            let base_stems = self.stems();
            let ox_stems = BlueOx.stems();
            let hsg_stems = HyperboreanSoulGoods.stems();
            let dollar_stems = Dollar.stems();
            let yyj_stems = YiranYipianJijing.stems();
            let skdss_stems = SpectatorsKnownDiscussionSkiesStationary.stems();
            let bol_stems = Bol.stems();
            let mut stems = [
                *base_stems,
                *ox_stems,
                *hsg_stems,
                *dollar_stems,
                *yyj_stems,
                *skdss_stems,
                *bol_stems,
            ]
            .concat();
            stems.sort();
            stems.dedup();
            stems
        };
        let name = stems.choose(&mut rng).unwrap().to_string() + *stems.choose(&mut rng).unwrap();
        Name::new(&name).unwrap_or_else(|_| panic!("failed to create a random name: {}", name))
    }
    fn cultivate_skill(&self) -> Skill {
        let fingers = {
            let random = (random() * (u8::MAX as f64)) as u8;
            if random > 10 { random } else { 10 }
        };
        Skill {
            closetedness: random(),
            procrastination: random(),
            fingers,
        }
    }
    fn cultivate_aggressiveness(&self) -> Aggressiveness {
        Aggressiveness {
            accounting: random(),
            recklessness: random(),
            sportsmanship: random(),
        }
    }
    fn cultivate_ego(&self) -> Ego {
        Ego {
            posterior_sensitivity: random(),
            mythomania: random(),
            skepticism: random(),
        }
    }
}
