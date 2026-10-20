FROM rust:alpine AS builder
RUN cargo install wasm-pack
COPY --from=simulation_src /simulation /
COPY --from=matrix_builder /basis_data/basis_array_11.txt /precomputed-matrix.txt
RUN wasm-pack build --target web



FROM alpine AS runner
RUN apk add yarn
WORKDIR /pit
COPY --link pit/package.json /pit/package.json
RUN yarn install

RUN mkdir -p /secrets
COPY --link pit/ /pit
COPY --link .env /pit/.env
COPY --link --from=builder /pkg /pit/lib/wasm

RUN yarn prisma generate
RUN yarn build

COPY --link server-entrypoint.sh /server-entrypoint.sh
ENTRYPOINT [ "/server-entrypoint.sh" ]

# exec'd in the entrypoint
CMD [ "yarn", "dev" ]
