import {assert} from 'chai';
import Round from '../src/round';

describe('Round', () => {

  let round = null;

  beforeEach(() => {
    round = new Round();
  });

  it('has "size" property defined', () => {
    assert.isDefined(round.size);
    assert.strictEqual(round.size, 0);
  });

  it('has "isEmpty" property defined', () => {
    assert.isDefined(round.isEmpty);
    assert.strictEqual(round.isEmpty, true);
  });

  it('has "throw" method defined', () => {
    assert.isFunction(round.throw);
  });

  it('has "pop" method defined', () => {
    assert.isFunction(round.pop);
    round.throw(20);
    round.pop();
    assert.lengthOf(Array.from(round._throws), 0);
  });

  it('has "toString" method defined', () => {
    round.throw(10);
    round.throw(10, 2);
    round.throw(10, 3);

    assert.isFunction(round.toString);

    assert.equal(round.toString(), "10,1,10,2,10,3");

  });

  it('has `invalidate` method defined', () => {
    round.throw(20, 3);
    assert.isFunction(round.invalidate);
  });

  it('can `invalidate` and pass what will be the value for each throw', () => {
    round.throw(20, 3);
    round.invalidate(6, 2);
    for(let _throw of round.throws) {
      assert.strictEqual(_throw.number, 6);
      assert.strictEqual(_throw.multiplier, 2);
    }
  });

  it('increases size after throwing', () => {
    round.throw(10, 2);
    assert.strictEqual(round.size, 1);

    round.throw(20, 3);
    assert.strictEqual(round.size, 2);

    round.throw(15);
    assert.strictEqual(round.size, 3);
  });

  it('does not insert a throw once limit of throws is reached', () => {
    round = new Round({throwsPerRound: 1});

    round.throw(10, 2);
    round.throw(20, 3);

    assert.strictEqual(round.size, 1);
  });

  it('marks as done once reached limit of throws per round', () => {
    round = new Round({throwsPerRound: 1});

    assert.strictEqual(round.isDone, false);

    round.throw(10, 2);

    assert.strictEqual(round.isDone, true);
  });


});
