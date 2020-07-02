var width = window.innerWidth;
var height = window.innerHeight;

var stage = new Konva.Stage({
  container: 'container',
  width: width,
  height: height,
  x: 20,
  y: 50,
  draggable: true,
});

var layer = new Konva.Layer({
  //scaleX: 1.2,
  //scaleY: 0.8,
  //rotation: 5,
});
stage.add(layer);


var group = new Konva.Group({
  draggable: true,
  //x: 30,
  //rotation: 10,
  //scaleX: 1.5,
});
layer.add(group);

var text = new Konva.Text({
  text: 'Click on the canvas to draw a circle',
  fontSize: 20,
});
//group.add(text);
layer.draw();

// this function will return pointer position relative to the passed node
function getRelativePointerPosition(node) {
  var transform = node.getAbsoluteTransform().copy();
  // to detect relative position we need to invert transform
  transform.invert();

  // get pointer (say mouse or touch) position
  var pos = node.getStage().getPointerPosition();

  // now we can find relative point
  return transform.point(pos);
}
var scaleBy = 1.05;
stage.on('wheel', (e) => {
  e.evt.preventDefault();
  var oldScale = stage.scaleX();

  var pointer = stage.getPointerPosition();

  var mousePointTo = {
    x: (pointer.x - stage.x()) / oldScale,
    y: (pointer.y - stage.y()) / oldScale,
  };

  var newScale =
    e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;

  stage.scale({ x: newScale, y: newScale });

  var newPos = {
    x: pointer.x - mousePointTo.x * newScale,
    y: pointer.y - mousePointTo.y * newScale,
  };
  stage.position(newPos);
  stage.batchDraw();
});
stage.on('dblclick', function () {
  var combined = new Konva.Group({
    draggable: true,
  });
  var txtobj = new Konva.Group({
    //draggable: true,
  });
  var shpobj = new Konva.Group({
    //draggable: true,
  });
  layer.add(txtobj);
  layer.add(shpobj);
  layer.add(combined);
  var pos = getRelativePointerPosition(group);
  var textbox = new Konva.Text({
    text: 'Text',
    fontSize: 15,
    fill: 'yellow',
    x: pos.x - 15,
    y: pos.y - 5,
    //draggable: true,
  });
  var shape = new Konva.Circle({
    x: pos.x,
    y: pos.y,
    fill: 'white',
    radius: 30,
    //draggable: true,
  });
  
  txtobj.add(textbox);
  shpobj.add(shape);
  combined.add(txtobj);
  combined.add(shpobj);
  txtobj.moveToTop();
  layer.batchDraw();
});