import { test1 } from './whatever.js';
import { test2, test3 } from './some-file.js';
import test4, { test5 } from './some-file.js';
import { default as defaultAlias, test6 as namedAlias } from './some-file.js';
import test7 from './test.json' with { additionalAttribute: 'hublabubla', type: 'json' };
import test8 from './test.json' assert { type: 'json' };
import type test9 from './some-file.js';
import { type test10 } from './some-file.js';
