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
  //draggable: false,
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

// makes id of selected shape a global variable
function createShape(shapeID) {
  window.idString = shapeID;
}

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
    text: 'Txt',
    fontSize: 15,
    fill: 'black',
    x: pos.x - 15,
    y: pos.y - 5,
    //draggable: true,
  });
  if (idString == 'square') {
    var shape = new Konva.Rect({
      x: pos.x,
      y: pos.y,
      width: 60,
      height: 60,
      fill: 'white',
      //draggable: true,
    });
  }
  else if (idString == 'circle') {
    var shape = new Konva.Circle({
      x: pos.x,
      y: pos.y,
      fill: 'white',
      radius: 30,
      //draggable: true,
    });
  }
  
  txtobj.add(textbox);
  shpobj.add(shape);
  combined.add(txtobj);
  combined.add(shpobj);
  txtobj.moveToTop();
  layer.batchDraw();
});

// question: how to make text move with shape

// if a shape is clicked:
layer.on('click', function(){
  var txtobj2 = new Konva.Group({
    //draggable: true,
  });
  var userInput = window.prompt("type whatever");
  var posi = getRelativePointerPosition(layer);
  var textInShape = new Konva.Text({
    text: userInput,
    fontSize: 15,
    fill: 'black',
    x: posi.x,
    y: posi.y,
    //draggable: true,
  });
  layer.add(textInShape);
  layer.batchDraw();
})


/*
combined.on('click', () => {
  var textPostion = textbox.getAbsolutePosition();
  var stageBox = stage.container().getBoundingClientRect();
  var areaPostion = {
    x: stageBox.left + textPosition.x,
    y: stageBox.top + textPosition.y,
  };
  var textarea = document.createElement('textarea');
  document.body.appendChild(textarea);

  textarea.value = textbox.text();
  textarea.style.position = 'absolute';
  textarea.style.top = areaPosition.y + 'px';
  textarea.style.left = areaPosition.x + 'px';
  textarea.style.width = textbox.width();

  textarea.focus();

  textarea.addEventListener('keydown', function (e) {
    if (e.keyCode === 13) {
      textbox.text(textarea.value);
      layer.draw();
      document.body.removeChild(textarea);
    }
  });
});
*/




// question: how do you identify each shape as an individual object? I need to select a specific shape and do things with it.



function createLine(){
  layer.on('dblclick', function(){
    var obj1 = layer;
    layer.on('click', function(){
      var obj2 = layer;
      connectLine(obj1, obj2);
    })
  })
}

var circle = new Konva.Circle({
    x: stage.getWidth() / 2,
    y: stage.getHeight() / 2,
    radius: 40,
    fill: 'green',
    stroke: 'black',
    strokeWidth: 2,
    draggable: true
  });

var circleA = new Konva.Circle({
    x: stage.getWidth() / 5,
    y: stage.getHeight() / 5,
    radius: 30,
    fill: 'red',
    stroke: 'black',
    strokeWidth: 2,
    draggable: true
  });

var arrow = new Konva.Arrow({
    points: [circle.getX(), circle.getY(), circleA.getX(), circleA.getY()],
    pointerLength: 10,
    pointerWidth: 10,
    fill: 'black',
    stroke: 'black',
    strokeWidth: 4
  });

function adjustPoint(e){
    var p=[circle.getX(), circle.getY(), circleA.getX(), circleA.getY()];
    arrow.setPoints(p);
    layer.draw();
  }

circle.on('dragmove', adjustPoint);

circleA.on('dragmove', adjustPoint);

layer.add(circleA);
  // add the shape to the layer
layer.add(circle);
layer.add(arrow);

  // add the layer to the stage
stage.add(layer);

