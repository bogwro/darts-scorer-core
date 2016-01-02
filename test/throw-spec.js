import {assert} from 'chai';
import Throw from '../src/throw';

describe('Throw', () => {

  let _throw = null;

  beforeEach(() => {
    _throw = new Throw(20, 3);
  });

  it('has "number" property defined', () => {
    let num = _throw.number;

    assert.isDefined(num);
    assert.strictEqual(num, 20);
  });

  it('has "multiplier" property defined', () => {
    let multiplier = _throw.multiplier;

    assert.isDefined(multiplier);
    assert.strictEqual(multiplier, 3);
  });

  it('has "isSingle" property defined', () => {
    _throw = new Throw(20, 1);

    let multiplier = _throw.multiplier;

    assert.isDefined(_throw.isSingle);
    assert.strictEqual(multiplier, 1);
    assert.strictEqual(_throw.isSingle, true);
  });

  it('has "isDouble" property defined', () => {
    _throw = new Throw(20, 2);

    let multiplier = _throw.multiplier;

    assert.isDefined(_throw.isDouble);
    assert.strictEqual(multiplier, 2);
    assert.strictEqual(_throw.isDouble, true);
  });

  it('has "isTriple" property defined', () => {
    _throw = Throw.create(20, 3);

    let multiplier = _throw.multiplier;

    assert.isDefined(_throw.isTriple);
    assert.strictEqual(multiplier, 3);
    assert.strictEqual(_throw.isTriple, true);
  });

  it('has factory function "create"', () => {
    let throwFromFactory = Throw.create(17);

    assert.instanceOf(throwFromFactory, Throw);
  });

  it('toString() is defined', () => {
    assert.isFunction(_throw.toString);
    assert.strictEqual(_throw.toString(), '20,3');
  });

});
