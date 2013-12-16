// https://github.com/douglascrockford/monad/blob/master/monad.js

angular.module('crockford.monad')
  .factory('$monad', function(){
    return function(modifier) {
      'use strict';
      // Each unit constructor has a monad prototype. The prototype will contain an
      // is_monad property for classification, as well as all inheritable methods.
      var prototype = Object.create(null);
      prototype.is_monad = true;

      // Each call to MONAD will produce a new unit constructor function.

      function unit(value) {

      // Construct a new monad.

        var monad = Object.create(prototype);

      // In some mythologies 'bind' is called 'pipe' or '>>='.
      // The bind method will deliver the unit's value parameter to a function.

        monad.bind = function (func, args) {

      // bind takes a function and an optional array of arguments. It calls that
      // function passing the monad's value and bind's optional array of args.

      // With ES6, this horrible return statement can be replaced with

      //      return func(value, ...args);

          return func.apply(
              undefined,
              [value].concat(Array.prototype.slice.apply(args || []))
            );
        };

      // If MONAD's modifier parameter is a function, then call it, passing the monad
      // and the value.

        if (typeof modifier === 'function') {
          value = modifier(monad, value);
        }

      // Return the shiny new monad.

        return monad;
      }
      unit.method = function (name, func) {

      // Add a method to the prototype.

        prototype[name] = func;
        return unit;
      };
      unit.lift_value = function (name, func) {

      // Add a method to the prototype that calls bind with the func. This can be
      // used for ajax methods that return values other than monads.

        prototype[name] = function () {
          return this.bind(func, arguments);
        };
        return unit;
      };
      unit.lift = function (name, func) {

      // Add a method to the prototype that calls bind with the func. If the value
      // returned by the func is not a monad, then make a monad.

        prototype[name] = function () {
          var result = this.bind(func, arguments);
          return result && result.is_monad === true ? result : unit(result);
        };
        return unit;
      };
      return unit;
    }

  });
