import { DirectCategory, SectionedCategory } from "../models/Category";
import { KbKey } from "../models/KbKey";
import { KeyGroup } from "../models/KeyGroup";
import { Section } from "../models/Section";


//region Numbers
const numbersNumbersGroup = new KeyGroup({
    id: 'numbers-group',
    name: 'Digits',
    items: [
        new KbKey({ id: 'number-0', name: 'zero', latex: '0' }),
        new KbKey({ id: 'number-1', name: 'one', latex: '1' }),
        new KbKey({ id: 'number-2', name: 'two', latex: '2' }),
        new KbKey({ id: 'number-3', name: 'three', latex: '3' }),
        new KbKey({ id: 'number-4', name: 'four', latex: '4' }),
        new KbKey({ id: 'number-5', name: 'five', latex: '5' }),
        new KbKey({ id: 'number-6', name: 'six', latex: '6' }),
        new KbKey({ id: 'number-7', name: 'seven', latex: '7' }),
        new KbKey({ id: 'number-8', name: 'eight', latex: '8' }),
        new KbKey({ id: 'number-9', name: 'nine', latex: '9' }),
        new KbKey({ id: 'decimal', name: 'decimal point', latex: '.' }),
        new KbKey({ id: 'comma', name: 'comma', latex: ',' }),
    ]
});

const numbersConstGroup = new KeyGroup({
    id: 'constants-group',
    name: 'Mathematical Constants',
    items: [
        new KbKey({ id: 'pi', name: 'pi', latex: '\\pi' }),
        new KbKey({ id: 'euler', name: 'eulers number', latex: 'e' }),
        new KbKey({ id: 'infinity', name: 'infinity', latex: '\\infty' }),
        new KbKey({ id: 'theta', name: 'theta', latex: '\\theta' }),
        new KbKey({ id: 'phi', name: 'phi', latex: '\\varphi' }),
        new KbKey({ id: 'sqrt2', name: 'sqrt 2', latex: '\\sqrt{2}' }),
    ]
});

function getNumbersCategory(): DirectCategory {
    const category = new DirectCategory({
        id: 'numbers',
        name: 'Numbers',
        items: [numbersNumbersGroup, numbersConstGroup]
    });
    return category;
}
//#endregion


//region Operators
const operatorsCommonGroup = new KeyGroup({
    id: 'operators-common-group',
    name: 'Common Operators',
    items: [
        new KbKey({ id: 'op-common-plus', name: 'plus', latex: '+' }),
        new KbKey({ id: 'op-common-minus', name: 'minus', latex: '-' }),
        new KbKey({ id: 'op-common-asterisk', name: 'asterisk', latex: '*' }),
        new KbKey({ id: 'op-common-slash', name: 'slash', latex: '/' }),
        new KbKey({ id: 'op-common-percent', name: 'percent', latex: '\\%' }),
        new KbKey({ id: 'op-common-pm', name: 'plus-minus', latex: '\\pm' }),
        new KbKey({ id: 'op-common-times', name: 'times', latex: '\\times' }),
        new KbKey({ id: 'op-common-div', name: 'divide', latex: '\\div' }),
        new KbKey({ id: 'op-common-cdot', name: 'center dot', latex: '\\cdot' }),
        new KbKey({ id: 'op-common-eq', name: 'equals', latex: '=' }),
        new KbKey({ id: 'op-common-neq', name: 'not equal', latex: '\\neq' }),
        new KbKey({ id: 'op-common-lt', name: 'less than', latex: '<' }),
        new KbKey({ id: 'op-common-gt', name: 'greater than', latex: '>' }),
        new KbKey({ id: 'op-common-leq', name: 'less than or equal', latex: '\\leq' }),
        new KbKey({ id: 'op-common-geq', name: 'greater than or equal', latex: '\\geq' }),
        new KbKey({ id: 'op-common-factorial', name: 'factorial', latex: '!' }),
        new KbKey({ id: 'op-common-infty', name: 'infinity', latex: '\\infty' }),
        new KbKey({ id: 'op-common-prime', name: 'prime', latex: "'" }),
        new KbKey({ id: 'op-common-in', name: 'element of', latex: '\\in' }),
        new KbKey({ id: 'op-common-notin', name: 'not element of', latex: '\\notin' }),
        new KbKey({ id: 'op-common-therefore', name: 'therefore', latex: '\\therefore' }),
        new KbKey({ id: 'op-common-because', name: 'because', latex: '\\because' }),
        new KbKey({ id: 'op-common-approx', name: 'approximately equal', latex: '\\approx' }),
        new KbKey({ id: 'op-common-land', name: 'logical and', latex: '\\land' }),
        new KbKey({ id: 'op-common-lor', name: 'logical or', latex: '\\lor' }),
        new KbKey({ id: 'op-common-rightarrow', name: 'right arrow', latex: '\\rightarrow' }),
        new KbKey({ id: 'op-common-circ', name: 'circle operator', latex: '\\circ' }),
        new KbKey({ id: 'op-common-propto', name: 'proportional to', latex: '\\propto' }),
    ]
});

const operatorsCommonSection = new Section({
    id: 'operators-common',
    name: 'Common',
    items: [operatorsCommonGroup]
});

const operatorsArithmeticGroup = new KeyGroup({
    id: 'operators-arithmetic-group',
    name: 'Arithmetic Operators',
    items: [
        new KbKey({ id: 'op-arith-plus', name: 'plus', latex: '+' }),
        new KbKey({ id: 'op-arith-minus', name: 'minus', latex: '-' }),
        new KbKey({ id: 'op-arith-asterisk', name: 'asterisk', latex: '*' }),
        new KbKey({ id: 'op-arith-slash', name: 'slash', latex: '/' }),
        new KbKey({ id: 'op-arith-percent', name: 'percent', latex: '\\%' }),
        new KbKey({ id: 'op-arith-pm', name: 'plus-minus', latex: '\\pm' }),
        new KbKey({ id: 'op-arith-times', name: 'times', latex: '\\times' }),
        new KbKey({ id: 'op-arith-div', name: 'divide', latex: '\\div' }),
        new KbKey({ id: 'op-arith-cdot', name: 'center dot', latex: '\\cdot' }),
        new KbKey({ id: 'op-arith-factorial', name: 'factorial', latex: '!' }),
        new KbKey({ id: 'op-arith-mp', name: 'minus-plus', latex: '\\mp' }),
        new KbKey({ id: 'op-arith-circ', name: 'circle operator', latex: '\\circ' }),
        new KbKey({ id: 'op-arith-bullet', name: 'bullet operator', latex: '\\bullet' }),
        new KbKey({ id: 'op-arith-oplus', name: 'circled plus', latex: '\\oplus' }),
        new KbKey({ id: 'op-arith-ominus', name: 'circled minus', latex: '\\ominus' }),
        new KbKey({ id: 'op-arith-otimes', name: 'circled times', latex: '\\otimes' }),
        new KbKey({ id: 'op-arith-oslash', name: 'circled slash', latex: '\\oslash' }),
        new KbKey({ id: 'op-arith-odot', name: 'circled dot', latex: '\\odot' }),
        new KbKey({ id: 'op-arith-circledast', name: 'circled asterisk', latex: '\\circledast' }),
        new KbKey({ id: 'op-arith-circledcirc', name: 'circled circle', latex: '\\circledcirc' }),
        new KbKey({ id: 'op-arith-circleddash', name: 'circled dash', latex: '\\circleddash' }),
        new KbKey({ id: 'op-arith-star', name: 'star operator', latex: '\\star' }),
        new KbKey({ id: 'op-arith-ast', name: 'asterisk operator', latex: '\\ast' }),
        new KbKey({ id: 'op-arith-dagger', name: 'dagger', latex: '\\dagger' }),
        new KbKey({ id: 'op-arith-ddagger', name: 'double dagger', latex: '\\ddagger' }),
        new KbKey({ id: 'op-arith-amalg', name: 'amalgamation', latex: '\\amalg' }),
        new KbKey({ id: 'op-arith-boxdot', name: 'box dot', latex: '\\boxdot' }),
        new KbKey({ id: 'op-arith-boxplus', name: 'box plus', latex: '\\boxplus' }),
        new KbKey({ id: 'op-arith-boxminus', name: 'box minus', latex: '\\boxminus' }),
        new KbKey({ id: 'op-arith-boxtimes', name: 'box times', latex: '\\boxtimes' }),
        new KbKey({ id: 'op-arith-divideontimes', name: 'divide on times', latex: '\\divideontimes' }),
        new KbKey({ id: 'op-arith-dotplus', name: 'dot plus', latex: '\\dotplus' }),
        new KbKey({ id: 'op-arith-intercal', name: 'intercal', latex: '\\intercal' }),
        new KbKey({ id: 'op-arith-leftthreetimes', name: 'left three times', latex: '\\leftthreetimes' }),
        new KbKey({ id: 'op-arith-rightthreetimes', name: 'right three times', latex: '\\rightthreetimes' }),
        new KbKey({ id: 'op-arith-ltimes', name: 'left semidirect product', latex: '\\ltimes' }),
        new KbKey({ id: 'op-arith-rtimes', name: 'right semidirect product', latex: '\\rtimes' }),
        new KbKey({ id: 'op-arith-wr', name: 'wreath product', latex: '\\wr' }),
        new KbKey({ id: 'op-arith-ldotp', name: 'dot on baseline', latex: '\\ldotp' }),
        new KbKey({ id: 'op-arith-centerdot', name: 'center dot variant', latex: '\\centerdot' }),
        new KbKey({ id: 'op-arith-barwedge', name: 'bar wedge', latex: '\\barwedge' }),
        new KbKey({ id: 'op-arith-doublebarwedge', name: 'double bar wedge', latex: '\\doublebarwedge' }),
        new KbKey({ id: 'op-arith-bmod', name: 'binary modulo', latex: '\\bmod' }),
    ]
});

const arithmeticSection = new Section({
    id: 'operators-arithmetic',
    name: 'Arithmetic',
    items: [operatorsArithmeticGroup]
});

const operatorsRelationsBasicGroup = new KeyGroup({
    id: 'operators-relations-basic',
    name: 'Basic Relations',
    items: [
        new KbKey({ id: 'op-rel-eq', name: 'equals', latex: '=' }),
        new KbKey({ id: 'op-rel-neq', name: 'not equal', latex: '\\neq' }),
        new KbKey({ id: 'op-rel-lt', name: 'less than', latex: '<' }),
        new KbKey({ id: 'op-rel-gt', name: 'greater than', latex: '>' }),
        new KbKey({ id: 'op-rel-leq', name: 'less than or equal', latex: '\\leq' }),
        new KbKey({ id: 'op-rel-geq', name: 'greater than or equal', latex: '\\geq' }),
    ]
});

