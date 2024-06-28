import { EventEmitter } from 'events';

class BlockUI extends EventEmitter {
  show() {
    this.emit('show');
  }

  hide() {
    this.emit('hide');
  }
}

const blockUI = new BlockUI();
export default blockUI;
