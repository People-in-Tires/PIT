# build
## simple
unless you want to do it locally, manually, the hard way, simply do:

```sh
docker compose up
```

## advanced
the nextjs application assumes that '@/lib/wasm' exists, it doesn't exist there
by default, as it is compiled from rust.
the rust _also_ needs you to run a program first, or it won't compile.
assuming you are in the root of the repository, run the following commands to
remedy that:
```sh
(cd simulation/b-spline && ./main.py)
wasm-pack build --target web -d pit/lib/wasm simulation
```

# explanations

the simulation logic is fully written in rust and then compiled to WebAssembly
(henceforth, wasm). the wasm_bindgen crate provides a bunch of helper macros to
easily import and export types and functions back and forth between the js and
rust. whenever you see `#[wasm_bindgen]` or its variations, thats the create
doing the magic of exporting or importing stuff.
most of the types provided are relatively simple, statically sized, product
types that should be usable similarly to if they were declared in js.
theres some math that is being done, largely pretty basic geometry, and then
theres `wrapping_control_points()`. its a matrix multiplication with a
precomputed matrix that does some complicated math to create an array of
intervals 2500 steps long. theres a formula for creating a C2 continuous closed
curve from a set of N points, which we've decided arbitrarily is going to be 8,
because it is Good Enough:tm: for our purposes. the precomputed matrix is simply
there to make it less compute-heavy at runtime

> [!NOTE]
> the getters for the `Race` objects all do deep copies due to how ownership and
> memory is managed. when possible, try to minimise their use. in practice, it
> shouldnt actually matter that much, but its the principle of the thing. you
> get it