const operatorsRelationsAdvancedGroup = new KeyGroup({
    id: 'operators-relations-advanced',
    name: 'Advanced Relations',
    items: [
        new KbKey({ id: 'op-rel-approx', name: 'approximately equal', latex: '\\approx' }),
        new KbKey({ id: 'op-rel-approxeq', name: 'approximate or equal', latex: '\\approxeq' }),
        new KbKey({ id: 'op-rel-cong', name: 'congruent', latex: '\\cong' }),
        new KbKey({ id: 'op-rel-sim', name: 'similar', latex: '\\sim' }),
        new KbKey({ id: 'op-rel-simeq', name: 'similar or equal', latex: '\\simeq' }),
        new KbKey({ id: 'op-rel-equiv', name: 'equivalent', latex: '\\equiv' }),
        new KbKey({ id: 'op-rel-propto', name: 'proportional to', latex: '\\propto' }),
        new KbKey({ id: 'op-rel-varpropto', name: 'variant proportional to', latex: '\\varpropto' }),
        new KbKey({ id: 'op-rel-doteq', name: 'approaches limit', latex: '\\doteq' }),
        new KbKey({ id: 'op-rel-doteqdot', name: 'geometric equals', latex: '\\doteqdot' }),
        new KbKey({ id: 'op-rel-bumpeq', name: 'bumpy equals', latex: '\\bumpeq' }),
        new KbKey({ id: 'op-rel-Bumpeq', name: 'Bumpy equals variant', latex: '\\Bumpeq' }),
        new KbKey({ id: 'op-rel-circeq', name: 'circle equals', latex: '\\circeq' }),
        new KbKey({ id: 'op-rel-eqcirc', name: 'equals circle', latex: '\\eqcirc' }),
        new KbKey({ id: 'op-rel-eqsim', name: 'equals similar', latex: '\\eqsim' }),
        new KbKey({ id: 'op-rel-risingdotseq', name: 'rising dots equals', latex: '\\risingdotseq' }),
        new KbKey({ id: 'op-rel-fallingdotseq', name: 'falling dots equals', latex: '\\fallingdotseq' }),
        new KbKey({ id: 'op-rel-triangleq', name: 'equal by definition', latex: '\\triangleq' }),
        new KbKey({ id: 'op-rel-coloneqq', name: 'colon equals', latex: ':=\\coloneqq' }),
        new KbKey({ id: 'op-rel-ll', name: 'much less than', latex: '\\ll' }),
        new KbKey({ id: 'op-rel-gg', name: 'much greater than', latex: '\\gg' }),
        new KbKey({ id: 'op-rel-lll', name: 'very much less than', latex: '\\lll' }),
        new KbKey({ id: 'op-rel-ggg', name: 'very much greater than', latex: '\\ggg' }),
        new KbKey({ id: 'op-rel-prec', name: 'precedes', latex: '\\prec' }),
        new KbKey({ id: 'op-rel-succ', name: 'succeeds', latex: '\\succ' }),
        new KbKey({ id: 'op-rel-preceq', name: 'precedes or equals', latex: '\\preceq' }),
        new KbKey({ id: 'op-rel-succeq', name: 'succeeds or equals', latex: '\\succeq' }),
        new KbKey({ id: 'op-rel-curlyeqprec', name: 'curly equals precedes', latex: '\\curlyeqprec' }),
        new KbKey({ id: 'op-rel-curlyeqsucc', name: 'curly equals succeeds', latex: '\\curlyeqsucc' }),
        new KbKey({ id: 'op-rel-lessdot', name: 'less than dot', latex: '\\lessdot' }),
        new KbKey({ id: 'op-rel-gtrdot', name: 'greater than dot', latex: '\\gtrdot' }),
        new KbKey({ id: 'op-rel-lesssim', name: 'less or similar', latex: '\\lesssim' }),
        new KbKey({ id: 'op-rel-gtrsim', name: 'greater or similar', latex: '\\gtrsim' }),
        new KbKey({ id: 'op-rel-lessapprox', name: 'less or approximate', latex: '\\lessapprox' }),
        new KbKey({ id: 'op-rel-gtrapprox', name: 'greater or approximate', latex: '\\gtrapprox' }),
        new KbKey({ id: 'op-rel-lesseqgtr', name: 'less equal greater', latex: '\\lesseqgtr' }),
        new KbKey({ id: 'op-rel-gtreqless', name: 'greater equal less', latex: '\\gtreqless' }),
        new KbKey({ id: 'op-rel-lesseqqgtr', name: 'less equal greater variant', latex: '\\lesseqqgtr' }),
        new KbKey({ id: 'op-rel-gtreqqless', name: 'greater equal less variant', latex: '\\gtreqqless' }),
        new KbKey({ id: 'op-rel-lessgtr', name: 'less or greater', latex: '\\lessgtr' }),
        new KbKey({ id: 'op-rel-gtrless', name: 'greater or less', latex: '\\gtrless' }),
        new KbKey({ id: 'op-rel-vartriangleleft', name: 'variant triangle left', latex: '\\vartriangleleft' }),
        new KbKey({ id: 'op-rel-vartriangleright', name: 'variant triangle right', latex: '\\vartriangleright' }),
        new KbKey({ id: 'op-rel-trianglelefteq', name: 'triangle left or equal', latex: '\\trianglelefteq' }),
        new KbKey({ id: 'op-rel-trianglerighteq', name: 'triangle right or equal', latex: '\\trianglerighteq' }),
        new KbKey({ id: 'op-rel-subset', name: 'subset', latex: '\\subset' }),
        new KbKey({ id: 'op-rel-supset', name: 'superset', latex: '\\supset' }),
        new KbKey({ id: 'op-rel-subseteq', name: 'subset or equal', latex: '\\subseteq' }),
        new KbKey({ id: 'op-rel-supseteq', name: 'superset or equal', latex: '\\supseteq' }),
        new KbKey({ id: 'op-rel-sqsubset', name: 'square subset', latex: '\\sqsubset' }),
        new KbKey({ id: 'op-rel-sqsupset', name: 'square superset', latex: '\\sqsupset' }),
        new KbKey({ id: 'op-rel-sqsubseteq', name: 'square subset or equal', latex: '\\sqsubseteq' }),
        new KbKey({ id: 'op-rel-sqsupseteq', name: 'square superset or equal', latex: '\\sqsupseteq' }),
        new KbKey({ id: 'op-rel-Subset', name: 'Subset variant', latex: '\\Subset' }),
        new KbKey({ id: 'op-rel-Supset', name: 'Superset variant', latex: '\\Supset' }),
        new KbKey({ id: 'op-rel-subseteqq', name: 'subset or equal variant', latex: '\\subseteqq' }),
        new KbKey({ id: 'op-rel-supseteqq', name: 'superset or equal variant', latex: '\\supseteqq' }),
        new KbKey({ id: 'op-rel-mid', name: 'divides / such that', latex: '\\mid' }),
        new KbKey({ id: 'op-rel-parallel', name: 'parallel', latex: '\\parallel' }),
        new KbKey({ id: 'op-rel-perp', name: 'perpendicular', latex: '\\perp' }),
        new KbKey({ id: 'op-rel-smile', name: 'smile', latex: '\\smile' }),
        new KbKey({ id: 'op-rel-frown', name: 'frown', latex: '\\frown' }),
        new KbKey({ id: 'op-rel-bowtie', name: 'bowtie', latex: '\\bowtie' }),
        new KbKey({ id: 'op-rel-vdash', name: 'turnstile', latex: '\\vdash' }),
        new KbKey({ id: 'op-rel-dashv', name: 'reverse turnstile', latex: '\\dashv' }),
        new KbKey({ id: 'op-rel-models', name: 'models', latex: '\\models' }),
        new KbKey({ id: 'op-rel-pitchfork', name: 'pitchfork', latex: '\\pitchfork' }),
        new KbKey({ id: 'op-rel-backsim', name: 'backwards similar', latex: '\\backsim' }),
        new KbKey({ id: 'op-rel-backsimeq', name: 'backwards similar equal', latex: '\\backsimeq' }),
        new KbKey({ id: 'op-rel-between', name: 'between', latex: '\\between' }),
        new KbKey({ id: 'op-rel-multimap', name: 'multimap arrow', latex: '\\multimap' }),
        new KbKey({ id: 'op-rel-shortmid', name: 'short divides', latex: '\\shortmid' }),
        new KbKey({ id: 'op-rel-shortparallel', name: 'short parallel', latex: '\\shortparallel' }),
        new KbKey({ id: 'op-rel-smallfrown', name: 'small frown', latex: '\\smallfrown' }),
        new KbKey({ id: 'op-rel-smallsmile', name: 'small smile', latex: '\\smallsmile' }),
        new KbKey({ id: 'op-rel-asymp', name: 'asymptotically equal', latex: '\\asymp' }),
        new KbKey({ id: 'op-rel-backepsilon', name: 'backwards epsilon', latex: '\\backepsilon' }),
        new KbKey({ id: 'op-rel-colon', name: 'colon relation', latex: ':' }),
    ]
});

const relationsSection = new Section({
    id: 'operators-relations',
    name: 'Relations',
    items: [
        operatorsRelationsBasicGroup,
        operatorsRelationsAdvancedGroup
    ]
});

const operatorsNegatedGroup = new KeyGroup({
    id: 'operators-negated-group',
    name: 'Negated Relations',
    items: [
        new KbKey({ id: 'op-negrel-neq', name: 'not equal', latex: '\\neq' }),
        new KbKey({ id: 'op-negrel-nless', name: 'not less than', latex: '\\nless' }),
        new KbKey({ id: 'op-negrel-ngtr', name: 'not greater than', latex: '\\ngtr' }),
        new KbKey({ id: 'op-negrel-nleq', name: 'not less or equal', latex: '\\nleq' }),
        new KbKey({ id: 'op-negrel-ngeq', name: 'not greater or equal', latex: '\\ngeq' }),
        new KbKey({ id: 'op-negrel-ncong', name: 'not congruent', latex: '\\ncong' }),
        new KbKey({ id: 'op-negrel-nsim', name: 'not similar', latex: '\\nsim' }),
        new KbKey({ id: 'op-negrel-nparallel', name: 'not parallel', latex: '\\nparallel' }),
        new KbKey({ id: 'op-negrel-nmid', name: 'does not divide', latex: '\\nmid' }),
        new KbKey({ id: 'op-negrel-nshortmid', name: 'not short divides', latex: '\\nshortmid' }),
        new KbKey({ id: 'op-negrel-nshortparallel', name: 'not short parallel', latex: '\\nshortparallel' }),
        new KbKey({ id: 'op-negrel-nsubseteq', name: 'not subset or equal', latex: '\\nsubseteq' }),
        new KbKey({ id: 'op-negrel-nsupseteq', name: 'not superset or equal', latex: '\\nsupseteq' }),
        new KbKey({ id: 'op-negrel-subsetneq', name: 'proper subset not equal', latex: '\\subsetneq' }),
        new KbKey({ id: 'op-negrel-supsetneq', name: 'proper superset not equal', latex: '\\supsetneq' }),
        new KbKey({ id: 'op-negrel-varsubsetneq', name: 'variant proper subset not equal', latex: '\\varsubsetneq' }),
        new KbKey({ id: 'op-negrel-varsupsetneq', name: 'variant proper superset not equal', latex: '\\varsupsetneq' }),
        new KbKey({ id: 'op-negrel-subsetneqq', name: 'proper subset not equal variant', latex: '\\subsetneqq' }),
        new KbKey({ id: 'op-negrel-supsetneqq', name: 'proper superset not equal variant', latex: '\\supsetneqq' }),
        new KbKey({ id: 'op-negrel-varsubsetneqq', name: 'variant proper subset not equal variant', latex: '\\varsubsetneqq' }),
        new KbKey({ id: 'op-negrel-varsupsetneqq', name: 'variant proper superset not equal variant', latex: '\\varsupsetneqq' }),
        new KbKey({ id: 'op-negrel-ntriangleleft', name: 'not triangle left', latex: '\\ntriangleleft' }),
        new KbKey({ id: 'op-negrel-ntrianglelefteq', name: 'not triangle left or equal', latex: '\\ntrianglelefteq' }),
        new KbKey({ id: 'op-negrel-ntriangleright', name: 'not triangle right', latex: '\\ntriangleright' }),
        new KbKey({ id: 'op-negrel-ntrianglerighteq', name: 'not triangle right or equal', latex: '\\ntrianglerighteq' }),
        new KbKey({ id: 'op-negrel-nprec', name: 'does not precede', latex: '\\nprec' }),
        new KbKey({ id: 'op-negrel-npreceq', name: 'does not precede or equal', latex: '\\npreceq' }),
        new KbKey({ id: 'op-negrel-nsucc', name: 'does not succeed', latex: '\\nsucc' }),
        new KbKey({ id: 'op-negrel-nsucceq', name: 'does not succeed or equal', latex: '\\nsucceq' }),
        new KbKey({ id: 'op-negrel-precnapprox', name: 'precedes not approx', latex: '\\precnapprox' }),
        new KbKey({ id: 'op-negrel-precnsim', name: 'precedes not sim', latex: '\\precnsim' }),
        new KbKey({ id: 'op-negrel-lnapprox', name: 'less not approx', latex: '\\lnapprox' }),
        new KbKey({ id: 'op-negrel-lnsim', name: 'less not sim', latex: '\\lnsim' }),
        new KbKey({ id: 'op-negrel-succnapprox', name: 'succeeds not approx', latex: '\\succnapprox' }),
        new KbKey({ id: 'op-negrel-succnsim', name: 'succeeds not sim', latex: '\\succnsim' }),
        new KbKey({ id: 'op-negrel-lneq', name: 'less not equal', latex: '\\lneq' }),
        new KbKey({ id: 'op-negrel-gneq', name: 'greater not equal', latex: '\\gneq' }),
        new KbKey({ id: 'op-negrel-lneqq', name: 'less not equal variant', latex: '\\lneqq' }),
        new KbKey({ id: 'op-negrel-gneqq', name: 'greater not equal variant', latex: '\\gneqq' }),
        new KbKey({ id: 'op-negrel-lvertneqq', name: 'vertical less not equal', latex: '\\lvertneqq' }),
        new KbKey({ id: 'op-negrel-gvertneqq', name: 'vertical greater not equal', latex: '\\gvertneqq' }),
        new KbKey({ id: 'op-negrel-precneqq', name: 'precedes not equal variant', latex: '\\precneqq' }),
        new KbKey({ id: 'op-negrel-succneqq', name: 'succeeds not equal variant', latex: '\\succneqq' }),
        new KbKey({ id: 'op-negrel-nvdash', name: 'not turnstile', latex: '\\nvdash' }),
        new KbKey({ id: 'op-negrel-nvDash', name: 'not double turnstile', latex: '\\nvDash' }),
        new KbKey({ id: 'op-negrel-nVdash', name: 'not double vertical turnstile', latex: '\\nVdash' }),
        new KbKey({ id: 'op-negrel-nVDash', name: 'not double vertical double turnstile', latex: '\\nVDash' }),
        new KbKey({ id: 'op-negrel-notin', name: 'not element of', latex: '\\notin' }),
        new KbKey({ id: 'op-negrel-notni', name: 'does not contain element', latex: '\\notni' }),
    ]
});

