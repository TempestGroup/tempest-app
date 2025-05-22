import { EventEmitter } from 'events';

class BlockUI extends EventEmitter {
  show() {
    this.emit('show');
  }

  hide() {
    this.emit('hide');
  }
}

const BlockUIUtil = new BlockUI();
export default BlockUIUtil;
