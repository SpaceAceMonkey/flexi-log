Flexi-Log
--
A simple, but flexible, Node tool for logging to the console.

This package is designed to help developers organize and output debug and informational data. Currently, it logs only to the console. I may add file-based logging if I find a need, or if others request it, but there are existing solutions for that. For now, you can redirect the console to a file, or to another tool, if you want to do more with it.

General usage
--
Simply install, require, and log.

```
/* From the command line */
npm install --save flexi-log
```

```
/* index.js */
const logger = new(require('flexi-log'))();

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

**Somewhat practical examples**
--

>Basic descent/ascent

This is a very simple example of how pushLabel()/popLabel() are useful for logging while descending into and ascending from code. Pretend the loops are functions or separate portions of your code.

```
const logger = new (require('flexi-log'))();
//------
logger.pushLabel("First Level");
for (let i = 0; i < 1; i++) {
    logger.log("Just starting out");
    //------
    logger.pushLabel("Second Level");
    for (let i = 0; i < 1; i++) {
        logger.log("Diving in");
        //------
        logger.pushLabel("Third Level");
        for (let i = 0; i < 1; i++) {
            logger.log("Almost there");
            //------
            logger.pushLabel("Bottom!");
            logger.log("We made it")
            for (let i = 0; i < 10; i++) {
                logger.log("Doing some work");
            }
            logger.log("Ascending...");
        }
        logger.popLabel();
        logger.log("Still pretty deep")
    }
    logger.popLabel();
    logger.log("I can see light!")
}
logger.popLabel();
logger.log("It's good to be back on the surface");
```

**Result**

```
[First Level]: Just starting out
[Second Level]: Diving in
[Third Level]: Almost there
[Bottom!]: We made it
[Bottom!]: Doing some work
[Bottom!]: Doing some work
[Bottom!]: Doing some work
[Bottom!]: Doing some work
[Bottom!]: Doing some work
[Bottom!]: Doing some work
[Bottom!]: Doing some work
[Bottom!]: Doing some work
[Bottom!]: Doing some work
[Bottom!]: Doing some work
[Bottom!]: Ascending...
[Third Level]: Still pretty deep
[Second Level]: I can see light!
[First Level]: It's good to be back on the surface
```

>showOnly/ignore

This code demonstrates the effects of the showOnly and ignore arrays.

```
    const logger = new (require('flexi-log'))();

    /**
     * It is not necessary to declare these as empty. I have included
     * them, here, to make the next few examples more clear.
     */
    logger.showOnly = [];
    logger.ignore = [];

    logger.log("Some normal informational output.");
    logger.log("Some more normal informational output.");
    logger.pushLabel("INFO");
    for (let i = 0; i < 30; i++) {
        logger.log("This is some way-too-verbose output you don't really need.");
    }
    logger.popLabel();
    logger.log("This probably doesn't matter too much.");
    logger.log("This, either.");
    logger.pushLabel("WARN")
    logger.log("Some stuff you probably want to know about, but it's not urgent.");
    logger.log("Some stuff you probably want to know about, but it's not urgent.");
    logger.log("Some stuff you probably want to know about, but it's not urgent.");
    logger.log("Some stuff you probably want to know about, but it's not urgent.");
    logger.popLabel();
    logger.log("More everyday stuff.");
    logger.log("Even more everyday stuff.");
    logger.pushLabel("DANGER");
    logger.log("Now this is something you care about.");
    logger.log("You definitely need to know about this.");
    logger.popLabel();
    logger.log("Back to hum-drum stuff.");
    logger.log("Nothing too important going on, here.");