const negatedRelationsSection = new Section({
    id: 'operators-negated',
    name: 'Negated',
    items: [operatorsNegatedGroup]
});

const operatorsSetLogicLogicGroup = new KeyGroup({
    id: 'operators-setlogic-logic',
    name: 'Logic',
    items: [
        new KbKey({ id: 'op-logic-forall', name: 'for all', latex: '\\forall' }),
        new KbKey({ id: 'op-logic-exists', name: 'exists', latex: '\\exists' }),
        new KbKey({ id: 'op-logic-nexists', name: 'does not exist', latex: '\\nexists' }),
        new KbKey({ id: 'op-logic-neg', name: 'logical not', latex: '\\neg' }),
        new KbKey({ id: 'op-logic-land', name: 'logical and', latex: '\\land' }),
        new KbKey({ id: 'op-logic-lor', name: 'logical or', latex: '\\lor' }),
        new KbKey({ id: 'op-logic-therefore', name: 'therefore', latex: '\\therefore' }),
        new KbKey({ id: 'op-logic-because', name: 'because', latex: '\\because' }),
        new KbKey({ id: 'op-logic-implies', name: 'implies', latex: '\\implies' }),
        new KbKey({ id: 'op-logic-iff', name: 'if and only if', latex: '\\iff' }),
        new KbKey({ id: 'op-logic-top', name: 'top (True)', latex: '\\top' }),
        new KbKey({ id: 'op-logic-bot', name: 'bottom (False)', latex: '\\bot' }),
        new KbKey({ id: 'op-logic-wedge', name: 'wedge (and)', latex: '\\wedge' }),
        new KbKey({ id: 'op-logic-vee', name: 'vee (or)', latex: '\\vee' }),
    ]
});

const operatorsSetLogicSetGroup = new KeyGroup({
    id: 'operators-setlogic-set',
    name: 'Set Theory',
    items: [
        new KbKey({ id: 'op-set-in', name: 'element of', latex: '\\in' }),
        new KbKey({ id: 'op-set-notin', name: 'not element of', latex: '\\notin' }),
        new KbKey({ id: 'op-set-subset', name: 'subset', latex: '\\subset' }),
        new KbKey({ id: 'op-set-supset', name: 'superset', latex: '\\supset' }),
        new KbKey({ id: 'op-set-subseteq', name: 'subset or equal', latex: '\\subseteq' }),
        new KbKey({ id: 'op-set-supseteq', name: 'superset or equal', latex: '\\supseteq' }),
        new KbKey({ id: 'op-set-ni', name: 'contains element', latex: '\\ni' }),
        new KbKey({ id: 'op-set-notni', name: 'does not contain element', latex: '\\notni' }),
        new KbKey({ id: 'op-set-cap', name: 'intersection', latex: '\\cap' }),
        new KbKey({ id: 'op-set-cup', name: 'union', latex: '\\cup' }),
        new KbKey({ id: 'op-set-uplus', name: 'union plus', latex: '\\uplus' }),
        new KbKey({ id: 'op-set-sqcap', name: 'square intersection', latex: '\\sqcap' }),
        new KbKey({ id: 'op-set-sqcup', name: 'square union', latex: '\\sqcup' }),
        new KbKey({ id: 'op-set-setminus', name: 'set difference', latex: '\\setminus' }),
        new KbKey({ id: 'op-set-smallsetminus', name: 'small set difference', latex: '\\smallsetminus' }),
        new KbKey({ id: 'op-set-complement', name: 'complement', latex: '\\complement' }),
        new KbKey({ id: 'op-set-emptyset', name: 'empty set', latex: '\\emptyset' }),
        new KbKey({ id: 'op-set-varnothing', name: 'empty set variant', latex: '\\varnothing' }),
        new KbKey({ id: 'op-set-aleph', name: 'aleph', latex: '\\aleph' }),
        new KbKey({ id: 'op-set-beth', name: 'beth', latex: '\\beth' }),
        new KbKey({ id: 'op-set-gimel', name: 'gimel', latex: '\\gimel' }),
        new KbKey({ id: 'op-set-SetBuilder', name: 'Set Builder', latex: '\\Set{ \\placeholder{} | \\placeholder{} }' }),
    ]
});

const setLogicSection = new Section({
    id: 'operators-setlogic',
    name: 'Set & Logic',
    items: [
        operatorsSetLogicLogicGroup,
        operatorsSetLogicSetGroup
    ]
});

const operatorsOtherGroup = new KeyGroup({
    id: 'operators-other-group',
    name: 'Other Symbols & Punctuation',
    items: [
        new KbKey({ id: 'op-other-percent', name: 'percent', latex: '\\%' }),
        new KbKey({ id: 'op-other-factorial', name: 'factorial', latex: '!' }),
        new KbKey({ id: 'op-other-infty', name: 'infinity', latex: '\\infty' }),
        new KbKey({ id: 'op-other-prime', name: 'prime', latex: "'" }),
        new KbKey({ id: 'op-other-colon', name: 'colon', latex: ':' }),
        new KbKey({ id: 'op-other-semicolon', name: 'semicolon', latex: ';' }),
        new KbKey({ id: 'op-other-cdots', name: 'centered ellipsis', latex: '\\cdots' }),
        new KbKey({ id: 'op-other-vdots', name: 'vertical ellipsis', latex: '\\vdots' }),
        new KbKey({ id: 'op-other-ddots', name: 'diagonal ellipsis', latex: '\\ddots' }),
        new KbKey({ id: 'op-other-angle', name: 'angle', latex: '\\angle' }),
        new KbKey({ id: 'op-other-measuredangle', name: 'measured angle', latex: '\\measuredangle' }),
        new KbKey({ id: 'op-other-sphericalangle', name: 'spherical angle', latex: '\\sphericalangle' }),
        new KbKey({ id: 'op-other-triangle', name: 'triangle', latex: '\\triangle' }),
        new KbKey({ id: 'op-other-hbar', name: 'hbar', latex: '\\hbar' }),
        new KbKey({ id: 'op-other-backprime', name: 'back prime', latex: '\\backprime' }),
        new KbKey({ id: 'op-other-hash', name: 'hash', latex: '\\#' }),
        new KbKey({ id: 'op-other-ampersand', name: 'ampersand', latex: '\\&' }),
        new KbKey({ id: 'op-other-underscore', name: 'underscore', latex: '\\_' }),
        new KbKey({ id: 'op-other-Box', name: 'box', latex: '\\Box' }),
        new KbKey({ id: 'op-other-blacksquare', name: 'black square', latex: '\\blacksquare' }),
        new KbKey({ id: 'op-other-lozenge', name: 'lozenge', latex: '\\lozenge' }),
        new KbKey({ id: 'op-other-blacklozenge', name: 'black lozenge', latex: '\\blacklozenge' }),
        new KbKey({ id: 'op-other-mho', name: 'mho', latex: '\\mho' }),
        new KbKey({ id: 'op-other-Finv', name: 'Finv', latex: '\\Finv' }),
        new KbKey({ id: 'op-other-Game', name: 'Game', latex: '\\Game' }),
        new KbKey({ id: 'op-other-eth', name: 'eth', latex: '\\eth' }),
        new KbKey({ id: 'op-other-checkmark', name: 'checkmark', latex: '\\checkmark' }),
        new KbKey({ id: 'op-other-maltese', name: 'maltese cross', latex: '\\maltese' }),
        new KbKey({ id: 'op-other-top', name: 'top', latex: '\\top' }),
        new KbKey({ id: 'op-other-bot', name: 'bottom', latex: '\\bot' }),
        new KbKey({ id: 'op-other-star', name: 'star symbol', latex: '\\star' }),
        new KbKey({ id: 'op-other-dagger', name: 'dagger symbol', latex: '\\dagger' }),
        new KbKey({ id: 'op-other-ddagger', name: 'double dagger symbol', latex: '\\ddagger' }),
    ]
});

const otherSection = new Section({
    id: 'operators-other',
    name: 'Other',
    items: [operatorsOtherGroup]
});

function getOperatorsCategory(): SectionedCategory {
    const category = new SectionedCategory({
        id: 'operators',
        name: 'Operators',
        items: [
            operatorsCommonSection,
            arithmeticSection,
            relationsSection,
            negatedRelationsSection,
            setLogicSection,
            otherSection
        ]
    });
    return category;
}
//endregion


