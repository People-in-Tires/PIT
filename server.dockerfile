FROM rust AS builder
RUN cargo install wasm-pack
COPY simulation .
RUN wasm-pack build --target web

FROM alpine
RUN apk add yarn
WORKDIR /pit/
COPY --from=builder pkg lib/wasm
COPY pit/ .
RUN yarn install --mode prod
# RUN yarn build
# CMD [ "yarn", "start" ]
CMD [ "yarn", "dev" ]
## move away from 'dev' as the application becomes more stable
