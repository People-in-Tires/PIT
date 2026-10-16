use std::{fs::File, time::Duration};

use simulation::race::Race;
use sqlx::{
    Database, Pool, Postgres, pool::PoolOptions, postgres::PgQueryResult, types::JsonValue,
};

use crate::program_utilities::get_config;

pub(crate) async fn get_pool<T: Database>(url: &str) -> Result<Pool<T>, sqlx::Error> {
    PoolOptions::<T>::new()
        .max_connections(5)
        .acquire_timeout(Duration::from_secs(3))
        .idle_timeout(Duration::from_secs(10))
        .connect(url)
        .await
}

#[derive(Debug)]
pub(crate) enum GetRaceStateError {
    Sqlx(sqlx::Error),
    InvalidState,
}
impl From<sqlx::Error> for GetRaceStateError {
    fn from(value: sqlx::Error) -> Self {
        Self::Sqlx(value)
    }
}

pub(crate) async fn get_race_states(
    pool: &Pool<Postgres>,
    backup_file: &str,
) -> Result<Vec<Race>, GetRaceStateError> {
    let ids: i64 = sqlx::query_as::<_, (i64,)>("SELECT COUNT(DISTINCT raceId) FROM racestate")
        .fetch_one(pool)
        .await?
        .0;
    if ids == 0 {
        Ok(vec![get_config(
            &mut File::open(backup_file)
                .unwrap_or_else(|_| panic!("Could not open file {}", backup_file)),
        )])
    } else {
        let mut races = vec![];
        for id in 0..ids {
            let json: String = sqlx::query_as::<_, (JsonValue,)>(
                "SELECT state FROM racestate WHERE raceId = $1 ORDER BY timestamp DESC LIMIT 1",
            )
            .bind(id)
            .fetch_one(pool)
            .await?
            .0
            .to_string();
            races.push(Race::from_json(json).map_err(|_| GetRaceStateError::InvalidState)?);
        }
        Ok(races)
    }
}

pub(crate) async fn push_states(
    pool: &Pool<Postgres>,
    races: &[Race],
) -> Result<Vec<PgQueryResult>, sqlx::Error> {
    let mut rv = vec![];
    for (i, race) in races.iter().enumerate() {
        rv.push(
            sqlx::query("INSERT INTO racestate VALUES (DEFAULT, $1, $2)")
                .bind(i as i64)
                .bind(sqlx::types::JsonValue::from(race.to_json()))
                .execute(pool)
                .await?,
        );
    }
    Ok(rv)
}

pub(crate) struct Announcer<'a> {
    username: &'a str,
    name: &'a str,
    country: &'a str,
    date: chrono::NaiveDate,
    email: &'a str,
    password_hash: &'a str,
    id: &'a str,
}

pub(crate) const ANNOUNCER: Announcer = Announcer {
    username: "TheAnnouncer",
    name: "Parker MacMillan IIIIII",
    country: "Ȝ",
    date: chrono::NaiveDate::from_ymd_opt(0, 1, 1).unwrap(),
    email: "p.macmillan6@pit.crew",
    password_hash: "iLoveBlaseball",
    id: "1", // this isnt silly, wdym
};

pub(crate) async fn create_announcer(pool: &Pool<Postgres>) -> Result<String, sqlx::Error> {
    let a = ANNOUNCER;
    let _ = sqlx::query(
        "INSERT INTO users
            (id, username, name, country, birthday, email, \"passwordHash\")
        VALUES
            ($7, $1, $2, $3, $4, $5, $6)
        ON CONFLICT DO NOTHING",
    )
    .bind(a.username)
    .bind(a.name)
    .bind(a.country)
    .bind(a.date)
    .bind(a.email)
    .bind(a.password_hash)
    .bind(a.id)
    .execute(pool)
    .await?;
    Ok(a.id.into())
}

pub(crate) async fn push_messages(
    pool: &Pool<Postgres>,
    messages: &[String],
    raceid: usize,
) -> Result<Vec<PgQueryResult>, sqlx::Error> {
    let mut rv = vec![];
    for message in messages {
        rv.push(
            sqlx::query("INSERT INTO messages (id, content, \"userId\") VALUES ($3, $1, $2)")
                .bind(format!(
                    "{}: on race {}, {}",
                    ANNOUNCER.name, raceid, message
                ))
                .bind(ANNOUNCER.id)
                .bind(cuid::cuid1())
                .execute(pool)
                .await?,
        );
    }
    Ok(rv)
}

pub(crate) async fn pull_states(
    pool: &Pool<Postgres>,
    races: &mut Vec<Race>,
) -> Result<(), GetRaceStateError> {
    let ids: i64 = sqlx::query_as::<_, (i64,)>("SELECT COUNT(DISTINCT raceid) FROM racestate")
        .fetch_one(pool)
        .await?
        .0;
    if ids == 0 {
        return Err(GetRaceStateError::InvalidState);
    }
    let mut rv = vec![];
    for id in 0..ids {
        let json = sqlx::query_as::<_, (JsonValue,)>(
            "SELECT state FROM racestate WHERE raceId = $1 ORDER BY timestamp DESC LIMIT 1",
        )
        .bind(id)
        .fetch_one(pool)
        .await?
        .0
        .to_string();
        rv.push(Race::from_json(json).map_err(|_| GetRaceStateError::InvalidState)?);
    }
    for (i, race) in &mut races.iter_mut().enumerate() {
        if i < rv.len() {
            *race = rv[i].clone()
        }
    }
    if races.len() < rv.len() {
        for race in rv[races.len()..].iter() {
            races.push(race.clone())
        }
    }
    Ok(())
}
