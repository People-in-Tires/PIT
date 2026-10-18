FROM rust:alpine AS builder
RUN apk add uv
RUN cargo install wasm-pack
COPY simulation /
WORKDIR /b-spline
RUN /b-spline/main.py
WORKDIR /
RUN wasm-pack build --target web


FROM alpine AS runner
RUN apk add yarn
WORKDIR /pit
COPY pit/package.json /pit
RUN yarn install

COPY pit/ /pit
COPY --from=builder /pkg /pit/lib/wasm
# RUN yarn build
# CMD [ "yarn", "start" ]
CMD [ "sh", "-c", "yarn prisma db push --url=$DATABASE_URL --accept-data-loss && yarn prisma generate && yarn prisma db seed && yarn dev" ]
## move away from 'dev' as the application becomes more stable
