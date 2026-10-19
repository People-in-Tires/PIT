FROM alpine AS matrix_builder
RUN apk add uv
COPY simulation/b-spline /
RUN /main.py

FROM rust:alpine AS builder
RUN apk add uv openssl-libs-static libcrypto3
COPY simulation/include_f64_matrix /simulation/include_f64_matrix
COPY simulation/Cargo.toml /simulation/Cargo.toml
COPY simulation/rs /simulation/rs
COPY simulation_automata/Cargo.toml /automata/Cargo.toml
COPY simulation_automata/src /automata/src
COPY --from=matrix_builder /basis_data/basis_array_11.txt /simulation/precomputed-matrix.txt
WORKDIR /automata
RUN cargo build --release

FROM alpine AS runner
COPY --from=builder /automata/target/release/simulation_automata /
COPY simulation_automata/example_race.json /
CMD [ "sh", "-c", "/simulation_automata $DATABASE_URL /example_race.json 0.5" ]
