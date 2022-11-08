import Konva from 'konva';
import { Line } from 'konva/lib/shapes/Line';
import { Stage } from 'konva/lib/Stage';

export const handDrawn = function (stage: Stage) {
  const layer = new Konva.Layer();
  stage.add(layer);

  let isPaint = false;
  let mode = 'drag';
  let lastLine: Line;

  stage.on('mousedown touchstart', () => {
    if (mode !== 'brush' && mode !== 'eraser') {
      return;
    }
    isPaint = true;
    const pos = stage.getPointerPosition();
    lastLine = new Konva.Line({
      stroke: '#df4b26',
      strokeWidth: mode === 'brush' ? 5 : 15,
      globalCompositeOperation:
        mode === 'brush' ? 'source-over' : 'destination-out',
      // round cap for smoother lines
      lineCap: 'round',
      lineJoin: 'round',
      // add point twice, so we have some drawings even on a simple click
      points: [pos!.x, pos!.y, pos!.x, pos!.y],
    });
    layer.add(lastLine);
  });

  stage.on('mouseup touchend', () => {
    isPaint = false;
  });

  // and core function - drawing
  stage.on('mousemove touchmove', (e) => {
    if (!isPaint) {
      return;
    }

    // prevent scrolling on touch devices
    e.evt.preventDefault();

    const pos = stage.getPointerPosition();
    const newPoints = lastLine.points().concat([pos!.x, pos!.y]);
    lastLine.points(newPoints);
  });

  const select = <HTMLSelectElement>document.getElementById('tool');
  select.addEventListener('change', function () {
    mode = select.value;
  });
};
