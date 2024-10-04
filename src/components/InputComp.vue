<template>
  <textarea
    name=""
    class="converter__card-field"
    v-model="textarea"
    @input="startConvert"
  ></textarea>
</template>

<script>
import { ref } from "vue";

export default {
  name: "InputComp",
  setup(_, { emit }) {
    const textarea = ref("");
    const resultObj = ref({});

    const startConvert = () => {
      // Пример простого форматирования

      // console.log("Available languages:");
      // console.log(JSON.stringify(Object.keys(Prism.languages)));

      // console.log(
      //   Prism.highlight(textarea.value, Prism.languages.twig, "twig")
      // );

      // codeBlock.value.innerHTML = Prism.highlight(
      //   textarea.value,
      //   Prism.languages.twig,
      //   "twig"
      // );

      // textarea.value = textarea.value
      //   .replace(/>\s+</g, ">\n<") // добавляет переносы строк между тегами
      //   .replace(/^\s+/gm, "") // удаляет начальные пробелы в строке
      //   .replace(/\s+$/gm, ""); // удаляет конечные пробелы в строке

      resultObj.value = {};
      const combinedRegex =
        /(?<for>{%\s*for\b.*?%})|(?<endfor>{%\s*endfor\s*%})|(?<={{)(?<content>\w+(\.\w+)*)(?=}})/gm;
      const matches = Array.from(textarea.value.matchAll(combinedRegex));

      parseMatches(matches);
      emit("conversionCompleted", resultObj.value);
    };

    const parseMatches = (matches) => {
      let level = 0;
      let lastObjStack = [resultObj.value]; // Access the value of ref
      let lastFor = null;

      matches.forEach((el) => {
        let matchContent = el[0].match(/\w+/gm);

        if (el.groups.content && matchContent) {
          handleContent(matchContent, level, lastObjStack, lastFor);
        } else if (el.groups.for) {
          ({ level, lastFor, lastObjStack } = handleFor(
            el,
            level,
            lastObjStack,
          ));
        } else if (el.groups.endfor) {
          level--;
          lastObjStack.pop();
        }
      });
    };

    const handleContent = (matchContent, level, lastObjStack, lastFor) => {
      let itemObj = level === 0 ? {} : lastObjStack[level - 1][lastFor];
      arrayToNestedObject(matchContent, itemObj);

      if (level === 0) {
        deepMerge(resultObj.value, itemObj);
      }
    };

    const handleFor = (el, level, lastObjStack) => {
      const forMatch = el.groups.for.match(/\b(?!endfor\b)\w+\b(?=\s%})/gm);
      let newObj = {};
      lastObjStack[level][forMatch[0]] = newObj;
      lastObjStack.push(newObj);
      return { level: level + 1, lastFor: forMatch[0], lastObjStack };
    };

    const arrayToNestedObject = (arr, obj) => {
      let currentLevel = obj;
      for (let i = 0; i < arr.length; i++) {
        const key = i == 0 ? null : arr[i];
        const innerProperty = i === arr.length - 1 ? "" : {};

        if (!(key in currentLevel) && key) {
          currentLevel[key] = innerProperty;
        }

        if (key) {
          currentLevel = currentLevel[key];
        }
      }
    };

    const deepMerge = (target, source) => {
      for (let key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          if (
            typeof source[key] === "object" &&
            source[key] !== null &&
            typeof target[key] === "object" &&
            target[key] !== null
          ) {
            deepMerge(target[key], source[key]);
          } else {
            target[key] = source[key];
          }
        }
      }
    };

    return {
      textarea,
      startConvert,
      resultObj,
    };
  },
};
</script>
