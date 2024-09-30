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
      const regexItemParentName = /\w+/gm;
      const regexForParentName = /\b(?!endfor\b)\w+\b(?=\s%})/gm;

      const combinedRegex =
        /(?<for>{%\s*for\b.*?%})|(?<endfor>{%\s*endfor\s*%})|(?<={{)(?<content>\w+(\.\w+)*)(?=}})/gm;
      const matches = Array.from(textarea.value.matchAll(combinedRegex));

      console.log(matches);

      let level = 0;
      let lastObjStack = [resultObj.value]; // Access the value of ref
      let lastFor = null;
      matches.forEach((el) => {
        let matchContent = el[0].match(regexItemParentName);

        if (el.groups.content && matchContent && level == 0) {
          let itemObj = {};
          arrayToNestedObject(matchContent, itemObj);
          deepMerge(resultObj.value, itemObj);
        }

        if (el.groups.content && matchContent && level !== 0) {
          let itemObj = lastObjStack[level - 1][lastFor];
          arrayToNestedObject(matchContent, itemObj);
        }

        if (el.groups.for) {
          level += 1;

          let forMatch = el.groups.for.match(regexForParentName);
          let newObj = {};

          lastObjStack[level - 1][forMatch[0]] = newObj;
          lastFor = forMatch[0];

          lastObjStack.push(newObj);
        }

        if (el.groups.endfor) {
          lastObjStack.pop();
          level -= 1;
        }
      });

      console.log(resultObj.value);
      emit("conversionCompleted", resultObj.value);
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
