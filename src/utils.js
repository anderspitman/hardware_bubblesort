export const wireStrokeWidth = 2;
export const highColor = 'green';
export const lowColor = 'black';

export function transform(x, y, rotation, scale) {

  if (x === undefined) {
    x = 0;
  }

  if (y === undefined) {
    y = 0;
  }

  let transform = "translate(" + x + ", " + y + ")";

  if (rotation !== undefined) {
    transform += " rotate(" + rotation + ")";
  }

  if (scale !== undefined) {
    transform += " scale(" + scale + ")";
  }

  return transform;
}

export function color(elem) {
  return elem.getState() === 0 ? lowColor : highColor;
}

