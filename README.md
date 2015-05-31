# grunt-luggage

> this can help you wrap your tpl section into a global template.
> depends on handlebars

## for example

> tpl section:(test/a.html)
```html
<div id="test">
    <img src="{{static}}/images/1.png" alt=""/>
</div>
```

> global tpl:(template.hbs)
```html
<!doctype html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Test</title>
    <link rel="stylesheet" href="{{cdn}}/common.css"/>
</head>
<body>
{{{body}}}
<script src="{{cdn}}/common.js"></script>
</body>
</html>
```

> you can get:(dest/a.html)
```html
<!doctype html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Test</title>
    <link rel="stylesheet" href="{{cdn}}/common.css"/>
</head>
<body>
<div id="test">
    <img src="{{static}}/images/1.png" alt=""/>
</div>
<script src="{{cdn}}/common.js"></script>
</body>
</html>
```

> After doing this, you can transfer the final template to the server, eg. a server side handlebars engine.
> Use origin templates to render in the browser, render final templates in server side.
> We call it hybrid render :p

