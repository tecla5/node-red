## Mustache Partials

[Current approach](https://gist.github.com/hail2u/8926962)

```js
function _loadSharedPartials() {
    var partials = {};
    let rootDir = './editor/templates'
    var recursiveReadSync = require('recursive-readdir-sync')
    var files = recursiveReadSync(rootDir)
    for (var i = 0, l = files.length; i < l; i++) {
        var file = files[i];

        if (file.match(/\.mst$/)) {
            var name = path.basename(file, '.mst');
            let contents = fs.readFileSync(file, 'utf8');
            partials[name] = contents
        }
    }
    return partials;
}
```

In `ui.js` we have:

```js
    editor: function(req,res) {
        res.send(Mustache.render(editorTemplate,theme.context()));
```

Which we had to extend with a 3rd argument, a partials loader that loads all templates into an Object.

```js
    editor: function (req, res) {
        let partials = _loadSharedPartials()
        let html = Mustache.render(editorTemplate, theme.context(), partials)
        res.send(html);
    },
```

### Ajax approach

[Loading template via Ajax](http://www.jonhartmann.com/index.cfm/2014/7/7/jsFiddle-Example-Loading-Partial-Templates-Via-Ajax)

```js
// Ajax template loader
function templateLoader(name) {
    // Uses the jsFiddle API to bounce back the HTML content as a sync Ajax call
    var result = '',
        getTemplate = $.ajax('/echo/html/', {
        data: {
            html: $('#template-'+name).html(),
            delay: 1
        },
        method: 'post',
        async: false,
        success: function (data) {
             result = data;
        }
    });
    return result;
}

var data = {
    title: 'Some People',
    names: [
        { first: 'Patrick', last: 'Stuart'},
        { first: 'LeVar', last: 'Burton'},
        { first: 'Brent', last: 'Spiner'}
    ],
    date: '1/1/2011'
};

var mainTemplate = templateLoader('main');

var html = Mustache.render(mainTemplate, data, templateLoader);
```

### Partials Object registration (Simplest!)

```js
var data = {
    firstName: "Christophe",
    lastName: "Coenraets",
    address: "1 Main street",
    city: "Boston",
    state: "MA",
    zip: "02106"
};

var template = "<h1>{{firstName}} {{lastName}}</h1>{{>address}}";
var partials = {address: "<p>{{address}}</p>{{city}}, {{state}} {{zip}}"};
var html = Mustache.to_html(template, data, partials);
```

### Alternatives

- [using-external-templates-with-mustachejs](http://jonnyreeves.co.uk/2012/using-external-templates-with-mustachejs-and-jquery/)
- [mustache-using-external-templates](http://stackoverflow.com/questions/11168554/mustache-using-external-templates)

`<link href="path/to/template.mustache" rel="template" id="templateName"/>`

