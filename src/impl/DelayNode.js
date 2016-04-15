"use strict";

const util = require("../util");
const AudioNode = require("./AudioNode");
const DelayNodeDSP = require("./dsp/DelayNode");

class DelayNode extends AudioNode {
  constructor(context, opts) {
    opts = opts || /* istanbul ignore next */ {};

    let maxDelayTime = util.defaults(opts.maxDelayTime, 1);

    super(context, {
      inputs: [ 1 ],
      outputs: [ 1 ],
      channelCount: 2,
      channelCountMode: "max"
    });
    this._maxDelayTime = Math.max(0, util.toNumber(maxDelayTime));
    this._delayTime = this.addParam("audio", 0);

    this.dspInit(this._maxDelayTime);
  }

  getDelayTime() {
    return this._delayTime;
  }

  getMaxDelayTime() {
    return this._maxDelayTime;
  }

  channelDidUpdate(numberOfChannels) {
    this.dspSetNumberOfChannels(numberOfChannels);
    this.getOutput(0).setNumberOfChannels(numberOfChannels);
  }
}

module.exports = util.mixin(DelayNode, DelayNodeDSP);