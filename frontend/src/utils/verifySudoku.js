function verifySudoku(matrix) {
  const invalidPositions = [];

  function addIfUnique(positions) {
    for (const position of positions) {
      if (
        !invalidPositions.some((pos) =>
          pos.every((val, index) => val === position[index])
        )
      )
        invalidPositions.push(position);
    }
  }

  for (let i = 0; i < 9; i++) {
    addIfUnique(verifyRow(i, matrix));
    addIfUnique(verifyColumn(i, matrix));
    addIfUnique(verifyQuadrant(i, matrix));
  }

  invalidPositions.sort(function (posA, posB) {
    if (posA[0] == posB[0]) {
      return posA[1] - posB[1];
    }
    return posA[0] - posB[0];
  });
  return invalidPositions;
}

function verifyRow(row, matrix) {
  const seenNumbers = new Set();
  const invalids = [];

  for (let i = 0; i < 9; i++) {
    const currentNumber = matrix[row][i];
    const currentPosition = [row, i];
    if (seenNumbers.has(currentNumber)) continue;
    if (currentNumber == 0) {
      invalids.push(currentPosition);
      continue;
    }

    let isCurrentPositionPushed = false;
    for (let j = i + 1; j < 9; j++) {
      if (currentNumber == matrix[row][j]) {
        if (!isCurrentPositionPushed) {
          invalids.push(currentPosition);
          isCurrentPositionPushed = !isCurrentPositionPushed;
        }
        invalids.push([row, j]);
      }
    }
    seenNumbers.add(currentNumber);
  }
  return invalids;
}

function verifyColumn(column, matrix) {
  const seenNumbers = new Set();
  const invalids = [];

  for (let i = 0; i < 9; i++) {
    const currentNumber = matrix[i][column];
    const currentPosition = [i, column];
    if (seenNumbers.has(currentNumber)) continue;
    if (currentNumber == 0) {
      invalids.push(currentPosition);
      continue;
    }

    let isCurrentPositionPushed = false;
    for (let j = i + 1; j < 9; j++) {
      if (currentNumber == matrix[j][column]) {
        if (!isCurrentPositionPushed) {
          invalids.push(currentPosition);
          isCurrentPositionPushed = !isCurrentPositionPushed;
        }
        invalids.push([j, column]);
      }
    }
    seenNumbers.add(currentNumber);
  }
  return invalids;
}

function verifyQuadrant(quadrant, matrix) {
  let firstRow = Math.floor(quadrant / 3) * 3;
  let firstColumn = (quadrant * 3) % 9;
  const seenNumbers = new Set();
  const invalids = [];

  for (let i = firstRow; i < firstRow + 3; i++) {
    for (let j = firstColumn; j < firstColumn + 3; j++) {
      const currentNumber = matrix[i][j];
      const currentPosition = [i, j];
      if (seenNumbers.has(currentNumber)) continue;
      if (currentNumber == 0) {
        invalids.push(currentPosition);
        continue;
      }

      let isCurrentPositionPushed = false;
      for (let k = firstRow; k < firstRow + 3; k++) {
        for (let l = firstColumn; l < firstColumn + 3; l++) {
          if (currentNumber == matrix[k][l] && (i != k || j != l)) {
            if (!isCurrentPositionPushed) {
              invalids.push(currentPosition);
              isCurrentPositionPushed = !isCurrentPositionPushed;
            }
            invalids.push([k, l]);
          }
        }
      }
      seenNumbers.add(currentNumber);
    }
  }
  return invalids;
}

export default verifySudoku;
