module.exports.splitBoardIntoArray = function(board) {

  return board.split('\n').map(function(row) {
    return row.split('').map(function(num) {
      return +num;
    });
  });
};

module.exports.findVacantPositions = function(board) {
  var emptyPositions = [];
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      if (board[i][j] === 0) {
        emptyPositions.push([i, j]);
      }
    }
  }
  return emptyPositions;
};

module.exports.checkRowForCollision = function(board, row, value) {
  for (var i = 0; i < board[row].length; i++) {
    if (board[row][i] === value) {
      return false;
    }
  }
  return true;
};

module.exports.checkColumnForCollision = function(board, column, value) {
  for (var i = 0; i < board.length; i++) {
    if (board[i][column] === value) {
      return false;
    }
  }
  return true;
};

module.exports.checkEachSquareForCollision = function(board, column, row, value) {
  var columnCorner = 0,
    rowCorner = 0,
    squareSize = 3;
  while (column >= columnCorner + squareSize) {
    columnCorner += squareSize;
  }

  while (row >= rowCorner + squareSize) {
    rowCorner += squareSize;
  }
  for (var i = rowCorner; i < rowCorner + squareSize; i++) {
    for (var j = columnCorner; j < columnCorner + squareSize; j++) {
      if (board[i][j] === value) {
        return false;
      }
    }
  }
  return true;
};

module.exports.checkForCollision = function(board, column, row, value) {
  if (this.checkRowForCollision(board, row, value) &&
    this.checkColumnForCollision(board, column, value) &&
    this.checkEachSquareForCollision(board, column, row, value)) {
    return true;
  } else {
    return false;
  }
};

//logic for solving puzzle
module.exports.solve = function(board, vacantPositions) {
  var limit = 9,
    i, row, column, value, found;
  for (i = 0; i < vacantPositions.length;) {
    row = vacantPositions[i][0];
    column = vacantPositions[i][1];
    value = board[row][column] + 1;
    found = false;
    while (!found && value <= limit) {
      if (this.checkForCollision(board, column, row, value)) {
        found = true;
        board[row][column] = value;
        i++;
      } else {
        value++;
      }
    }
    if (!found) {
      board[row][column] = 0;
      i--;
    }
  }

  board.forEach(function(row) {
    console.log(row.join());
  });

  return board;
};

module.exports.solveSudoku = function(board) {
  var splittedArray = this.splitBoardIntoArray(board);
  var vacantPositions = this.findVacantPositions(splittedArray);

  return this.solve(splittedArray, vacantPositions);
};
