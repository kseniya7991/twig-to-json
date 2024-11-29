<script setup>
import { ref, defineEmits } from "vue";
import prettier from "prettier/standalone";
import parserHTML from "prettier/plugins/html";

// ======= Emits =======
const emit = defineEmits(["conversionCompleted"]);

// ======= State =======
const textarea = ref("");
const resultObj = ref({});
const firstLevelFor = ref(0);

// ======= Methods =======
const prettierInputValue = async () => {
  try {
    textarea.value = await prettier.format(textarea.value, {
      parser: "html",
      plugins: [parserHTML],
    });
  } catch (error) {
    textarea.value = "Ошибка форматирования: " + error.message;
  }
};

const startConvert = () => {
  prettierInputValue();
  const combinedRegex =
    /(?<for>{%\s*for\b.*?%})|(?<endfor>{%\s*endfor\s*%})|(?<={{)(?<content>\w+(\.\w+)*)(?=}})/gm;
  const matches = Array.from(textarea.value.matchAll(combinedRegex));

  resultObj.value = {};
  firstLevelFor.value = 0;

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
      if (level == 0) firstLevelFor.value++;
      ({ level, lastFor, lastObjStack } = handleFor(el, level, lastObjStack));
    } else if (el.groups.endfor) {
      level--;
      lastObjStack.pop();
    }
  });
};

const handleContent = (matchContent, level, lastObjStack, lastFor) => {
  let itemObj = {};

  if (level !== 0) {
    let prevLevel = lastObjStack[level - 1];
    const target = Array.isArray(prevLevel)
      ? prevLevel[0][lastFor][0]
      : prevLevel[lastFor][0];
    itemObj = target;
  }

  arrayToNestedObject(matchContent, itemObj);

  if (level === 0) {
    deepMerge(resultObj.value, itemObj);
  }
};

const handleFor = (el, level, lastObjStack) => {
  const forMatch = el.groups.for.match(/\b(?!endfor\b)\w+\b(?=\s%})/gm);
  let newObj = [{}];
  let fixedLevel = lastObjStack[level][0] ?? lastObjStack[level];

  fixedLevel[forMatch[0]] = newObj;
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
</script>

<template>
  <textarea
    name=""
    class="converter__card-field"
    v-model="textarea"
    @input="startConvert"
  ></textarea>
</template>
