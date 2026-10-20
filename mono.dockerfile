FROM scratch AS simulation_src
COPY simulation/include_f64_matrix /simulation/include_f64_matrix
COPY simulation/Cargo.toml /simulation
COPY simulation/rs /simulation/rs

FROM alpine AS matrix_builder
RUN apk add uv
COPY simulation/b-spline /
RUN /main.py

FROM rust:alpine AS wasm_builder
## for whatever reason, building directly currently doesnt work right
# RUN cargo install wasm-pack
RUN cargo install cargo-binstall
RUN cargo binstall wasm-pack
COPY --from=simulation_src /simulation /
COPY --from=matrix_builder /basis_data/basis_array_11.txt /precomputed-matrix.txt
RUN wasm-pack build --target web

FROM rust:alpine AS sim_builder
RUN apk add openssl-libs-static libcrypto3
COPY --from=simulation_src /simulation /simulation
COPY --from=matrix_builder /basis_data/basis_array_11.txt /simulation/precomputed-matrix.txt
COPY simulation_automata/Cargo.toml /automata/Cargo.toml
COPY simulation_automata/src /automata/src
WORKDIR /automata
RUN cargo build --release

FROM alpine AS sim
COPY --from=sim_builder /automata/target/release/simulation_automata /
COPY simulation_automata/example_race.json /
CMD [ "sh", "-c", "/simulation_automata $DATABASE_URL /example_race.json 0.5" ]

FROM alpine AS server
RUN apk add yarn
COPY pit/package.json /
RUN yarn install
RUN mkdir -p /secrets
COPY pit/ /
COPY .env /
COPY --from=wasm_builder /pkg /pit/lib/wasm

RUN yarn prisma generate
RUN yarn build
COPY server-entrypoint.sh /
ENTRYPOINT [ "/server-entrypoint.sh" ]
CMD [ "yarn", "start" ]
