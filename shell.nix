{
  pkgs ? import <nixpkgs> { },
}:

pkgs.mkShell {
  packages = with pkgs; [
    # ts/js stuff
    typescript
    eslint
    typescript-language-server
    yarn
    nodejs
    # project dependencies
    prisma
    postgresql
    # rust
    rustc
    cargo
    cargo-watch
    lld
    wasm-bindgen-cli
    wasm-pack
    uv
    python3
    python314Packages.numpy
  ];
  shellHook = ''
    	echo "welcome to the PIT lane"
  '';
}