//region Letters
const lettersLowerCaseGroup = new KeyGroup({
    id: 'letters-lowercase-group',
    name: 'Lowercase',
    items: [
        new KbKey({ id: 'letter-lower-a', name: 'a', latex: 'a' }),
        new KbKey({ id: 'letter-lower-b', name: 'b', latex: 'b' }),
        new KbKey({ id: 'letter-lower-c', name: 'c', latex: 'c' }),
        new KbKey({ id: 'letter-lower-d', name: 'd', latex: 'd' }),
        new KbKey({ id: 'letter-lower-e', name: 'e', latex: 'e' }),
        new KbKey({ id: 'letter-lower-f', name: 'f', latex: 'f' }),
        new KbKey({ id: 'letter-lower-g', name: 'g', latex: 'g' }),
        new KbKey({ id: 'letter-lower-h', name: 'h', latex: 'h' }),
        new KbKey({ id: 'letter-lower-i', name: 'i', latex: 'i' }),
        new KbKey({ id: 'letter-lower-j', name: 'j', latex: 'j' }),
        new KbKey({ id: 'letter-lower-k', name: 'k', latex: 'k' }),
        new KbKey({ id: 'letter-lower-l', name: 'l', latex: 'l' }),
        new KbKey({ id: 'letter-lower-m', name: 'm', latex: 'm' }),
        new KbKey({ id: 'letter-lower-n', name: 'n', latex: 'n' }),
        new KbKey({ id: 'letter-lower-o', name: 'o', latex: 'o' }),
        new KbKey({ id: 'letter-lower-p', name: 'p', latex: 'p' }),
        new KbKey({ id: 'letter-lower-q', name: 'q', latex: 'q' }),
        new KbKey({ id: 'letter-lower-r', name: 'r', latex: 'r' }),
        new KbKey({ id: 'letter-lower-s', name: 's', latex: 's' }),
        new KbKey({ id: 'letter-lower-t', name: 't', latex: 't' }),
        new KbKey({ id: 'letter-lower-u', name: 'u', latex: 'u' }),
        new KbKey({ id: 'letter-lower-v', name: 'v', latex: 'v' }),
        new KbKey({ id: 'letter-lower-w', name: 'w', latex: 'w' }),
        new KbKey({ id: 'letter-lower-x', name: 'x', latex: 'x' }),
        new KbKey({ id: 'letter-lower-y', name: 'y', latex: 'y' }),
        new KbKey({ id: 'letter-lower-z', name: 'z', latex: 'z' }),
    ]
});

const lowerCaseSection = new Section({
    id: 'letters-lowercase',
    name: 'abc',
    items: [lettersLowerCaseGroup]
});

const lettersUpperCaseGroup = new KeyGroup({
    id: 'letters-uppercase-group',
    name: 'Uppercase',
    items: [
        new KbKey({ id: 'letter-upper-A', name: 'A', latex: 'A' }),
        new KbKey({ id: 'letter-upper-B', name: 'B', latex: 'B' }),
        new KbKey({ id: 'letter-upper-C', name: 'C', latex: 'C' }),
        new KbKey({ id: 'letter-upper-D', name: 'D', latex: 'D' }),
        new KbKey({ id: 'letter-upper-E', name: 'E', latex: 'E' }),
        new KbKey({ id: 'letter-upper-F', name: 'F', latex: 'F' }),
        new KbKey({ id: 'letter-upper-G', name: 'G', latex: 'G' }),
        new KbKey({ id: 'letter-upper-H', name: 'H', latex: 'H' }),
        new KbKey({ id: 'letter-upper-I', name: 'I', latex: 'I' }),
        new KbKey({ id: 'letter-upper-J', name: 'J', latex: 'J' }),
        new KbKey({ id: 'letter-upper-K', name: 'K', latex: 'K' }),
        new KbKey({ id: 'letter-upper-L', name: 'L', latex: 'L' }),
        new KbKey({ id: 'letter-upper-M', name: 'M', latex: 'M' }),
        new KbKey({ id: 'letter-upper-N', name: 'N', latex: 'N' }),
        new KbKey({ id: 'letter-upper-O', name: 'O', latex: 'O' }),
        new KbKey({ id: 'letter-upper-P', name: 'P', latex: 'P' }),
        new KbKey({ id: 'letter-upper-Q', name: 'Q', latex: 'Q' }),
        new KbKey({ id: 'letter-upper-R', name: 'R', latex: 'R' }),
        new KbKey({ id: 'letter-upper-S', name: 'S', latex: 'S' }),
        new KbKey({ id: 'letter-upper-T', name: 'T', latex: 'T' }),
        new KbKey({ id: 'letter-upper-U', name: 'U', latex: 'U' }),
        new KbKey({ id: 'letter-upper-V', name: 'V', latex: 'V' }),
        new KbKey({ id: 'letter-upper-W', name: 'W', latex: 'W' }),
        new KbKey({ id: 'letter-upper-X', name: 'X', latex: 'X' }),
        new KbKey({ id: 'letter-upper-Y', name: 'Y', latex: 'Y' }),
        new KbKey({ id: 'letter-upper-Z', name: 'Z', latex: 'Z' }),
    ]
});

const upperCaseSection = new Section({
    id: 'letters-uppercase',
    name: 'ABC',
    items: [lettersUpperCaseGroup]
});

const lettersMathbbUppercaseGroup = new KeyGroup({
    id: 'letters-mathbb-uppercase-group',
    name: 'Mathbb Uppercase',
    items: [
        new KbKey({ id: 'letter-mathbb-A', name: '𝔸', latex: '\\mathbb{A}' }),
        new KbKey({ id: 'letter-mathbb-B', name: '𝔹', latex: '\\mathbb{B}' }),
        new KbKey({ id: 'letter-mathbb-C', name: 'ℂ', latex: '\\mathbb{C}' }),
        new KbKey({ id: 'letter-mathbb-D', name: '𝔻', latex: '\\mathbb{D}' }),
        new KbKey({ id: 'letter-mathbb-E', name: '𝔼', latex: '\\mathbb{E}' }),
        new KbKey({ id: 'letter-mathbb-F', name: '𝔽', latex: '\\mathbb{F}' }),
        new KbKey({ id: 'letter-mathbb-G', name: '𝔾', latex: '\\mathbb{G}' }),
        new KbKey({ id: 'letter-mathbb-H', name: 'ℍ', latex: '\\mathbb{H}' }),
        new KbKey({ id: 'letter-mathbb-I', name: '𝕀', latex: '\\mathbb{I}' }),
        new KbKey({ id: 'letter-mathbb-J', name: '𝕁', latex: '\\mathbb{J}' }),
        new KbKey({ id: 'letter-mathbb-K', name: '𝕂', latex: '\\mathbb{K}' }),
        new KbKey({ id: 'letter-mathbb-L', name: '𝕃', latex: '\\mathbb{L}' }),
        new KbKey({ id: 'letter-mathbb-M', name: '𝕄', latex: '\\mathbb{M}' }),
        new KbKey({ id: 'letter-mathbb-N', name: 'ℕ', latex: '\\mathbb{N}' }),
        new KbKey({ id: 'letter-mathbb-O', name: '𝕆', latex: '\\mathbb{O}' }),
        new KbKey({ id: 'letter-mathbb-P', name: 'ℙ', latex: '\\mathbb{P}' }),
        new KbKey({ id: 'letter-mathbb-Q', name: 'ℚ', latex: '\\mathbb{Q}' }),
        new KbKey({ id: 'letter-mathbb-R', name: 'ℝ', latex: '\\mathbb{R}' }),
        new KbKey({ id: 'letter-mathbb-S', name: '𝕊', latex: '\\mathbb{S}' }),
        new KbKey({ id: 'letter-mathbb-T', name: '𝕋', latex: '\\mathbb{T}' }),
        new KbKey({ id: 'letter-mathbb-U', name: '𝕌', latex: '\\mathbb{U}' }),
        new KbKey({ id: 'letter-mathbb-V', name: '𝕍', latex: '\\mathbb{V}' }),
        new KbKey({ id: 'letter-mathbb-W', name: '𝕎', latex: '\\mathbb{W}' }),
        new KbKey({ id: 'letter-mathbb-X', name: '𝕏', latex: '\\mathbb{X}' }),
        new KbKey({ id: 'letter-mathbb-Y', name: '𝕐', latex: '\\mathbb{Y}' }),
        new KbKey({ id: 'letter-mathbb-Z', name: 'ℤ', latex: '\\mathbb{Z}' }),
    ]
});

const mathBBSection = new Section({
    id: 'letters-mathbb',
    name: '𝔸𝔹ℂ',
    items: [lettersMathbbUppercaseGroup]
});

const greekLowerCaseGroup = new KeyGroup({
    id: 'greek-lowercase-group',
    name: 'Lowercase Greek',
    items: [
        new KbKey({ id: 'greek-lower-alpha', name: 'α', latex: '\\alpha' }),
        new KbKey({ id: 'greek-lower-beta', name: 'β', latex: '\\beta' }),
        new KbKey({ id: 'greek-lower-gamma', name: 'γ', latex: '\\gamma' }),
        new KbKey({ id: 'greek-lower-delta', name: 'δ', latex: '\\delta' }),
        new KbKey({ id: 'greek-lower-epsilon', name: 'ε', latex: '\\epsilon' }),
        new KbKey({ id: 'greek-lower-zeta', name: 'ζ', latex: '\\zeta' }),
        new KbKey({ id: 'greek-lower-eta', name: 'η', latex: '\\eta' }),
        new KbKey({ id: 'greek-lower-theta', name: 'θ', latex: '\\theta' }),
        new KbKey({ id: 'greek-lower-iota', name: 'ι', latex: '\\iota' }),
        new KbKey({ id: 'greek-lower-kappa', name: 'κ', latex: '\\kappa' }),
        new KbKey({ id: 'greek-lower-lambda', name: 'λ', latex: '\\lambda' }),
        new KbKey({ id: 'greek-lower-mu', name: 'μ', latex: '\\mu' }),
        new KbKey({ id: 'greek-lower-nu', name: 'ν', latex: '\\nu' }),
        new KbKey({ id: 'greek-lower-xi', name: 'ξ', latex: '\\xi' }),
        new KbKey({ id: 'greek-lower-omicron', name: 'ο', latex: 'o' }),
        new KbKey({ id: 'greek-lower-pi', name: 'π', latex: '\\pi' }),
        new KbKey({ id: 'greek-lower-rho', name: 'ρ', latex: '\\rho' }),
        new KbKey({ id: 'greek-lower-sigma', name: 'σ', latex: '\\sigma' }),
        new KbKey({ id: 'greek-lower-tau', name: 'τ', latex: '\\tau' }),
        new KbKey({ id: 'greek-lower-upsilon', name: 'υ', latex: '\\upsilon' }),
        new KbKey({ id: 'greek-lower-phi', name: 'φ', latex: '\\phi' }),
        new KbKey({ id: 'greek-lower-chi', name: 'χ', latex: '\\chi' }),
        new KbKey({ id: 'greek-lower-psi', name: 'ψ', latex: '\\psi' }),
        new KbKey({ id: 'greek-lower-omega', name: 'ω', latex: '\\omega' }),
        new KbKey({ id: 'greek-lower-varepsilon', name: 'ε (var)', latex: '\\varepsilon' }),
        new KbKey({ id: 'greek-lower-vartheta', name: 'ϑ', latex: '\\vartheta' }),
        new KbKey({ id: 'greek-lower-varpi', name: 'ϖ', latex: '\\varpi' }),
        new KbKey({ id: 'greek-lower-varrho', name: 'ϱ', latex: '\\varrho' }),
        new KbKey({ id: 'greek-lower-varsigma', name: 'ς', latex: '\\varsigma' }),
        new KbKey({ id: 'greek-lower-varphi', name: 'φ (var)', latex: '\\varphi' }),
        new KbKey({ id: 'greek-lower-digamma', name: 'ϝ', latex: '\\digamma' }),
        new KbKey({ id: 'greek-lower-varkappa', name: 'ϰ', latex: '\\varkappa' }),
    ]
});

