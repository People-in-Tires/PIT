
FROM rust:alpine AS builder
RUN apk add uv
RUN cargo install wasm-pack
COPY simulation /
WORKDIR b-spline
RUN ./main.py
WORKDIR /
RUN wasm-pack build --target web

FROM alpine AS runner
RUN apk add yarn
WORKDIR /pit/
COPY --from=builder pkg lib/wasm
COPY pit/package.json .
RUN yarn install --mode prod

COPY pit/ .
# RUN yarn prisma migrate dev --url=${DATABASE_URL}

# RUN yarn build
# CMD [ "yarn", "start" ]
CMD [ "sh", "-c", "yarn prisma migrate dev --url=$DATABASE_URL && yarn prisma generate && yarn dev" ]
## move away from 'dev' as the application becomes more stable