```

**Result**

```
[DEBUG]: Some normal informational output.
[DEBUG]: Some more normal informational output.
[INFO]: This is some way-too-verbose output you don't really need.
[INFO]: This is some way-too-verbose output you don't really need.
[INFO]: This is some way-too-verbose output you don't really need.
[INFO]: This is some way-too-verbose output you don't really need.
[INFO]: This is some way-too-verbose output you don't really need.
[INFO]: This is some way-too-verbose output you don't really need.
[INFO]: This is some way-too-verbose output you don't really need.
[INFO]: This is some way-too-verbose output you don't really need.
[INFO]: This is some way-too-verbose output you don't really need.
[INFO]: This is some way-too-verbose output you don't really need.
[INFO]: This is some way-too-verbose output you don't really need.
[INFO]: This is some way-too-verbose output you don't really need.
[INFO]: This is some way-too-verbose output you don't really need.
[INFO]: This is some way-too-verbose output you don't really need.
[INFO]: This is some way-too-verbose output you don't really need.
[INFO]: This is some way-too-verbose output you don't really need.
[INFO]: This is some way-too-verbose output you don't really need.
[INFO]: This is some way-too-verbose output you don't really need.
[INFO]: This is some way-too-verbose output you don't really need.
[INFO]: This is some way-too-verbose output you don't really need.
[INFO]: This is some way-too-verbose output you don't really need.
[INFO]: This is some way-too-verbose output you don't really need.
[INFO]: This is some way-too-verbose output you don't really need.
[INFO]: This is some way-too-verbose output you don't really need.
[INFO]: This is some way-too-verbose output you don't really need.
[INFO]: This is some way-too-verbose output you don't really need.
[INFO]: This is some way-too-verbose output you don't really need.
[INFO]: This is some way-too-verbose output you don't really need.
[INFO]: This is some way-too-verbose output you don't really need.
[INFO]: This is some way-too-verbose output you don't really need.
[DEBUG]: This probably doesn't matter too much.
[DEBUG]: This, either.
[WARN]: Some stuff you probably want to know about, but it's not urgent.
[WARN]: Some stuff you probably want to know about, but it's not urgent.
[WARN]: Some stuff you probably want to know about, but it's not urgent.
[WARN]: Some stuff you probably want to know about, but it's not urgent.
[DEBUG]: More everyday stuff.
[DEBUG]: Even more everyday stuff.
[DANGER]: Now this is something you care about.
[DANGER]: You definitely need to know about this.
[DEBUG]: Back to hum-drum stuff.
[DEBUG]: Nothing too important going on, here.
```

That's a lot of text, and you may not be interested in all of it at this particular point in your code. Let's slim it down a little.

```
/**
  ...
*/

logger.ignore = ['INFO'];

/**
  ...
*/
```

**Result**

```
[DEBUG]: Some normal informational output.
[DEBUG]: Some more normal informational output.
[DEBUG]: This probably doesn't matter too much.
[DEBUG]: This, either.
[WARN]: Some stuff you probably want to know about, but it's not urgent.
[WARN]: Some stuff you probably want to know about, but it's not urgent.
[WARN]: Some stuff you probably want to know about, but it's not urgent.
[WARN]: Some stuff you probably want to know about, but it's not urgent.
[DEBUG]: More everyday stuff.
[DEBUG]: Even more everyday stuff.
[DANGER]: Now this is something you care about.
[DANGER]: You definitely need to know about this.
[DEBUG]: Back to hum-drum stuff.
[DEBUG]: Nothing too important going on, here.
```

That's quite a bit better, but what if you have thirty or forty tags being logged throughout your application? You don't want to have to list all those tags in the ignore[] array. In the case where you want to hide more tags than you want to show, use showOnly[].

```
/**
  ...
*/

logger.showOnly = ['WARN', 'DANGER'];

/**
  ...
*/
```

**Result**

```
[WARN]: Some stuff you probably want to know about, but it's not urgent.
[WARN]: Some stuff you probably want to know about, but it's not urgent.
[WARN]: Some stuff you probably want to know about, but it's not urgent.
[WARN]: Some stuff you probably want to know about, but it's not urgent.
[DANGER]: Now this is something you care about.
[DANGER]: You definitely need to know about this.
```

That's really trimmed down your output, and will make life easier for you while you're watching the console to see what your application is up to.

It's important to understand that ignore has higher precedence than showOnly. If a tag shows up in both arrays, its messages will not be displayed.

```
/**
  ...
*/

logger.showOnly = ['WARN', 'DANGER'];
logger.ignore = ['WARN'];

/**
  ...
*/
```

**Result**

```
[DANGER]: Now this is something you care about.
[DANGER]: You definitely need to know about this.
```

In this case, we told flexi-log to show only WARN, and DANGER, but we also told it to ignore WARN. The result is that we only see DANGER output.

>a semi-realistic usage of flexi-log



This code simulates a variety of paths your code might take when retrieving and verifying data.

```
const logger = new(require('./flexi-log.js'));
const sprintf = require('sprintf');