const greekLowerCaseSection = new Section({
    id: 'greek-lowercase',
    name: 'αβγ',
    items: [greekLowerCaseGroup]
});

const greekUpperCaseGroup = new KeyGroup({
    id: 'greek-uppercase-group',
    name: 'Uppercase Greek',
    items: [
        new KbKey({ id: 'greek-upper-Alpha', name: 'Α', latex: 'A' }),
        new KbKey({ id: 'greek-upper-Beta', name: 'Β', latex: 'B' }),
        new KbKey({ id: 'greek-upper-Gamma', name: 'Γ', latex: '\\Gamma' }),
        new KbKey({ id: 'greek-upper-Delta', name: 'Δ', latex: '\\Delta' }),
        new KbKey({ id: 'greek-upper-Epsilon', name: 'Ε', latex: 'E' }),
        new KbKey({ id: 'greek-upper-Zeta', name: 'Ζ', latex: 'Z' }),
        new KbKey({ id: 'greek-upper-Eta', name: 'Η', latex: 'H' }),
        new KbKey({ id: 'greek-upper-Theta', name: 'Θ', latex: '\\Theta' }),
        new KbKey({ id: 'greek-upper-Iota', name: 'Ι', latex: 'I' }),
        new KbKey({ id: 'greek-upper-Kappa', name: 'Κ', latex: 'K' }),
        new KbKey({ id: 'greek-upper-Lambda', name: 'Λ', latex: '\\Lambda' }),
        new KbKey({ id: 'greek-upper-Mu', name: 'Μ', latex: 'M' }),
        new KbKey({ id: 'greek-upper-Nu', name: 'Ν', latex: 'N' }),
        new KbKey({ id: 'greek-upper-Xi', name: 'Ξ', latex: '\\Xi' }),
        new KbKey({ id: 'greek-upper-Omicron', name: 'Ο', latex: 'O' }),
        new KbKey({ id: 'greek-upper-Pi', name: 'Π', latex: '\\Pi' }),
        new KbKey({ id: 'greek-upper-Rho', name: 'Ρ', latex: 'P' }),
        new KbKey({ id: 'greek-upper-Sigma', name: 'Σ', latex: '\\Sigma' }),
        new KbKey({ id: 'greek-upper-Tau', name: 'Τ', latex: 'T' }),
        new KbKey({ id: 'greek-upper-Upsilon', name: 'Υ', latex: '\\Upsilon' }),
        new KbKey({ id: 'greek-upper-Phi', name: 'Φ', latex: '\\Phi' }),
        new KbKey({ id: 'greek-upper-Chi', name: 'Χ', latex: 'X' }),
        new KbKey({ id: 'greek-upper-Psi', name: 'Ψ', latex: '\\Psi' }),
        new KbKey({ id: 'greek-upper-Omega', name: 'Ω', latex: '\\Omega' }),
        new KbKey({ id: 'greek-upper-varGamma', name: 'Γ (var)', latex: '\\varGamma' }),
        new KbKey({ id: 'greek-upper-varDelta', name: 'Δ (var)', latex: '\\varDelta' }),
        new KbKey({ id: 'greek-upper-varTheta', name: 'Θ (var)', latex: '\\varTheta' }),
        new KbKey({ id: 'greek-upper-varLambda', name: 'Λ (var)', latex: '\\varLambda' }),
        new KbKey({ id: 'greek-upper-varXi', name: 'Ξ (var)', latex: '\\varXi' }),
        new KbKey({ id: 'greek-upper-varPi', name: 'Π (var)', latex: '\\varPi' }),
        new KbKey({ id: 'greek-upper-varSigma', name: 'Σ (var)', latex: '\\varSigma' }),
        new KbKey({ id: 'greek-upper-varUpsilon', name: 'Υ (var)', latex: '\\varUpsilon' }),
        new KbKey({ id: 'greek-upper-varPhi', name: 'Φ (var)', latex: '\\varPhi' }),
        new KbKey({ id: 'greek-upper-varPsi', name: 'Ψ (var)', latex: '\\varPsi' }),
        new KbKey({ id: 'greek-upper-varOmega', name: 'Ω (var)', latex: '\\varOmega' }),
    ]
});

const greekUpperCaseSection = new Section({
    id: 'greek-uppercase',
    name: 'ΑΒΓ',
    items: [greekUpperCaseGroup]
});

function getLettersAndGreekCategory(): SectionedCategory {
    const category = new SectionedCategory({
        id: 'letters',
        name: 'Letters',
        items: [
            lowerCaseSection,
            upperCaseSection,
            mathBBSection,
            greekLowerCaseSection,
            greekUpperCaseSection
        ]
    });
    return category;
}
//endregion


//region Brackets
const bracketsKeyItems = [
    { id: 'left-paren', name: '(', latex: '(' },
    { id: 'right-paren', name: ')', latex: ')' },
    { id: 'left-bracket', name: '[', latex: '[' },
    { id: 'right-bracket', name: ']', latex: ']' },
    { id: 'left-brace', name: '{', latex: '\\{' },
    { id: 'right-brace', name: '}', latex: '\\}' },
    { id: 'left-angle', name: '⟨', latex: '\\langle' },
    { id: 'right-angle', name: '⟩', latex: '\\rangle' },
    { id: 'abs-bar', name: '|', latex: '|' },
    { id: 'norm-bar', name: '∥', latex: '\\|' },
    { id: 'left-floor', name: '⌊', latex: '\\lfloor' },
    { id: 'right-floor', name: '⌋', latex: '\\rfloor' },
    { id: 'left-ceiling', name: '⌈', latex: '\\lceil' },
    { id: 'right-ceiling', name: '⌉', latex: '\\rceil' },
    { id: 'llbracket', name: '⟦', latex: '\\llbracket' },
    { id: 'rrbracket', name: '⟧', latex: '\\rrbracket' },
    { id: 'overbrace', name: '⏞', latex: '\\overbrace{}' },
    { id: 'underbrace', name: '⏟', latex: '\\underbrace{}' },
    { id: 'overgroup', name: '⏠', latex: '\\overgroup{}' },
    { id: 'undergroup', name: '⏡', latex: '\\undergroup{}' },
].map(cfg => new KbKey(cfg));

const bracketsGroup = new KeyGroup({
    id: 'brackets-common',
    name: 'All Brackets',
    items: bracketsKeyItems
});

function getBracketsCategory(): DirectCategory {
    const category = new DirectCategory({
        id: 'brackets',
        name: 'Brackets',
        items: [bracketsGroup]
    });
    return category;
}
//endregion


//region: Roots & Powers
const rootsAndPowersGroup = new KeyGroup({
    id: 'roots-powers-group',
    name: 'Roots & Powers',
    items: [
        new KbKey({ id: 'squareRoot', name: 'Square Root', latex: '\\sqrt{\\placeholder{}}' }),
        new KbKey({ id: 'squareRootExplicit2', name: 'Square Root (Index 2)', latex: '\\sqrt[2]{\\placeholder{}}' }),
        new KbKey({ id: 'cubeRoot', name: 'Cube Root', latex: '\\sqrt[3]{\\placeholder{}}' }),
        new KbKey({ id: 'fourthRoot', name: 'Fourth Root', latex: '\\sqrt[4]{\\placeholder{}}' }),
        new KbKey({ id: 'nthRoot', name: 'Nth Root', latex: '\\sqrt[\\placeholder{}]{\\placeholder{}}' }),
        new KbKey({ id: 'squared', name: 'Squared', latex: '{\\placeholder{}}^2' }),
        new KbKey({ id: 'cubed', name: 'Cubed', latex: '{\\placeholder{}}^3' }),
        new KbKey({ id: 'nthPower', name: 'Nth Power', latex: '{\\placeholder{}}^{\\placeholder{}}' }),
        new KbKey({ id: 'reciprocal', name: 'Reciprocal', latex: '{\\placeholder{}}^{-1}' }),
        new KbKey({ id: 'negativePower', name: 'Negative Power', latex: '{\\placeholder{}}^{-{\\placeholder{}}}' }),
        new KbKey({ id: 'powerHalf', name: 'Power of 1/2', latex: '{\\placeholder{}}^{1/2}' }),
        new KbKey({ id: 'powerOneOverN', name: 'Power of 1/n', latex: '{\\placeholder{}}^{1/{\\placeholder{}}}' }),
        new KbKey({ id: 'exponentialE', name: 'Exponential (e)', latex: 'e^{\\placeholder{}}' }),
        new KbKey({ id: 'powerOf10', name: 'Power of 10', latex: '10^{\\placeholder{}}' }),
        new KbKey({ id: 'powerOf2', name: 'Power of 2', latex: '2^{\\placeholder{}}' }),
        new KbKey({ id: 'powerFracExp', name: 'Power (Fraction Exp.)', latex: '{\\placeholder{}}^{\\frac{\\placeholder{}}{\\placeholder{}}}' }),
        new KbKey({ id: 'surdSymbol', name: 'Surd Symbol', latex: '\\surd' }),
    ]
});

function getRootsCategory(): DirectCategory {
    const category = new DirectCategory({
        id: 'roots',
        name: 'Roots & Powers',
        items: [rootsAndPowersGroup]
    });
    return category;
}
//endregion


//region Fractions
const logarithmGroup = new KeyGroup({
    id: 'logarithms-group',
    name: 'Logarithm Functions',
    items: [
        new KbKey({ id: 'log-ln', name: 'natural logarithm', latex: '\\ln(\\placeholder{})' }),
        new KbKey({ id: 'log-log', name: 'logarithm', latex: '\\log(\\placeholder{})' }),
        new KbKey({ id: 'log-log10', name: 'logarithm base 10', latex: '\\log_{10}(\\placeholder{})' }),
        new KbKey({ id: 'log-log2', name: 'logarithm base 2', latex: '\\log_2(\\placeholder{})' }),
        new KbKey({ id: 'log-lg', name: 'logarithm base 2 (lg)', latex: '\\lg(\\placeholder{})' }),
        new KbKey({ id: 'log-logb', name: 'logarithm arbitrary base', latex: '\\log_{\\placeholder{}}(\\placeholder{})' }),
    ]
});

function getLogarithmCategory(): DirectCategory {
    const category = new DirectCategory({
        id: 'logarithms',
        name: 'Logarithms',
        items: [logarithmGroup]
    });
    return category;
}
//endregion


//region Limits
const limitsGroup = new KeyGroup({
    id: 'limits-group',
    name: 'Limits',
    items: [
        new KbKey({ id: 'limit-basic', name: 'limit', latex: '\\lim_{\\placeholder{} \\to \\placeholder{}}' }),
        new KbKey({ id: 'limit-inf', name: 'limit inferior', latex: '\\liminf_{\\placeholder{} \\to \\placeholder{}}' }),
        new KbKey({ id: 'limit-sup', name: 'limit superior', latex: '\\limsup_{\\placeholder{} \\to \\placeholder{}}' }),
        new KbKey({ id: 'limit-below', name: 'limit from below', latex: '\\lim_{\\placeholder{} \\to {\\placeholder{}}^-}' }),
        new KbKey({ id: 'limit-above', name: 'limit from above', latex: '\\lim_{\\placeholder{} \\to {\\placeholder{}}^+}' }),
        new KbKey({ id: 'limit-injlim', name: 'direct limit', latex: '\\injlim_{\\placeholder{}}' }),
        new KbKey({ id: 'limit-projlim', name: 'inverse limit', latex: '\\projlim_{\\placeholder{}}' }),
    ]
});

function getLimitsCategory(): DirectCategory {
    const category = new DirectCategory({
        id: 'limits',
        name: 'Limits',
        items: [limitsGroup]
    });
    return category;
}
//endregion


