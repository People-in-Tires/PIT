import numpy
from matplotlib import pyplot


def wrapping_controlps(basis_path: str) -> None:
    # list of points for 3rd degree b-spline with 3 overlap to make it closed
    points11 = numpy.array(
        [
            [1, 2],
            [2, 3],
            [3.5, 2],
            [3, 10],
            [4, 10],
            [3.5, 2],
            [6, -12],
            [4, -5],
            [1, 2],
            [2, 3],
            [3, 2],
        ]
    )

    n = 2**3 + 3 - 1  #
    """ 2^n + 3 - 1:
            n = point count,
            3 = overlap for closed b-spline,
            -1 indexing
    """

    points = points11
    array_x = points[:, 0]
    array_y = points[:, 1]
    matrix_x = numpy.asmatrix(array_x)
    matrix_y = numpy.asmatrix(array_y)

    pyplot.plot(array_x, array_y, "--")

    """ multiply the transposed matrix containing the basis array with the
        points of the b-spline
    """
    txt_extract = numpy.loadtxt(basis_path + str(n + 1) + ".txt")
    basis_array = numpy.asmatrix(txt_extract)
    x_spline_1 = matrix_x * basis_array.T
    y_spline_1 = matrix_y * basis_array.T

    pyplot.plot(
        numpy.array(x_spline_1).flatten(), numpy.array(y_spline_1).flatten()
    )

    x_spline_1_array = numpy.array(x_spline_1).flatten()
    y_spline_1_array = numpy.array(y_spline_1).flatten()
    pyplot.plot(x_spline_1_array, y_spline_1_array)
    with open("points", "w") as f:
        for i in range(len(x_spline_1_array)):
            f.write(f"{x_spline_1_array[i]},{y_spline_1_array[i]}\n")

    for i in range(len(x_spline_1_array)):
        if i % 400 == 0:
            pyplot.text(x_spline_1_array[i], y_spline_1_array[i], str(i))

    pyplot.savefig("output/wrapping_controlps.png")


wrapping_controlps("basis_data/basis_array_")
