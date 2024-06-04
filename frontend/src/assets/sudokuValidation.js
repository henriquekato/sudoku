function verifyIfRepeatedInRow(number, row, matrix) {
    const repeated = [];
    for (let j = 0; j < 9; j++) {
        if (matrix[row][j] == number) {
            repeated.push([row, j]);
        }
    }
    return repeated;
}

function verifyIfRepeatedInColumn(number, column, matrix) {
    const repeated = [];
    for (let i = 0; i < 9; i++) {
        if (matrix[i][column] == number) {
            repeated.push([i, column]);
        }
    }
    return repeated;
}

function verifyIfRepeatedInQuadrant(number, quadrant, matrix) {
    let row = Math.floor(quadrant / 3) * 3;
    let column = (quadrant * 3) % 9;
    const repeated = [];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (matrix[i + row][j + column] == number) {
                repeated.push([i + row, j + column]);
            }
        }
    }
    return repeated;
}

export default function verify(number, row, column, quadrant, matrix) {
    if (number === "0") return { quadrant: [[row, column]] };
    if (!number) return {};

    return {
        row: verifyIfRepeatedInRow(number, row, matrix),
        column: verifyIfRepeatedInColumn(number, column, matrix),
        quadrant: verifyIfRepeatedInQuadrant(number, quadrant, matrix),
    };
}
