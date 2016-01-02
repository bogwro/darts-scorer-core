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


});
