FROM scratch AS simulation_src
COPY simulation/include_f64_matrix /simulation/include_f64_matrix
COPY simulation/Cargo.toml /simulation
COPY simulation/rs /simulation/rs

FROM alpine AS matrix_builder
RUN apk add uv
COPY simulation/b-spline /
RUN /main.py
