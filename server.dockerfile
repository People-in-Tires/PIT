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

COPY pit/ /pit
COPY --from=builder /pkg /pit/lib/wasm

COPY server-entrypoint.sh /server-entrypoint.sh
RUN mkdir -p /secrets

ENTRYPOINT [ "/server-entrypoint.sh" ]
# RUN yarn build
# CMD [ "yarn", "start" ]
CMD [ "sh", "-c", "yarn prisma db push --url=$DATABASE_URL --accept-data-loss && yarn prisma generate && yarn prisma db seed && yarn dev" ]
## move away from 'dev' as the application becomes more stable
