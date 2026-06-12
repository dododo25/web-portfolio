const buildCircleTopLeftPart = (blocks, halfWidth, halfHeight) => {
  if (halfHeight === 0) {
    return [];
  }

  for (let i = 0; i < halfHeight; i++) {
    const row = [];

    for (let j = 0; j < halfWidth; j++) {
      const x = j + 0.5;
      const y = i + 0.5;

      const radius = Math.sqrt(Math.pow(x - halfWidth, 2) / Math.pow(halfWidth, 2) + Math.pow(y - halfHeight, 2) / Math.pow(halfHeight, 2));
      row.push(radius <= 1 ? true : undefined);
    }

    blocks.push(row);
  }
};

const hideInnerCells = (blocks, thickWalls) => {
  const defineStartCol = row => {
    for (let j = row.length - 1; j >= 0; j--) {
      if (!row[j]) {
        return j + 1;
      }
    }

    return 0;
  }

  let prevStartCol = defineStartCol(blocks[0]);

  for (let i = 1; i < blocks.length; i++) {
    const row = blocks[i];
    const startCol = defineStartCol(row);

    for (let j = prevStartCol + (thickWalls || prevStartCol === startCol ? 1 : 0); j < row.length; j++) {
      row[j] = false;
    }

    prevStartCol = startCol;
  }
};

const unwrapBlocks = (blocks, fullWidth, fullHeight) => {
  const width  = blocks[0].length;
  const height = blocks.length;

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width - fullWidth % 2; j++) {
      blocks[i].splice(width, 0, blocks[i][j]);
    }
  }

  for (let i = 0; i < height - fullHeight % 2; i++) {
    blocks.splice(height, 0, [...blocks[i]]);
  }
}

const buildCircleBlocks = (width, height, fill, thickWalls) => {
  const blocks = [];

  buildCircleTopLeftPart(blocks, width / 2, height / 2);

  if (!fill) {
    hideInnerCells(blocks, thickWalls);
  }

  unwrapBlocks(blocks, width, height);
  return blocks;
};

export default buildCircleBlocks;
