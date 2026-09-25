FROM rust:alpine AS builder
RUN apk add uv openssl-libs-static libcrypto3
COPY simulation /simulation
WORKDIR /simulation/b-spline
RUN ./main.py
COPY simulation_automata /automata
WORKDIR /automata
RUN cargo build --release

FROM alpine AS runner
COPY --from=builder automata/target/release/simulation_automata /
COPY simulation_automata/example_race.json /
CMD [ "sh", "-c", "/simulation_automata $DATABASE_URL /example_race.json" ]
