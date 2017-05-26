import emitter from '../emitter';

const bindEmitter = (target) => {
    Object.assign(target.prototype, emitter.__proto__);
}

export default bindEmitter;