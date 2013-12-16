'use strict';

describe('Service: $monad', function () {
  var $monad;

  beforeEach(module('crockford.monad'));

  beforeEach(inject(function (_$monad_) {
    $monad = _$monad_;
  }));

  it('sets methods that return values outside of binding',function() {
    var monad = $monad().method('test', function(a) { return a + 1 });
    var instance = monad();

    expect(instance.test(2)).toBe(3);
  });

  it('sets methods that return values through binding', function() {
    var monad = $monad().lift_value('test', function(a, b) { return a + b + 1 });
    var instance = monad(2);

    expect(instance.test(1)).toBe(4);
  });

  it('sets methods that return a monad', function() {
    var monad = $monad()
                  .lift('add', function(a) { return a += 1 })
                  .lift_value('get', function(a) { return a });

    var instance = monad(1);

    // the return of lift can't be directly read so
    // we need another method to retrieve the return
    expect(instance.add().get()).toBe(2);
  });
});