//region Trigonometry
const trigCommonSymbolsGroup = new KeyGroup({
    id: 'trig-common-symbols',
    name: 'Common Symbols',
    items: [
        new KbKey({ id: 'trig-symbol-theta', name: 'theta', latex: '\\theta' }),
        new KbKey({ id: 'trig-symbol-pi', name: 'pi', latex: '\\pi' }),
        new KbKey({ id: 'trig-symbol-degree', name: 'degree', latex: '^{\\circ}' }),
        new KbKey({ id: 'trig-symbol-phi', name: 'phi', latex: '\\phi' }),
        new KbKey({ id: 'trig-symbol-alpha', name: 'alpha', latex: '\\alpha' }),
        new KbKey({ id: 'trig-symbol-beta', name: 'beta', latex: '\\beta' }),
    ]
});

const trigCommonFunctionsGroup = new KeyGroup({
    id: 'trig-common-functions',
    name: 'Basic Functions',
    items: [
        new KbKey({ id: 'trig-func-sin', name: 'sine', latex: '\\sin(\\placeholder{})' }),
        new KbKey({ id: 'trig-func-cos', name: 'cosine', latex: '\\cos(\\placeholder{})' }),
        new KbKey({ id: 'trig-func-tan', name: 'tangent', latex: '\\tan(\\placeholder{})' }),
        new KbKey({ id: 'trig-func-csc', name: 'cosecant', latex: '\\csc(\\placeholder{})' }),
        new KbKey({ id: 'trig-func-sec', name: 'secant', latex: '\\sec(\\placeholder{})' }),
        new KbKey({ id: 'trig-func-cot', name: 'cotangent', latex: '\\cot(\\placeholder{})' }),
    ]
});

const trigCommonSection = new Section({
    id: 'trig-common',
    name: 'Common',
    items: [
        trigCommonSymbolsGroup,
        trigCommonFunctionsGroup
    ]
});

const trigInverseNotationGroup = new KeyGroup({
    id: 'trig-inverse-notation',
    name: 'Inverse Notation',
    items: [
        new KbKey({ id: 'trig-invnot-sin', name: 'inverse sine (-1)', latex: '\\sin^{-1}(\\placeholder{})' }),
        new KbKey({ id: 'trig-invnot-cos', name: 'inverse cosine (-1)', latex: '\\cos^{-1}(\\placeholder{})' }),
        new KbKey({ id: 'trig-invnot-tan', name: 'inverse tangent (-1)', latex: '\\tan^{-1}(\\placeholder{})' }),
        new KbKey({ id: 'trig-invnot-csc', name: 'inverse cosecant (-1)', latex: '\\csc^{-1}(\\placeholder{})' }),
        new KbKey({ id: 'trig-invnot-sec', name: 'inverse secant (-1)', latex: '\\sec^{-1}(\\placeholder{})' }),
        new KbKey({ id: 'trig-invnot-cot', name: 'inverse cotangent (-1)', latex: '\\cot^{-1}(\\placeholder{})' }),
    ]
});

const trigInverseArcGroup = new KeyGroup({
    id: 'trig-inverse-arc',
    name: 'Arc Notation',
    items: [
        new KbKey({ id: 'trig-arc-sin', name: 'arcsine', latex: '\\arcsin(\\placeholder{})' }),
        new KbKey({ id: 'trig-arc-cos', name: 'arccosine', latex: '\\arccos(\\placeholder{})' }),
        new KbKey({ id: 'trig-arc-tan', name: 'arctangent', latex: '\\arctan(\\placeholder{})' }),
        new KbKey({ id: 'trig-arc-csc', name: 'arccosecant', latex: '\\operatorname{arccsc}(\\placeholder{})' }),
        new KbKey({ id: 'trig-arc-sec', name: 'arcsecant', latex: '\\operatorname{arcsec}(\\placeholder{})' }),
        new KbKey({ id: 'trig-arc-cot', name: 'arccotangent', latex: '\\operatorname{arccot}(\\placeholder{})' }),
    ]
});

const trigInverseSection = new Section({
    id: 'trig-inverse',
    name: 'Inverse',
    items: [
        trigInverseNotationGroup,
        trigInverseArcGroup
    ]
});

const trigHyperFunctionsGroup = new KeyGroup({
    id: 'trig-hyper-functions',
    name: 'Hyperbolic Functions',
    items: [
        new KbKey({ id: 'trig-hyper-sinh', name: 'hyperbolic sine', latex: '\\sinh(\\placeholder{})' }),
        new KbKey({ id: 'trig-hyper-cosh', name: 'hyperbolic cosine', latex: '\\cosh(\\placeholder{})' }),
        new KbKey({ id: 'trig-hyper-tanh', name: 'hyperbolic tangent', latex: '\\tanh(\\placeholder{})' }),
        new KbKey({ id: 'trig-hyper-csch', name: 'hyperbolic cosecant', latex: '\\operatorname{csch}(\\placeholder{})' }),
        new KbKey({ id: 'trig-hyper-sech', name: 'hyperbolic secant', latex: '\\operatorname{sech}(\\placeholder{})' }),
        new KbKey({ id: 'trig-hyper-coth', name: 'hyperbolic cotangent', latex: '\\coth(\\placeholder{})' }),
    ]
});

const trigHyperInverseGroup = new KeyGroup({
    id: 'trig-hyper-inverse',
    name: 'Inverse Hyperbolic',
    items: [
        new KbKey({ id: 'trig-invhyper-arsinh', name: 'inverse hyperbolic sine', latex: '\\operatorname{arsinh}(\\placeholder{})' }),
        new KbKey({ id: 'trig-invhyper-arcosh', name: 'inverse hyperbolic cosine', latex: '\\operatorname{arcosh}(\\placeholder{})' }),
        new KbKey({ id: 'trig-invhyper-artanh', name: 'inverse hyperbolic tangent', latex: '\\operatorname{artanh}(\\placeholder{})' }),
        new KbKey({ id: 'trig-invhyper-arccsch', name: 'inverse hyperbolic cosecant', latex: '\\operatorname{arccsch}(\\placeholder{})' }),
        new KbKey({ id: 'trig-invhyper-arcsech', name: 'inverse hyperbolic secant', latex: '\\operatorname{arcsech}(\\placeholder{})' }),
        new KbKey({ id: 'trig-invhyper-arccoth', name: 'inverse hyperbolic cotangent', latex: '\\operatorname{arccoth}(\\placeholder{})' }),
    ]
});

const trigHyperbolicSection = new Section({
    id: 'trig-hyperbolic',
    name: 'Hyperbolic',
    items: [
        trigHyperFunctionsGroup,
        trigHyperInverseGroup
    ]
});

function getTrigonometryCategory(): SectionedCategory {
    const category = new SectionedCategory({
        id: 'trigonometry',
        name: 'Trigonometry',
        items: [
            trigCommonSection,
            trigInverseSection,
            trigHyperbolicSection
        ]
    });
    return category;
}
//endregion


//region Functions
const commonFunctionsGroup = new KeyGroup({
    id: 'functions-common-group',
    name: 'Common Functions',
    items: [
        new KbKey({ id: 'func-min', name: 'minimum', latex: '\\min\\{\\placeholder{}\\}' }),
        new KbKey({ id: 'func-inf', name: 'infimum', latex: '\\inf\\{\\placeholder{}\\}' }),
        new KbKey({ id: 'func-max', name: 'maximum', latex: '\\max\\{\\placeholder{}\\}' }),
        new KbKey({ id: 'func-sup', name: 'supremum', latex: '\\sup\\{\\placeholder{}\\}' }),
        new KbKey({ id: 'func-det', name: 'determinant', latex: '\\det(\\placeholder{})' }),
        new KbKey({ id: 'func-gcd', name: 'greatest common divisor', latex: '\\gcd(\\placeholder{}, \\placeholder{})' }),
        new KbKey({ id: 'func-Pr', name: 'probability (Pr)', latex: '\\Pr(\\placeholder{})' }),
        new KbKey({ id: 'func-exp', name: 'exponential function (exp)', latex: '\\exp(\\placeholder{})' }),
        new KbKey({ id: 'func-arg', name: 'argument (arg)', latex: '\\arg(\\placeholder{})' }),
        new KbKey({ id: 'func-dim', name: 'dimension (dim)', latex: '\\dim(\\placeholder{})' }),
    ]
});

const functionNotationGroup = new KeyGroup({
    id: 'functions-notation-group',
    name: 'Function Notation',
    items: [
        new KbKey({ id: 'func-notation-f', name: 'f(x) notation', latex: 'f(\\placeholder{})' }),
        new KbKey({ id: 'func-notation-g', name: 'g(x) notation', latex: 'g(\\placeholder{})' }),
        new KbKey({ id: 'func-notation-general', name: 'function application', latex: '\\placeholder{}(\\placeholder{})' }),
    ]
});

function getFunctionsCategory(): DirectCategory {
    const category = new DirectCategory({
        id: 'functions',
        name: 'Functions',
        items: [commonFunctionsGroup, functionNotationGroup]
    });
    return category;
}
//endregion


//region Set Theory
const setTheoryAllGroup = new KeyGroup({
    id: 'set-theory-all-group',
    name: 'Set Theory Symbols',
    items: [
        new KbKey({ id: 'set-in', name: 'element of', latex: '\\in' }),
        new KbKey({ id: 'set-notin', name: 'not element of', latex: '\\notin' }),
        new KbKey({ id: 'set-ni', name: 'contains element', latex: '\\ni' }),
        new KbKey({ id: 'set-notni', name: 'does not contain element', latex: '\\notni' }),
        new KbKey({ id: 'set-subset', name: 'subset', latex: '\\subset' }),
        new KbKey({ id: 'set-supset', name: 'superset', latex: '\\supset' }),
        new KbKey({ id: 'set-subseteq', name: 'subset or equal', latex: '\\subseteq' }),
        new KbKey({ id: 'set-supseteq', name: 'superset or equal', latex: '\\supseteq' }),
        new KbKey({ id: 'set-nsubseteq', name: 'not subset or equal', latex: '\\nsubseteq' }),
        new KbKey({ id: 'set-nsupseteq', name: 'not superset or equal', latex: '\\nsupseteq' }),
        new KbKey({ id: 'set-subsetneq', name: 'proper subset', latex: '\\subsetneq' }),
        new KbKey({ id: 'set-supsetneq', name: 'proper superset', latex: '\\supsetneq' }),
        new KbKey({ id: 'set-cap', name: 'intersection', latex: '\\cap' }),
        new KbKey({ id: 'set-cup', name: 'union', latex: '\\cup' }),
        new KbKey({ id: 'set-setminus', name: 'set difference', latex: '\\setminus' }),
        new KbKey({ id: 'set-complement', name: 'complement symbol', latex: '\\complement' }),
        new KbKey({ id: 'set-uplus', name: 'disjoint union', latex: '\\uplus' }),
        new KbKey({ id: 'set-emptyset', name: 'empty set', latex: '\\emptyset' }),
        new KbKey({ id: 'set-varnothing', name: 'empty set variant', latex: '\\varnothing' }),
        new KbKey({ id: 'set-aleph', name: 'aleph', latex: '\\aleph' }),
        new KbKey({ id: 'set-bigcap', name: 'big intersection', latex: '\\bigcap_{\\placeholder{}}' }),
        new KbKey({ id: 'set-bigcup', name: 'big union', latex: '\\bigcup_{\\placeholder{}}' }),
        new KbKey({ id: 'set-bigsqcup', name: 'big square union', latex: '\\bigsqcup_{\\placeholder{}}' }),
        new KbKey({ id: 'set-biguplus', name: 'big disjoint union', latex: '\\biguplus_{\\placeholder{}}' }),
        new KbKey({ id: 'set-builder-manual', name: 'set builder notation', latex: '\\{ \\placeholder | \\placeholder \\}' }),
    ]
});

