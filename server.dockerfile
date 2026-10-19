FROM alpine AS matrix_builder
RUN apk add uv
COPY simulation/b-spline /
RUN /main.py



FROM rust:alpine AS builder
RUN cargo install cargo-binstall
RUN cargo binstall wasm-pack
COPY simulation/include_f64_matrix /include_f64_matrix
COPY simulation/Cargo.toml /
COPY simulation/rs /rs
COPY --from=matrix_builder /basis_data/basis_array_11.txt /precomputed-matrix.txt
RUN wasm-pack build --target web



FROM alpine AS runner
RUN apk add yarn
WORKDIR /pit
COPY pit/package.json /pit
RUN yarn install

RUN mkdir -p /secrets

COPY pit/ /pit
COPY .env /pit/.env
COPY --from=builder /pkg /pit/lib/wasm


RUN yarn prisma generate
RUN yarn build

COPY server-entrypoint.sh /server-entrypoint.sh
ENTRYPOINT [ "/server-entrypoint.sh" ]

# exec'd in the entrypoint
CMD [ "yarn", "start" ]