function doSomething() {
    logger.pushLabel("DOING");
    logger.log("Beginning fetch-and-test process.");

    const stuff = get_data();

    if (Array.isArray(stuff)) {
        logger.pushLabel("TESTING");
        const TARGET_LENGTH = 4;
        const TARGET_DATA_TYPE = 'string';

        for (let i = 0; i < stuff.length; i++) {
            const current_stuff = stuff[i];
            if (typeof current_stuff === TARGET_DATA_TYPE) {
                const stuff_length = current_stuff.length;
                if (stuff_length === TARGET_LENGTH) {
                    logger.log("String '" + current_stuff + "' passes test.");
                }
                else {
                    const string_length_error_message = 
                        "String '%s' is %s; must be exactly %s characters in length.";

                    let error_message_modifier = 'too long';
                    if (stuff_length < TARGET_LENGTH) {
                        error_message_modifier = 'too short';
                    }

                    logger.log(
                        sprintf.sprintf(
                            string_length_error_message,
                            current_stuff,
                            error_message_modifier,
                            TARGET_LENGTH
                        )
                    );
                }
            }
            else {
                logger.log(
                    sprintf.sprintf(
                        "Error: expected a(n) %s, but got a(n) %s at index %d",
                        TARGET_DATA_TYPE,
                        typeof current_stuff_type,
                        i
                    )
                );
            }
        }

        logger.popLabel();
    }
    else {
        const stuff_type = typeof stuff;
        /**
         * For the purposes of this demo, undefined means a database
         * failure, and not an unexpected data type. We don't need
         * to show this message in that case, because we already
         * showed a failure message when we couldn't connect to the
         * database.
         * 
         * Obviously, production code would handle this in a more
         * comprehensive manner.
         */
        if (stuff_type !== 'undefined') {
            logger.log(
                sprintf.sprintf(
                    "Error: Unexpected value for stuff; must be an array, received %s.",
                    typeof stuff
                )
            );
        }
    }

    logger.log("Process complete.");
}

function get_data() {
    logger.pushLabel("FETCHING");

    const connectionSuccessful = connectToDatabase();
    let database_result;
    if (connectionSuccessful) {
        logger.log("Connected to database");
        database_result = selectValuesFromDatabase();
    } else {
        logger.log("Error: Database connection failed.");
    }

    logger.popLabel();

    return database_result;
}

function connectToDatabase() {
    logger.log("Connecting to database");
    const possible_values = [true, false];
    const selected_value = possible_values[Math.floor(Math.random() * possible_values.length)];

    return selected_value;
}

function selectValuesFromDatabase() {
    logger.log("Selecting values from database");
    const possible_values = [
        ['this', 'that', 'and', 'the other'],
        ['the', 'quick', [], 'fox'],
        null
    ];

    const selected_value = possible_values[Math.floor(Math.random() * possible_values.length)];

    return selected_value;
}
```

```
doSomething();
```

**Some outputs from the code, above**

```
[DOING]: Beginning fetch-and-test process.
[FETCHING]: Connecting to database
[FETCHING]: Connected to database
[FETCHING]: Selecting values from database
[TESTING]: String 'the' is too short; must be exactly 4 characters in length.
[TESTING]: String 'quick' is too long; must be exactly 4 characters in length.
[TESTING]: Error: expected a(n) string, but got a(n) undefined at index 2
[TESTING]: String 'fox' is too short; must be exactly 4 characters in length.
[DOING]: Process complete.
```

```
[DOING]: Beginning fetch-and-test process.
[FETCHING]: Connecting to database
[FETCHING]: Connected to database
[FETCHING]: Selecting values from database
[TESTING]: String 'this' passes test.
[TESTING]: String 'that' passes test.
[TESTING]: String 'and' is too short; must be exactly 4 characters in length.
[TESTING]: String 'the other' is too long; must be exactly 4 characters in length.
[DOING]: Process complete.
```

```
[DOING]: Beginning fetch-and-test process.
[FETCHING]: Connecting to database
[FETCHING]: Error: Database connection failed.
[DOING]: Process complete.
```

```
[DOING]: Beginning fetch-and-test process.
[FETCHING]: Connecting to database
[FETCHING]: Connected to database
[FETCHING]: Selecting values from database
[DOING]: Error: Unexpected value for stuff; must be an array, received object.
[DOING]: Process complete.
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