const setTheorySection = new Section({
    id: 'set-logic-set',
    name: 'Set Theory',
    items: [setTheoryAllGroup]
});

const logicAllGroup = new KeyGroup({
    id: 'logic-all-group',
    name: 'Logic Symbols',
    items: [
        new KbKey({ id: 'logic-land', name: 'logical and', latex: '\\land' }),
        new KbKey({ id: 'logic-lor', name: 'logical or', latex: '\\lor' }),
        new KbKey({ id: 'logic-neg', name: 'logical not', latex: '\\neg' }),
        new KbKey({ id: 'logic-forall', name: 'for all', latex: '\\forall' }),
        new KbKey({ id: 'logic-exists', name: 'exists', latex: '\\exists' }),
        new KbKey({ id: 'logic-nexists', name: 'does not exist', latex: '\\nexists' }),
        new KbKey({ id: 'logic-top', name: 'top (True)', latex: '\\top' }),
        new KbKey({ id: 'logic-bot', name: 'bottom (False)', latex: '\\bot' }),
        new KbKey({ id: 'logic-implies', name: 'implies', latex: '\\implies' }),
        new KbKey({ id: 'logic-iff', name: 'if and only if', latex: '\\iff' }),
        new KbKey({ id: 'logic-therefore', name: 'therefore', latex: '\\therefore' }),
        new KbKey({ id: 'logic-because', name: 'because', latex: '\\because' }),
        new KbKey({ id: 'logic-vdash', name: 'proves', latex: '\\vdash' }),
        new KbKey({ id: 'logic-dashv', name: 'reverse turnstile', latex: '\\dashv' }),
        new KbKey({ id: 'logic-models', name: 'models', latex: '\\models' }),
    ]
});

const logicSection = new Section({
    id: 'set-logic-logic',
    name: 'Logic',
    items: [logicAllGroup]
});


function getSetLogicCategory(): SectionedCategory {
    const category = new SectionedCategory({
        id: 'set-logic',
        name: 'Set & Logic',
        items: [
            setTheorySection,
            logicSection
        ]
    });
    return category;
}
//endregion

const calculusDerivativesGroup = new KeyGroup({
    id: 'calculus-derivatives-group',
    name: 'Derivative Notation',
    items: [
        new KbKey({ id: 'calc-deriv-leibniz', name: 'derivative (d/dx)', latex: '\\frac{d}{d\\placeholder{}}' }),
        new KbKey({ id: 'calc-deriv-partial-leibniz', name: 'partial derivative (∂/∂x)', latex: '\\frac{\\partial}{\\partial \\placeholder{}}' }),
        new KbKey({ id: 'calc-deriv-partial-symbol', name: 'partial derivative symbol', latex: '\\partial' }),
        new KbKey({ id: 'calc-deriv-differential-d', name: 'differential d', latex: '\\mathrm{d}' }),
        new KbKey({ id: 'calc-deriv-differential-dx', name: 'differential dx', latex: '\\mathrm{d}\\placeholder{}' }),
        new KbKey({ id: 'calc-deriv-prime', name: 'prime notation', latex: "'" }),
    ]
});

const derivativesSection = new Section({
    id: 'calculus-derivatives',
    name: 'Derivatives',
    items: [calculusDerivativesGroup]
});

const calculusIntegralsCommonGroup = new KeyGroup({
    id: 'calculus-integrals-common',
    name: 'Common Integral Forms',
    items: [
        new KbKey({ id: 'calc-int-indefinite', name: 'indefinite integral', latex: '\\int \\placeholder{} \\, \\mathrm{d}\\placeholder{}' }),
        new KbKey({ id: 'calc-int-definite', name: 'definite integral', latex: '\\int_{\\placeholder{}}^{\\placeholder{}} \\placeholder{} \\, \\mathrm{d}\\placeholder{}' }),
    ]
});

const calculusIntegralsMultipleGroup = new KeyGroup({
    id: 'calculus-integrals-multiple',
    name: 'Multiple & Contour Integrals',
    items: [
        new KbKey({ id: 'calc-int-double', name: 'double integral', latex: '\\iint_{\\placeholder{}}' }),
        new KbKey({ id: 'calc-int-triple', name: 'triple integral', latex: '\\iiint_{\\placeholder{}}' }),
        new KbKey({ id: 'calc-int-contour', name: 'contour integral', latex: '\\oint_{\\placeholder{}}' }),
        new KbKey({ id: 'calc-int-double-contour', name: 'double contour integral', latex: '\\oiint_{\\placeholder{}}' }),
        new KbKey({ id: 'calc-int-triple-contour', name: 'triple contour integral', latex: '\\oiiint_{\\placeholder{}}' }),
    ]
});

const integralsSection = new Section({
    id: 'calculus-integrals',
    name: 'Integrals',
    items: [
        calculusIntegralsCommonGroup,
        calculusIntegralsMultipleGroup
    ]
});

const calculusSeriesGroup = new KeyGroup({
    id: 'calculus-series-group',
    name: 'Summation & Products',
    items: [
        new KbKey({ id: 'calc-series-sum', name: 'summation', latex: '\\sum_{\\placeholder{}}^{\\placeholder{}}' }),
        new KbKey({ id: 'calc-series-prod', name: 'product', latex: '\\prod_{\\placeholder{}}^{\\placeholder{}}' }),
        new KbKey({ id: 'calc-series-coprod', name: 'coproduct', latex: '\\coprod_{\\placeholder{}}^{\\placeholder{}}' }),
    ]
});

const seriesSection = new Section({
    id: 'calculus-series',
    name: 'Series',
    items: [calculusSeriesGroup]
});

const calculusVectorGroup = new KeyGroup({
    id: 'calculus-vector-group',
    name: 'Vector Operators',
    items: [
        new KbKey({ id: 'calc-vector-nabla', name: 'nabla (gradient/del)', latex: '\\nabla' }),
        new KbKey({ id: 'calc-vector-laplacian-sym', name: 'Laplacian symbol', latex: '\\Delta' }),
        new KbKey({ id: 'calc-vector-divergence', name: 'divergence', latex: '\\nabla \\cdot \\placeholder{}' }),
        new KbKey({ id: 'calc-vector-curl', name: 'curl', latex: '\\nabla \\times \\placeholder{}' }),
        new KbKey({ id: 'calc-vector-laplacian-op', name: 'Laplacian operator', latex: '\\nabla^2' }),
    ]
});

const vectorCalculusSection = new Section({
    id: 'calculus-vector',
    name: 'Vector Calc',
    items: [calculusVectorGroup]
});

function getCalculusCategory(): SectionedCategory {
    const category = new SectionedCategory({
        id: 'calculus',
        name: 'Calculus',
        items: [
            derivativesSection,
            integralsSection,
            seriesSection,
            vectorCalculusSection
        ]
    });
    return category;
}

const statsProbGroup = new KeyGroup({
    id: 'stats-prob-group',
    name: 'Probability',
    items: [
        new KbKey({ id: 'stats-prob-pr', name: 'probability Pr', latex: '\\Pr(\\placeholder{})' }),
    ]
});

const statsExpectVarGroup = new KeyGroup({
    id: 'stats-expect-var-group',
    name: 'Expectation & Variance',
    items: [
        new KbKey({ id: 'stats-expect-e', name: 'expected value', latex: 'E[ \\placeholder{} ]' }),
        new KbKey({ id: 'stats-expect-var', name: 'variance', latex: '\\operatorname{Var}(\\placeholder{})' }),
        new KbKey({ id: 'stats-expect-cov', name: 'covariance', latex: '\\operatorname{Cov}(\\placeholder{}, \\placeholder{})' }),
    ]
});

const probabilityExpectationSection = new Section({
    id: 'stats-prob-expect',
    name: 'Prob/Expect',
    items: [
        statsProbGroup,
        statsExpectVarGroup
    ]
});

const statsNotationAccentsGroup = new KeyGroup({
    id: 'stats-notation-accents',
    name: 'Accents',
    items: [
        new KbKey({ id: 'stats-accent-bar', name: 'bar accent', latex: '\\bar{\\placeholder{}}' }),
        new KbKey({ id: 'stats-accent-hat', name: 'hat accent', latex: '\\hat{\\placeholder{}}' }),
        new KbKey({ id: 'stats-accent-tilde', name: 'tilde accent', latex: '\\tilde{\\placeholder{}}' }),
    ]
});

const statsNotationSymbolsGroup = new KeyGroup({
    id: 'stats-notation-symbols',
    name: 'Common Symbols',
    items: [
        new KbKey({ id: 'stats-symbol-mu', name: 'mu (mean)', latex: '\\mu' }),
        new KbKey({ id: 'stats-symbol-sigma', name: 'sigma (std dev)', latex: '\\sigma' }),
        new KbKey({ id: 'stats-symbol-sigma2', name: 'sigma squared (variance)', latex: '\\sigma^2' }),
        new KbKey({ id: 'stats-symbol-rho', name: 'rho (correlation)', latex: '\\rho' }),
        new KbKey({ id: 'stats-symbol-chi2', name: 'chi-squared', latex: '\\chi^2' }),
    ]
});

const notationSymbolsSection = new Section({
    id: 'stats-notation-symbols',
    name: 'Notation',
    items: [
        statsNotationAccentsGroup,
        statsNotationSymbolsGroup
    ]
});

const statsCombinatoricsGroup = new KeyGroup({
    id: 'stats-combinatorics-group',
    name: 'Combinations & Permutations',
    items: [
        new KbKey({ id: 'stats-combo-binom', name: 'combinations nCr (binom)', latex: '\\binom{\\placeholder{}}{\\placeholder{}}' }),
        new KbKey({ id: 'stats-combo-comb-sub', name: 'combinations nCr (C notation)', latex: '{}_{\\placeholder{}} C_{\\placeholder{}}' }),
        new KbKey({ id: 'stats-combo-perm-func', name: 'permutations nPr (P notation)', latex: 'P(\\placeholder{}, \\placeholder{})' }),
        new KbKey({ id: 'stats-combo-perm-sub', name: 'permutations nPr (subscript)', latex: '{}_{\\placeholder{}} P_{\\placeholder{}}' }),
        new KbKey({ id: 'stats-combo-factorial', name: 'factorial', latex: '!' }),
    ]
});

const combinatoricsSection = new Section({
    id: 'stats-combinatorics',
    name: 'Combinatorics',
    items: [statsCombinatoricsGroup]
});

function getStatisticsCategory(): SectionedCategory {
    const category = new SectionedCategory({
        id: 'statistics',
        name: 'Statistics',
        items: [
            probabilityExpectationSection,
            notationSymbolsSection,
            combinatoricsSection
        ]
    });
    return category;
}

const vectorAccentsStyleGroup = new KeyGroup({
    id: 'vector-accents-style-group',
    name: 'Accents & Style',
    items: [
        new KbKey({ id: 'vector-accent-vec', name: 'vector accent', latex: '\\vec{\\placeholder{}}' }),
        new KbKey({ id: 'vector-accent-overrightarrow', name: 'vector arrow accent', latex: '\\overrightarrow{\\placeholder{}}' }),
        new KbKey({ id: 'vector-accent-hat', name: 'hat accent (unit vector)', latex: '\\hat{\\placeholder{}}' }),
        new KbKey({ id: 'vector-style-mathbf', name: 'bold (vector variable)', latex: '\\mathbf{\\placeholder{}}' }),
        new KbKey({ id: 'vector-accent-boldhat', name: 'bold unit vector', latex: '\\hat{\\mathbf{\\placeholder{}}}' })
    ]
});

