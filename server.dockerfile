FROM rust:alpine AS builder
RUN apk add uv
RUN cargo install wasm-pack
COPY simulation /
WORKDIR b-spline
RUN ./main.py
WORKDIR /
RUN wasm-pack build --target web

FROM alpine AS runner
RUN
RUN apk add yarn
WORKDIR /pit/
COPY --from=builder pkg lib/wasm
COPY pit/ .
RUN yarn install --mode prod
# RUN yarn build
# CMD [ "yarn", "start" ]
CMD [ "yarn", "dev" ]
## move away from 'dev' as the application becomes more stable
