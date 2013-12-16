# angular-monad

[100% credit to Douglas Crockford](https://github.com/douglascrockford/monad).
I just wrapped his implementation of the AJAX monad in an angular factory so
that you can use monads to construct your services.

## Installation

`bower install angular-monad`

## Example Use

```javascript
angular.module('app', ['crockford.monad'])
  .service('$coolService', function($monad) {

    function something(a) {
      return a + 1;
    }

    function getMessage(msg) {
      return 'message is: ' + msg;
    }

    function getAnotherMessage(msg, other) {
      return other + msg;
    }

    return $monad()

      // lift returns the monad and so they can be chained
      .lift('alert', alert)
      .lift('consoleLog' console.log)

      // lift_value returns a value and so they can't be chained
      .lift_value('getMessage', getMessage)
      .lift_value('getAnotherMessage', getAnotherMessage)

      .method('something', something);
  });

  .controller('ctrl', function($coolService) {
    var monad = $coolService('hi');

    // 'hi' appears in the console log and an alert box
    monad.alert().consoleLog();

    // the first argument is always reserved for the initial value
    monad.getMessage(); // => 'message is: hi'
    monad.getAnotherMessage('well '); // => 'well hi'

    // doesn't use the any value given in the monad instantiation
    monad.something(2); // => 3
  });
```

## License

Do whatever you want with it
