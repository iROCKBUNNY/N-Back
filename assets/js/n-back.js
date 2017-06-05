// n-back.js

var stimuliPool = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'];

function getStimuli(step, totalNum, targetNum) {
    if (!(_.isNumber(step) && _.isNumber(totalNum) && _.isNumber(targetNum) && step >= 0)) {
        return;
    };
    var stimuli = [];
    if (step === 0) {
        for (var i = 0; i < totalNum; i++) {
            stimuli.push({
                'stimulus': _.sample(stimuliPool),
                'is_target': true
            });
        };
    } else {
        for (var i = 0; i < totalNum; i++) {
            if (i < step) {
                stimuli.push({
                    'stimulus': _.sample(stimuliPool),
                    'is_target': false
                });
            } else {
                var target = _.nth(stimuli, -step);
                if (_.random(1, totalNum - i) <= targetNum) {
                    targetNum--;
                    stimuli.push({
                        'stimulus': target.stimulus,
                        'is_target': true
                    });
                } else {
                    stimuli.push({
                        'stimulus': _.sample(_.difference(stimuliPool, [target.stimulus])),
                        'is_target': false
                    });
                };
            };
        };
    };
    return stimuli;
};