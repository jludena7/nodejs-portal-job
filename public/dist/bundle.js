/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./public/js/app.js":
/*!**************************!*\
  !*** ./public/js/app.js ***!
  \**************************/
/***/ (() => {

eval("function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && iter[Symbol.iterator] != null || iter[\"@@iterator\"] != null) return Array.from(iter); }\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }\nvar skillsSet = new Set();\ndocument.addEventListener('DOMContentLoaded', function () {\n  var skills = document.querySelector('.skill-list');\n  if (skills) {\n    skills.addEventListener('click', addSkills);\n    skillsSelected();\n  }\n});\nvar addSkills = function addSkills(e) {\n  if (e.target.tagName === 'LI') {\n    if (e.target.classList.contains('active')) {\n      skillsSet[\"delete\"](e.target.textContent);\n      e.target.classList.remove('active');\n    } else {\n      skillsSet.add(e.target.textContent);\n      e.target.classList.add('active');\n    }\n  }\n  var skillsArray = _toConsumableArray(skillsSet);\n  document.querySelector('#skills').value = skillsArray;\n};\nvar skillsSelected = function skillsSelected() {\n  var selected = Array.from(document.querySelectorAll('.skill-list .active'));\n  selected.forEach(function (select) {\n    skillsSet.add(select.textContent);\n  });\n  var skillsArray = _toConsumableArray(skillsSet);\n  document.querySelector('#skills').value = skillsArray;\n};\n\n//# sourceURL=webpack://nodejs_portal_job/./public/js/app.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./public/js/app.js"]();
/******/ 	
/******/ })()
;