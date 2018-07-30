const logger = require('../index.js');

if (logger.getLabel() !== undefined) {
    throw new Error("Label should be null, but is '" + logger.getLabel() + "'");
}

const test_label = 'Test label';
logger.label = test_label;
if (logger.getLabel() !== test_label) {
    throw new Error("Label should be '" + test_label + "', but is '" + logger.getLabel() + "'");
}
if (logger.labelStack.length !== 0) {
    throw new Error("Label stack should contain 0 elements; contains " + logger.labelStack.length);
}

const pushLabels = [
    "A label",
    "Another label",
    "A third label",
    "Chicken bolognese"
];
let labelStackLengthTarget = pushLabels.length;
for (let i = pushLabels.length - 1; i >= 0; i--) {
    logger.pushLabel(pushLabels[i]);
}
for (let i = 0; i < pushLabels.length; i++) {
    if (logger.getLabel() !== pushLabels[i]) {
        throw new Error("Label should be '" + pushLabels[i] + "', but is '" + logger.getLabel() + "'");
    }
    if (logger.labelStack.length !== labelStackLengthTarget) {
        throw new Error("Label stack should contain " + labelStackLengthTarget + " elements; contains " + logger.labelStack.length);
    }
    logger.popLabel();
    labelStackLengthTarget--;
}

console.log("All tests passed.");