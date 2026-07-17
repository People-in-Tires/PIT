import matplotlib.pyplot as plt
import numpy as np


def deboor(degree: int, t: list[float]):
    m = len(t) - 1
    a, b, _k, _m = [], [], range(degree + 1), range(m)
    for i in _m:
        a.append([])
        b.append([])
        for degree in _k:
            a[i].append(None)
            if degree == 0:
                b[i].append(lambda x, i=i: t[i] <= x < t[i + 1])
            elif m < i + degree:
                b[i].append(lambda x: False)
            else:
                if t[i] == t[i + degree]:
                    a[i][degree] = lambda x: False
                else:
                    a[i][degree] = lambda x, i=i, degree=degree: (
                        (x - t[i]) / (t[i + degree] - t[i])
                    )
                b[i].append(
                    lambda x, i=i, degree=degree: (
                        a[i][degree](x) * b[i][degree - 1](x)
                        + (1 - a[i + 1][degree](x)) * b[i + 1][degree - 1](x)
                    )
                )
    return b  # set b


# inputs
# power/ number of points
# degree of curve
# precision


for power in range(4):
    n = 2**power + 3 - 1
    precision = 2500
    print("Generating Basis with " + str(n + 1) + " elements")
    degree = 3  # degree of curve #breaks with non 3 degree
    m = n + degree + 1  # property of b-splines: m = n + degree + 1

    # _t =  step size for array t (1 / 1|2|4|8|etc...)
    step_size = (
        1.0 / (m - degree * 2)
    )  # t between clamped ends will be evenly spaced (not a necessary condition, however)
    t = (
        [i * step_size for i in range(-degree, 0)]
        + [i * step_size for i in range(0, m - (degree * 2) + 1)]
        + [1 + i * step_size for i in range(1, degree + 1)]
    )
    b = deboor(degree, t)

    # t_step_array = array with steps of 1/precision between 0 and 1
    t_step_array = np.arange(t[3], t[-4], 1 / precision)

    output_file = open("./basis_data/basis_array_" + str(n + 1) + ".txt", "w")
    at_first = 1
    # fomatting bullshit for the basis_arrayN.txt
    for i in t_step_array:
        dummy = np.array([])
        for j in range(n + 1):
            # for j in range(n+1+4):
            dummy = np.append(dummy, b[j][degree](i))
        if at_first == 1:
            at_first = 0
            b_mat = dummy
        else:
            b_mat = np.vstack((b_mat, dummy))
    np.savetxt(output_file, b_mat)
    output_file.close()
    print(f"save basic with {n + 1} elements")

    # plotting the basis_figN.png
    for i in range(n + 1):
        plt.plot(t_step_array, b_mat[:, i])
    plt.savefig("./basis_data/basis_fig_" + str(n + 1) + ".png")
    plt.clf()
    print("Generation and Saving figure complete")
    # plt.show()
