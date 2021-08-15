<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Vanshavali</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width">
    <link rel="stylesheet" type="text/css" href="css/tree-boxes.css">

    <script src="https://code.jquery.com/jquery-latest.min.js" type="text/javascript"></script>

  <%--<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min.js" type="text/javascript"></script>--%>
    <script src="https://d3js.org/d3.v3.min.js" type="text/javascript"></script>
    <script src="js/tree-boxes.js" type="text/javascript"></script>
    <script src="js/Vanshavali.js" type="text/javascript"></script>
  </head>
  <body>
    <div class="container">
        <ct-visualization id="tree-container"></ct-visualization>
        <script>
            d3.json("data-example.json", function(error, json) {
                treeBoxes('', json.tree);
            });
        </script>
      <button type="button" onclick="alert('Hello world!')">Click Me!</button>
    </div>

</body>
</html>
