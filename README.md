# angular-monad

[100% credit to Douglas Crockford](https://github.com/douglascrockford/monad).
I just wrapped his implementation of the AJAX monad in an angular factory so
that you can use monads to construct your services.

## Installation

`bower install angular-monad`

## Example Use

```javascript
angular.module('app', ['crockford.monad'])
  .service('$alertService', function($monad) {
    return $monad()
      .lift('alert', alert)
      .lift('consoleLog' console.log);
  });

  .controller('ctrl', function($alertService) {
    var monad = $alertService('hi');

    // 'hi' appears in the console log and an alert box
    monad.alert().consoleLog();
  });
```

## TODO

1. Make sure that it actuall works
2. Specs?
3. More examples
4. Better documentation

## License

MIT
