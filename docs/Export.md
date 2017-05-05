# Export nodes

See `editors/js/nodes.js`

```js
  var selection = RED.view.selection();
  nodes = RED.nodes.createExportableNodeSet(selection.nodes);

    function createExportableNodeSet(set) {
      // ...

      if (node.type != "subflow") {
          var convertedNode = RED.nodes.convertNode(node);

    }
```

`public/red.js`

```js
    /**
     * Converts a node to an exportable JSON Object
     **/
    function convertNode(n, exportCreds) {
```

To customize use a decorator or one or more filters!

## Clipboard
See `clipboard.js` in `function exportNodes()`

```js
  var flow = $("#clipboard-export").val();
  if (flow.length > 0) {
      var nodes = JSON.parse(flow);

  var selection = RED.view.selection();
  nodes = RED.nodes.createExportableNodeSet(selection.nodes);

flow = JSON.stringify(nodes);

$("#clipboard-export").val(flow);
```

