# Menu

in `main.js/loadEditor`

```js
        menuOptions.push({id:"menu-item-import",label:RED._("menu.label.import"),options:[
            {id:"menu-item-import-clipboard",label:RED._("menu.label.clipboard"),onselect:"core:show-import-dialog"},
            {id:"menu-item-import-library",label:RED._("menu.label.library"),options:[]}
        ]});
        menuOptions.push({id:"menu-item-export",label:RED._("menu.label.export"),disabled:true,options:[
            {id:"menu-item-export-clipboard",label:RED._("menu.label.clipboard"),disabled:true,onselect:"core:show-export-dialog"},
            {id:"menu-item-export-library",label:RED._("menu.label.library"),disabled:true,onselect:"core:library-export"}
        ]});
```