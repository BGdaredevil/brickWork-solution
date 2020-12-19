function brickWork(input) {
  let tools = {};
  tools.convertToNumber = (item) => {
    for (let i = 0; i < item.length; i++) {
      item[i] = item[i].map(Number);
    }

    return item;
  };
  tools.getValidNums = (r, c) => {
    let result = [];

    for (let i = 1; i <= (r * c) / 2; i++) {
      result.push(i);
    }

    return result;
  };
  tools.genRawTopRow = (a, b) => {
    let result = [];

    for (let i = 0; i < a; i++) {
      result.push([]);

      for (let j = 0; j < b; j++) {
        result[i].push(0);
      }
    }

    return result;
  };
  tools.assignValue = (vArr, direction) => {
    let returnVal;

    switch (direction) {
      case true:
        returnVal = vArr.find((el) => el % 2 === 1);

        if (returnVal === undefined) {
          returnVal = vArr.shift();
        } else {
          vArr.splice(vArr.indexOf(returnVal), 1);
        }

        break;

      case false:
        returnVal = vArr.find((el) => el % 2 === 0);

        if (returnVal === undefined) {
          returnVal = vArr.shift();
        } else {
          vArr.splice(vArr.indexOf(returnVal), 1);
        }

        break;
    }
    return returnVal;
  };
  tools.brickLogic = (rowBelow, rowAbove, r, c) => {
    let isHorizontal;
    let validNums = tools.getValidNums(r, c);

    for (let k = 0; k < r; k += 2) {
      for (let l = 0; l < c; l += 4) {
        for (let i = k; i < k + 2; i++) {
          for (let j = l; j < l + 4; j++) {
            let currCellBot = rowBelow[i][j];
            let nextCellBot = rowBelow[i][j + 1];
            let currCellTop = rowAbove[i][j];

            if (currCellTop === 0) {
              if (
                currCellBot === nextCellBot ||
                nextCellBot === undefined ||
                j % 4 === 3
              ) {
                //brick is vertical

                if (i + 1 !== r) {
                  let nextCellTopVert = rowAbove[i + 1][j];
                  let nextCellBotVert = rowBelow[i + 1][j];

                  if (currCellTop === 0 && nextCellTopVert === 0) {
                    isHorizontal = false;
                    rowAbove[i][j] = tools.assignValue(validNums, isHorizontal);
                    rowAbove[i + 1][j] = rowAbove[i][j];
                  }
                }
              } else {
                //brick is horizontal
                isHorizontal = true;
                rowAbove[i][j] = tools.assignValue(validNums, isHorizontal);
                rowAbove[i][j + 1] = rowAbove[i][j];
              }
            } else {
              continue;
            }
          }
        }
      }
    }
    return rowAbove;
  };
  tools.validatorDims = (a, b, area) => {
    let eval = true;

    if (a % 2 === 0 && b % 2 === 0) {
      if (a >= 100 || b >= 100) {
        eval = false;
      }
    } else {
      eval = false;
    }

    if (a !== area.length) {
      eval = false;
    }

    if (!area.every((row) => row.length === b)) {
      eval = false;
    }

    return eval;
  };
  tools.validatorBricks = (a, b, area) => {
    let tripleIsPresent = false;

    for (let i = 0; i < area.length; i++) {
      for (let j = 0; j < area[i].length; j++) {
        let firstH = area[i][j];
        let secondH = area[i][j + 1];

        if (b >= 3) {
          let thirdH = area[i][j + 2];
          if (firstH === secondH && firstH === thirdH) {
            tripleIsPresent = true;
          }
        }

        if (a >= 3 && i + 2 < area.length) {
          let firstV = area[i][j];
          let secondV = area[i + 1][j];
          let thirdV = area[i + 2][j];

          if (firstV === secondV && firstV === thirdV) {
            tripleIsPresent = true;
          }
        }
      }
    }
    return tripleIsPresent;
  };
  tools.rawPrinter = (arr) => {
    console.log("Raw brick locations");
    console.log("");
    arr.forEach((line) => console.log(line.join(" ")));
  };
  tools.printWithSingleBorder = (arr) => {
    let row = "-".repeat(arr[0].join("").length * 2);

    console.log("");
    console.log("Output with single symbol and no space inbetween");
    console.log(row);
    row = "-";

    for (let j = 0; j < arr.length; j++) {
      for (let i = 0; i < arr[j].length; i++) {
        row += arr[j][i];

        if (arr[j][i] !== arr[j][i + 1]) {
          row += "-";
        } else {
          row += "";
        }
      }

      console.log(row);
      row = "-";
    }
    row = "-".repeat(arr[0].join("").length * 2);
    console.log(row);
  };
  tools.printWithBorders = (arr) => {
    let longest = -Infinity;
    let spacer = -Infinity;

    for (let i = 0; i < arr.length; i++) {
      if (arr[i].join(" ").length > longest) {
        longest = arr[i].join(" ").length;
      }

      for (let j = 0; j < arr[i].length; j++) {
        if (arr[i][j] > spacer) {
          spacer = arr[i][j];
        }
      }
    }
    spacer = spacer.toString().length;

    let resultCols = longest + spacer + 2;
    let row = "-".repeat(resultCols);

    console.log("");
    console.log("Square output with more than one symbol");
    console.log("");
    console.log(row);
    row = "-";

    for (let j = 0; j < arr.length; j++) {
      let midRow = "-";

      for (let i = 0; i < arr[j].length; i++) {
        row += arr[j][i];
        if (arr[j][i] !== arr[j][i + 1]) {
          row += "-".repeat(spacer - arr[j][i].toString().length + 1);
        } else {
          row += " ".repeat(spacer - arr[j][i].toString().length + 1);
        }

        if (j + 1 < arr.length) {
          if (arr[j][i] === arr[j + 1][i]) {
            midRow += " ".repeat(arr[j + 1][i].toString().length);
            midRow += "-".repeat(spacer - arr[j + 1][i].toString().length + 1);
          } else {
            midRow += "-".repeat(arr[j + 1][i].toString().length);
            midRow += "-".repeat(spacer - arr[j + 1][i].toString().length + 1);
          }
        }
      }
      console.log(row);

      if (j + 1 !== arr.length) {
        console.log(midRow);
      }

      row = "-";
    }

    row = "-".repeat(resultCols);
    console.log(row);
  };

  let rows = Number(input[0][0]);
  let col = Number(input[0][1]);
  let botRow = tools.convertToNumber(input[1]);
  let topRow = tools.genRawTopRow(rows, col);

  if (!tools.validatorDims(rows, col, botRow)) {
    console.log("Invalid dimensions of the area");
    return;
  } else if (tools.validatorBricks(rows, col, botRow)) {
    console.log("Invalid dimensions of the bricks");
    return;
  } else {
    topRow = tools.brickLogic(botRow, topRow, rows, col);
  }

  tools.rawPrinter(topRow);
  tools.printWithSingleBorder(topRow);
  tools.printWithBorders(topRow);
}

brickWork([
  ["4", "8"],
  [
    ["1", "2", "2", "12", "5", "7", "7", "16"],
    ["1", "10", "19", "12", "5", "15", "15", "16"],
    ["9", "9", "3", "4", "4", "8", "8", "14"],
    ["11", "11", "3", "13", "13", "6", "6", "14"],
  ],
]);
