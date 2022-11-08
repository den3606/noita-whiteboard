import '../scss/styles.scss';
import Konva from 'konva';
import { Group } from 'konva/lib/Group';
import { Shape, ShapeConfig } from 'konva/lib/Shape';
import { handDrawn } from './draw';

function drawImage() {
  const container = <HTMLDivElement>document.querySelector('#main-board');
  if (container == null) {
    new Error('ボードがないよ');
    return;
  }
  const stage = new Konva.Stage({
    container: container,
    width: 1280,
    height: 720,
  });

  const layer = new Konva.Layer();

  stage.add(layer);

  // what is url of dragging element?
  let itemURL = '';
  const enemiesElement = <HTMLDivElement>document.getElementById('enemies');
  enemiesElement.addEventListener('dragstart', function (e) {
    itemURL = (<HTMLImageElement>e.target).src;
  });

  const con = stage.container();
  con.addEventListener('dragover', function (e) {
    e.preventDefault();
  });

  con.addEventListener('drop', function (e) {
    e.preventDefault();
    stage.setPointersPositions(e);

    Konva.Image.fromURL(itemURL, function (image: Group | Shape<ShapeConfig>) {
      image.scale({ x: 0.7, y: 0.7 });
      layer.add(image);
      const position = stage.getPointerPosition()!;
      position.x = position.x - (image.width() * image.scaleX()) / 2;
      position.y = position.y - (image.height() * image.scaleY()) / 2;
      image.position(position);
      image.draggable(true);
    });
  });

  const clearButtonElement = <HTMLButtonElement>document.getElementById('clear-action');
  clearButtonElement.addEventListener('click', () => {
    stage.getLayers().forEach( layer => {
      layer.destroyChildren();
    });
  });

  handDrawn(stage);
}

drawImage();

// 画像がセットされたとき
const inputElement = <HTMLInputElement>document.querySelector('#background');
const handleFiles = (event: Event) => {
  const fileList = (<HTMLInputElement>event.target).files;
  if (fileList == null) {
    new Error('画像がないよ');
    return;
  }
  const targetFile = fileList[0];
  const blobUrl = URL.createObjectURL(targetFile);
  const mainBoardElement = <HTMLDivElement>(
    document.querySelector('#main-board')
  );
  mainBoardElement.style.backgroundImage = `url(${blobUrl})`;
  mainBoardElement.style.backgroundSize = 'cover';
};
inputElement.addEventListener('change', handleFiles, false);


