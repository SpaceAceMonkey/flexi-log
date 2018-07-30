/*
flexi-log; A simple, but flexible, library to make logging to the console easy
Copyright (C) 2018

This program is free software: you can redistribute it and/or modify it under the terms of
the GNU General Public License as published by the Free Software Foundation, either
version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program.
If not, see <https://www.gnu.org/licenses/>.
*/

var sprintf = require('sprintf-js');

/**
 * @namespace flexi-log
 * @description Functions to make logging to the console quick and painless. Organizes
 * messages by labels, which can be thought of as similar to channels in some more complex
 * loggers.
 * @property {bool} LOGGING_ENABLED When true, messages sent to log() are output to the
 *  console; otherwise, output is suppressed.
 * @property {array} labelStack A LIFO queue for managing output labels as you descend
 *  into, and ascend out of, nested code blocks.
 * @property {string} label The current label to be prepended to each output line.
 * @property {array} ignore An array of labels to suppress when logging; if the current
 * label exists in this array, log() will not generate any output when called. This array
 * has higher precedence than showOnly, so a message with a label that appears in both
 * showOnly, and the ignore array, will be suppressed.
 * @property {array} showOnly If any values are set in this array, only log lines with
 * labels matching one of those values will be output. This array has lower precedence
 * than the ignore array, so a message with a label that appears in both arrays will
 * not be shown.
 */
module.exports = function flexi_log() {
    this.LOGGING_ENABLED = true;
    this.labelStack = [];
    this.label = null;

    this.ignore = [];
    this.showOnly = [];

    /**
     * @description Sets LOGGING_ENABLED to true, causing output to ge generated when
     * log() is called.
     * @memberof flexi-log
     */
    this.enable = function() {
        this.LOGGING_ENABLED = true;
    };

    /**
     * @description Causes all output to be suppressed.
     * @memberof flexi-log
     */
    this.disable = function() {
        this.LOGGING_ENABLED = false;
    };

    /**
     * @description Sets the current log label, and stores it on the top of the stack.
     * @memberof flexi-log
     * @param {string} newLabel The label to assign to subsequent log messages. This
     * label will also be pushed onto the label stack.
     */
    this.pushLabel = function(newLabel) {
        this.label = newLabel;
        this.labelStack.push(newLabel);
    };

    /**
     * @description Pops the previous log label off of the stack, and makes it the current
     * log label.
     * @memberof flexi-log
     */
    this.popLabel = function() {
        this.labelStack.pop();
        if (this.labelStack.length > 0) {
            this.label = this.labelStack[this.labelStack.length - 1];
        }
        else {
            this.label = undefined;
        }
    };

    /**
     * @description Returns the current log label
     * @memberof flexi-log
     */
    this.getLabel = function() {
        return this.label;
    };

    /**
     * @description Sets the current log label, but does not push that label onto the
     * label stack.
     * @memberof flexi-log
     * @param {string} newLabel The label to assign to subsequent log messages. This
     * label will _not_ be pushed onto the label stack.
     */
    this.setLabel = function(newLabel) {
        this.label = newLabel;
    };

    /**
     * @description Formats and outputs the string contained in message, using the current
     * label. Processes showOnly and ignore, and will output nothing if LOGGING_ENABLED is
     * not true.
     * @param {string} message The message to be logged
     * @param {string} _label The label to use for the current message. If no _label is
     * supplied, the current label will be used. If the current label is null, the label
     * will default to "DEBUG"
     */
    this.log  = function(message, _label = null) {
        if (this.LOGGING_ENABLED) {
            labelToUse = (_label ? _label : (this.label ? this.label : 'DEBUG'));
            if (
                this.showOnly.indexOf(labelToUse) > -1
                || (this.showOnly.length === 0 && this.ignore.indexOf(labelToUse) === -1)
            ) {
                console.log(
                    sprintf.sprintf(
                        "[%s]: %s",
                        labelToUse,
                        message
                    )
                );
            }
        }
    };
};
