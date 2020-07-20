
<!DOCTYPE html>
<html>
  <head>
    <script src="https://unpkg.com/konva@7.0.3/konva.min.js"></script>
    <meta charset="utf-8" />
    <title>Konva Editable Text on html5 canvas Demo</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        overflow: hidden;
        background-color: #f0f0f0;
      }
    </style>
  </head>

  <body>
    <div id="container"></div>
    <script>
      var width = window.innerWidth;
      var height = window.innerHeight;

      var stage = new Konva.Stage({
        container: 'container',
        width: width,
        height: height,
      });

      var layer = new Konva.Layer();
      stage.add(layer);

      var textNode = new Konva.Text({
        text: 'Some text here',
        x: 50,
        y: 50,
        fontSize: 20,
      });

      layer.add(textNode);
      layer.draw();

      textNode.on('dblclick', () => {
        // create textarea over canvas with absolute position

        // first we need to find position for textarea
        // how to find it?

        // at first lets find position of text node relative to the stage:
        var textPosition = textNode.getAbsolutePosition();

        // then lets find position of stage container on the page:
        var stageBox = stage.container().getBoundingClientRect();

        // so position of textarea will be the sum of positions above:
        var areaPosition = {
          x: stageBox.left + textPosition.x,
          y: stageBox.top + textPosition.y,
        };

        // create textarea and style it
        var textarea = document.createElement('textarea');
        document.body.appendChild(textarea);

        textarea.value = textNode.text();
        textarea.style.position = 'absolute';
        textarea.style.top = areaPosition.y + 'px';
        textarea.style.left = areaPosition.x + 'px';
        textarea.style.width = textNode.width();

        textarea.focus();

        textarea.addEventListener('keydown', function (e) {
          // hide on enter
          if (e.keyCode === 13) {
            textNode.text(textarea.value);
            layer.draw();
            document.body.removeChild(textarea);
          }
        });
      });
    </script>
  </body>
</html>