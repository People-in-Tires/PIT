FROM rust:alpine AS builder
RUN apk add openssl-libs-static libcrypto3
COPY --link --from=simulation_src /simulation /simulation
COPY --link --parents simulation_automata/./src/* simulation_automata/./Cargo.toml /automata
COPY --link --from=matrix_builder /basis_data/basis_array_11.txt /simulation/precomputed-matrix.txt
WORKDIR /automata
RUN cargo build --release

FROM alpine AS runner
COPY --from=builder /automata/target/release/simulation_automata /
COPY simulation_automata/example_race.json /
CMD [ "sh", "-c", "/simulation_automata $DATABASE_URL /example_race.json 0.5" ]