const vectorBasisGroup = new KeyGroup({
    id: 'vector-basis-group',
    name: 'Basis Vectors',
    items: [
        new KbKey({ id: 'vector-basis-i', name: 'basis vector i', latex: '\\mathbf{i}' }),
        new KbKey({ id: 'vector-basis-j', name: 'basis vector j', latex: '\\mathbf{j}' }),
        new KbKey({ id: 'vector-basis-k', name: 'basis vector k', latex: '\\mathbf{k}' }),
    ]
});

const vectorStructuresGroup = new KeyGroup({
    id: 'vector-structures-group',
    name: 'Structures',
    items: [
        new KbKey({ id: 'vector-struct-angle2d', name: 'vector components (2D)', latex: '\\langle \\placeholder{}, \\placeholder{} \\rangle' }),
        new KbKey({ id: 'vector-struct-angle3d', name: 'vector components (3D)', latex: '\\langle \\placeholder{}, \\placeholder{}, \\placeholder{} \\rangle' }),
        new KbKey({ id: 'vector-struct-angle4d', name: 'vector components (4D)', latex: '\\langle \\placeholder{}, \\placeholder{}, \\placeholder{}, \\placeholder{} \\rangle' })
    ]
});

const vectorNotationSection = new Section({
    id: 'vector-notation',
    name: 'Notation',
    items: [
        vectorAccentsStyleGroup,
        vectorBasisGroup,
        vectorStructuresGroup
    ]
});

const vectorOpsGroup = new KeyGroup({
    id: 'vector-ops-group',
    name: 'Core Operations',
    items: [
        new KbKey({ id: 'vector-op-dot', name: 'dot product', latex: '\\cdot' }),
        new KbKey({ id: 'vector-op-times', name: 'cross product', latex: '\\times' }),
        new KbKey({ id: 'vector-op-norm', name: 'magnitude (norm)', latex: '\\| \\placeholder{} \\|' }),
        new KbKey({ id: 'vector-op-innerprod', name: 'inner product', latex: '\\langle \\placeholder{}, \\placeholder{} \\rangle' }),
    ]
});

const vectorOperationsSection = new Section({
    id: 'vector-operations',
    name: 'Operations',
    items: [vectorOpsGroup]
});

function getVectorCategory(): SectionedCategory {
    const category = new SectionedCategory({
        id: 'vectors',
        name: 'Vectors',
        items: [
            vectorNotationSection,
            vectorOperationsSection
        ]
    });
    return category;
}

const fractionsGroup = new KeyGroup({
    id: 'fractions-group',
    name: 'Fractions & Binomials',
    items: [
        new KbKey({ id: 'frac-standard', name: 'fraction', latex: '\\frac{\\placeholder{}}{\\placeholder{}}' }),
        new KbKey({ id: 'frac-display', name: 'display style fraction', latex: '\\dfrac{\\placeholder{}}{\\placeholder{}}' }),
        new KbKey({ id: 'frac-text', name: 'text style fraction', latex: '\\tfrac{\\placeholder{}}{\\placeholder{}}' }),
        new KbKey({ id: 'frac-continued', name: 'continued fraction', latex: '\\cfrac{\\placeholder{}}{\\placeholder{}}' }),
        new KbKey({ id: 'frac-nested', name: 'nested fraction', latex: '\\frac{\\frac{\\placeholder{}}{\\placeholder{}}}{\\placeholder{}}' }),
        new KbKey({ id: 'frac-multiline-cfrac', name: 'multiline continued fraction', latex: '\\cfrac{1}{1 + \\cfrac{1}{\\placeholder{}}}' }),
        new KbKey({ id: 'frac-overline', name: 'overline (average)', latex: '\\overline{\\placeholder{}}' }),
        new KbKey({ id: 'frac-binom', name: 'binomial coefficient', latex: '\\binom{\\placeholder{}}{\\placeholder{}}' }),
        new KbKey({ id: 'frac-dbinom', name: 'display style binomial', latex: '\\dbinom{\\placeholder{}}{\\placeholder{}}' }),
        new KbKey({ id: 'frac-tbinom', name: 'text style binomial', latex: '\\tbinom{\\placeholder{}}{\\placeholder{}}' }),
        new KbKey({
            id: 'frac-binomial-theorem',
            name: 'binomial expansion (symbolic)',
            latex: '(1 + \\placeholder{})^{\\placeholder{}} = \\sum_{k=0}^{\\placeholder{}} \\binom{\\placeholder{}}{k} \\placeholder{}^k'
        })
    ]
});

function getFractionsCategory(): DirectCategory {
    const category = new DirectCategory({
        id: 'fractions',
        name: 'Fractions',
        items: [fractionsGroup]
    });
    return category;
}

const accentsCommonGroup = new KeyGroup({
    id: 'accents-common-group',
    name: 'Common Accents',
    items: [
        new KbKey({ id: 'accent-hat', name: 'hat accent', latex: '\\hat{\\placeholder{}}' }),
        new KbKey({ id: 'accent-tilde', name: 'tilde accent', latex: '\\tilde{\\placeholder{}}' }),
        new KbKey({ id: 'accent-bar', name: 'bar accent', latex: '\\bar{\\placeholder{}}' }),
        new KbKey({ id: 'accent-vec', name: 'vector accent', latex: '\\vec{\\placeholder{}}' }),
        new KbKey({ id: 'accent-dot', name: 'dot accent', latex: '\\dot{\\placeholder{}}' }),
        new KbKey({ id: 'accent-ddot', name: 'double dot accent', latex: '\\ddot{\\placeholder{}}' }),
        new KbKey({ id: 'accent-acute', name: 'acute accent', latex: '\\acute{\\placeholder{}}' }),
        new KbKey({ id: 'accent-grave', name: 'grave accent', latex: '\\grave{\\placeholder{}}' }),
        new KbKey({ id: 'accent-check', name: 'check accent', latex: '\\check{\\placeholder{}}' }),
        new KbKey({ id: 'accent-breve', name: 'breve accent', latex: '\\breve{\\placeholder{}}' }),
        new KbKey({ id: 'accent-mathring', name: 'math ring accent', latex: '\\mathring{\\placeholder{}}' }),
    ]
});

const commonAccentsSection = new Section({
    id: 'accents-common',
    name: 'Common',
    items: [accentsCommonGroup]
});

const accentsWideGroup = new KeyGroup({
    id: 'accents-wide-group',
    name: 'Wide Accents',
    items: [
        new KbKey({ id: 'accent-widehat', name: 'wide hat accent', latex: '\\widehat{\\placeholder{}}' }),
        new KbKey({ id: 'accent-widetilde', name: 'wide tilde accent', latex: '\\widetilde{\\placeholder{}}' }),
        new KbKey({ id: 'accent-overline', name: 'overline accent', latex: '\\overline{\\placeholder{}}' }),
        new KbKey({ id: 'accent-underline', name: 'underline accent', latex: '\\underline{\\placeholder{}}' }),
        new KbKey({ id: 'accent-widecheck', name: 'wide check accent', latex: '\\widecheck{\\placeholder{}}' }),
        new KbKey({ id: 'accent-utilde', name: 'wide utilde accent', latex: '\\utilde{\\placeholder{}}' }),
    ]
});

const wideAccentsSection = new Section({
    id: 'accents-wide',
    name: 'Wide',
    items: [accentsWideGroup]
});

const accentsArrowsGroup = new KeyGroup({
    id: 'accents-arrows-group',
    name: 'Arrow Accents',
    items: [
        new KbKey({ id: 'accent-overrightarrow', name: 'right arrow accent', latex: '\\overrightarrow{\\placeholder{}}' }),
        new KbKey({ id: 'accent-overleftarrow', name: 'left arrow accent', latex: '\\overleftarrow{\\placeholder{}}' }),
        new KbKey({ id: 'accent-overleftrightarrow', name: 'left-right arrow accent', latex: '\\overleftrightarrow{\\placeholder{}}' }),
        new KbKey({ id: 'accent-Overrightarrow', name: 'double right arrow accent', latex: '\\Overrightarrow{\\placeholder{}}' }),
        new KbKey({ id: 'accent-overleftharpoon', name: 'left harpoon accent', latex: '\\overleftharpoon{\\placeholder{}}' }),
        new KbKey({ id: 'accent-overrightharpoon', name: 'right harpoon accent', latex: '\\overrightharpoon{\\placeholder{}}' }),
    ]
});

const arrowAccentsSection = new Section({
    id: 'accents-arrows',
    name: 'Arrows',
    items: [accentsArrowsGroup]
});

const accentsOtherDotsGroup = new KeyGroup({
    id: 'accents-other-dots-group',
    name: 'Dots',
    items: [
        new KbKey({ id: 'accent-dddot', name: 'triple dot accent', latex: '\\dddot{\\placeholder{}}' }),
        new KbKey({ id: 'accent-ddddot', name: 'quadruple dot accent', latex: '\\ddddot{\\placeholder{}}' }),
    ]
});

const accentsOtherBracesGroup = new KeyGroup({
    id: 'accents-other-braces-group',
    name: 'Braces & Annotations',
    items: [
        new KbKey({ id: 'accent-overbrace', name: 'overbrace', latex: '\\overbrace{\\placeholder{}}' }),
        new KbKey({ id: 'accent-underbrace', name: 'underbrace', latex: '\\underbrace{\\placeholder{}}' }),
        new KbKey({ id: 'accent-overset', name: 'overset', latex: '\\overset{\\placeholder{}}{\\placeholder{}}' }),
        new KbKey({ id: 'accent-underset', name: 'underset', latex: '\\underset{\\placeholder{}}{\\placeholder{}}' }),
        new KbKey({ id: 'accent-overline-arrow', name: 'overline + arrow', latex: '\\overrightarrow{\\overline{\\placeholder{}}}' })
    ]
});

const otherAccentsSection = new Section({
    id: 'accents-other',
    name: 'Other',
    items: [
        accentsOtherDotsGroup,
        accentsOtherBracesGroup
    ]
});

function getAccentsCategory(): SectionedCategory {
    const category = new SectionedCategory({
        id: 'accents',
        name: 'Accents',
        items: [
            commonAccentsSection,
            wideAccentsSection,
            arrowAccentsSection,
            otherAccentsSection
        ]
    });
    return category;
}




//region: All Groups
export const allKeyGroups = [
    numbersNumbersGroup, numbersConstGroup,
    operatorsArithmeticGroup,
    operatorsRelationsBasicGroup, operatorsRelationsAdvancedGroup,
    operatorsNegatedGroup,
    operatorsSetLogicLogicGroup, operatorsSetLogicSetGroup,
    operatorsOtherGroup,
    lettersLowerCaseGroup, lettersUpperCaseGroup,
    lettersMathbbUppercaseGroup,
    greekLowerCaseGroup, greekUpperCaseGroup,
    bracketsGroup,
    rootsAndPowersGroup,
    logarithmGroup,
];


export const categories = [
    getNumbersCategory(),
    getOperatorsCategory(),
    getLettersAndGreekCategory(),
    getBracketsCategory(),
    getRootsCategory(),
    getFractionsCategory(),
    getLogarithmCategory(),
    getLimitsCategory(),
    getTrigonometryCategory(),
    getFunctionsCategory(),
    getSetLogicCategory(),
    getCalculusCategory(),
    getStatisticsCategory(),
    getVectorCategory(),
    getAccentsCategory(),
];
