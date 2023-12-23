export const shoelace = (polygonCoordinates: {x: number, y: number}[]) => {
  // console.log(polygonCoordinates.length);
  // console.log(polygonCoordinates);
  const twiceTheArea = polygonCoordinates.map((coordinate: {x: number, y: number}, index: number) => {

    let nextCoordinate: {x: number, y: number}
    if (index === polygonCoordinates.length - 1) {
      nextCoordinate = polygonCoordinates[0]
    } else {
      nextCoordinate = polygonCoordinates[index + 1]
    }
    return coordinate.x * nextCoordinate.y - coordinate.y * nextCoordinate.x
  }).reduce((sum: number, value: number) => sum + value, 0)
  return Math.abs(twiceTheArea / 2)
}
export const findNumberOfPointsWithinPolygon = (numberOfIntegerPointsOnBoundary_b: number, numberOfHoles_h: number, polygonArea_A: number) => {
  // h is number of holes
  // A is area of polygon
  // b is number of boundary items
  // i is the number of integers within the polygon
  // typically A = i + b/2 + h - 1
  console.log('A: ', polygonArea_A);
  console.log('b: ', numberOfIntegerPointsOnBoundary_b);
  console.log('h: ', numberOfHoles_h)
  console.log('i: ', polygonArea_A - (numberOfIntegerPointsOnBoundary_b/2) - numberOfHoles_h + 1)
  return polygonArea_A - (numberOfIntegerPointsOnBoundary_b/2) - numberOfHoles_h + 1
}
