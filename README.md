Flexi-Log
--
A simple, but flexible, tool for logging to the console.

This package is designed to help developers organize and output debug and informational data. Currently, it logs only to the console. I may add file-based logging if I find a need, or if others request it, but there are existing solutions for that. For now, you can redirect the console to a file, or to another tool if you want to do more with it.

General usage
--
Simply install, require, and log.

```
/* From the command line */
npm install --save flexi-log
```

```
/* index.js */
const logger = new(require('./flexi-log.js'))();

logger.log("This is my message.");
logger.pushLabel("MyLabel");
logger.log("What's the label on this?");
logger.pushLabel("NEW_SECTION");
logger.log("Uhoh, a new section which requires a new label.");
logger.log("Still in that new section.");
logger.popLabel();
logger.log("Ok, we're done with that last label.");
logger.popLabel();
logger.log("Whew! Back home.");
```

```
/* Console output */
[DEBUG]: This is my message.
[MyLabel]: What's the label on this?
[NEW_SECTION]: Uhoh, a new section which requires a new label.
[NEW_SECTION]: Still in that new section.
[MyLabel]: Ok, we're done with that last label.
[DEBUG]: Whew! Back home.
```

Methods and Properties
--

This is a very brief overview. For more details, including function arguments, check the jsdoc comments in the source. You can also run jsdoc on flexi-log.js to produce html documentation.

**Methods**

```disable```

Turns off logging output.

----

```enable```

Turns on logging output.

----

```getLabel```

Return the current label.

----

```log```

Output a line to the console, using the current label. Output from this function is subject to the enabled/disabled state of the logger, as well as the ignore[] and showOnly[] arrays.

----

```popLabel```

Remove the top label from the stack, and set it as the current label.

----

```pushLabel```

Push a new label onto the label stack, and set it as the current label.

----

```setLabel```

Set the current log label. This label will not be added to the label stack.

----



**Properties**

```ignore```

An array of strings representing labels. Any log lines with a label in this array will not be ouput when log() is called. This array has higher precedence than showOnly. Therefore, any messages with labels contained in this array will be surpressed, regardless of whether they are also in showOnly[].

----

```label```

The current label being applied to all log() actions.

----

```labelStack```

An array which holds labels which are pushed or popped via pushLabel() and popLabel().

----

```LOGGING_ENABLED```

A boolean which controls the main state of the logger. If this is false, no lines will be logged when log() is called.

----

```showOnly```

An array of strings representing labels to show. If this array has any values in it, only log lines with labels contained in this array will be shown. This array is subserviant to the ignore[] array. Therefore, labels that appear both in here, and in ignore[], will not be shown.