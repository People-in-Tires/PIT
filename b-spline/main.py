#!/usr/bin/env -S bash -c "source .venv/bin/activate && python3 ./main.py"
import os
import subprocess


def main() -> None:
    if not os.path.isdir("./basis_data"):
        with open("basis_array.py") as script:
            os.mkdir("./basis_data")
            exec(script.read())
    if not os.path.isdir("./output"):
        os.mkdir("./output")
    subprocess.run(["python3", "closed_curve.py"])


if __name__ == "__main__":
    main()
