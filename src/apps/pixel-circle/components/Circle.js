const buildCircleTopLeftPart = (halfWidth, halfHeight, blockSize) => {
  if (halfHeight === 0) {
    return [];
  }

  const result = [];

  for (let i = 0; i < halfHeight; i++) {
    const row = [];

    for (let j = 0; j < halfWidth; j++) {
      const x = j + 0.5;
      const y = i + 0.5;

      const radius = Math.sqrt(Math.pow(x - halfWidth, 2) / Math.pow(halfWidth, 2) + Math.pow(y - halfHeight, 2) / Math.pow(halfHeight, 2));

      if (radius <= 1) {
        row.push(<Item key={`${i}-${j}`} x={j * blockSize} width={blockSize} height={blockSize} />);
      } else {
        row.push(undefined);
      }
    }

    result.push(<g key={i} transform={`translate(0 ${i * blockSize})`}>{row}</g>);
  }

  return result;
};

const hideInnerCells = (grid, thickWalls) => {
  const defineStartCol = row => {
    for (let j = row.length - 1; j >= 0; j--) {
      if (!row[j]) {
        return j + 1;
      }
    }

    return 0;
  }

  let prevStartCol = defineStartCol(grid[0].props.children);

  for (let i = 1; i < grid.length; i++) {
    const row = grid[i].props.children;
    const startCol = defineStartCol(row);

    for (let j = prevStartCol + (thickWalls || prevStartCol === startCol ? 1 : 0); j < row.length; j++) {
      row[j] = <Item key={`${i}-${j}-hidden`} x={row[j].props.x} width={row[j].props.width} height={row[j].props.height} hidden={true} />;
    }

    prevStartCol = startCol;
  }
};

const buildCircle = (width, height, blockSize, fill, thickWalls) => {
  if (width < 0 || height < 0) {
    throw Error;
  }

  if (width === 0 || height === 0) {
    return [];
  }

  const result = buildCircleTopLeftPart(width / 2, height / 2, blockSize);

  if (!fill) {
    hideInnerCells(result, thickWalls);
  }

  const gridHalfWidth  = Math.floor(width / 2);
  const gridHalfLength = Math.floor(height / 2);

  for (let i = 0; i < result.length; i++) {
    const row = result[i].props.children;

    for (let j = gridHalfWidth - 1; j >= 0; j--) {
      row.push(row[j] 
        ? <Item key={`${i}-${j}-inverted`} x={(width - j - 1) * blockSize} width={blockSize} height={blockSize} hidden={row[j].props.hidden} /> 
        : undefined
      );
    }
  }

  for (let i = gridHalfLength - 1; i >= 0; i--) {
    result.push(<g key={`${i}-inverted`} transform={`translate(0 ${(height - i - 1) * blockSize})`}>{result[i].props.children}</g>);
  }

  return result;
};

const Item = props => {
  const strokeSize = 2;

  const x = props.x || 0;
  const y = props.y || 0;
  const width = props.width || 0;
  const height = props.height || 0;

  return (<rect 
    x={x + (props.hidden ? 0 : strokeSize / 2)} 
    y={y + (props.hidden ? 0 : strokeSize / 2)} 
    width={width - (props.hidden ? 0 : strokeSize / 2)} 
    height={height - (props.hidden ? 0 : strokeSize / 2)} 
    fill='#0D47A1' 
    fillOpacity={props.hidden ? 0.2 : 1.0} 
    stroke={'#1A237E'} 
    strokeWidth={props.hidden ? 0 : strokeSize} />);
};

const Circle = props => {
  const circle = buildCircle(props.width, props.height, props.blockSize, props.fill, props.thickWalls);

  return (
    <svg ref={props.svgRef} className='overflow-visible' xmlns='http://www.w3.org/2000/svg' width={props.width * props.blockSize} height={props.height * props.blockSize}>
      {circle}
    </svg>
  );
};

export default Circle;
