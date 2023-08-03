import{test1}from'./whatever.js'
import { test3,test2}from "./some-file.js";
import test4,{test5}from"./some-file.js"
import {default as defaultAlias,test6 as namedAlias}from'./some-file.js';
import test7 from './test.json'with {type:'json',additionalAttribute:'hublabubla'}
import test8 from './test.json'assert {type:'json'}
import type test9 from'./some-file.js';
import{type test10}from'./some-file.js'
