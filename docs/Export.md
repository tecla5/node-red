# Export nodes

See `editors/js/nodes.js`

```js
  var selection = RED.view.selection();
  nodes = RED.nodes.createExportableNodeSet(selection.nodes);

    function createExportableNodeSet(set) {
      // ...
    }
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

