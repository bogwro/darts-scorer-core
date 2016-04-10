import {assert} from 'chai';
import Player from '../src/player';

describe('Player', () => {

  let player = null;
  let user = {
    name: 'Aga'
  };

  beforeEach(() => {
    player = new Player(user);
  });

  it('has "isComputer" property defined', () => {
    assert.isDefined(player.isComputer);
  });

  it('can change "isComputer" property', () => {
    player = new Player(user, {isComputer: false});
    player.isComputer = true;
    assert.strictEqual(player.isComputer, true);
  });

  it('uses `toString()` to get string representation', () => {
    player = new Player('Tom');
    assert.strictEqual(player.toString(), 'Tom');

    player = new Player({name: 'Jerry', toString() { return this.name; }});
    assert.strictEqual(player.toString(), 'Jerry');
    assert.strictEqual(`${player}`, 'Jerry');
    assert.strictEqual('' + player, 'Jerry');
  });


});
