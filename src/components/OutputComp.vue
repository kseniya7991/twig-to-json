<script setup>
import Prism from "prismjs";
import "prismjs/themes/prism-coy.css";
import "prismjs/components/prism-json.min.js";
import { ref, watch, defineProps, nextTick } from "vue";

// ======= Props =======
const props = defineProps({
  result: {
    type: String,
    required: false,
  },
});

// ======= State =======
const localValue = ref(props.result);
const copyBtn = ref(null);
const timer = ref(null);

// ======= Methods =======
const copyResult = async () => {
  try {
    await navigator.clipboard.writeText(localValue.value);
    copyBtn.value.classList.add("copied");

    clearTimeout(timer.value);
    timer.value = setTimeout(() => {
      copyBtn.value.classList.remove("copied");
    }, 1000);
  } catch (err) {
    console.error("Failed to copy text:", err);
  }
};

// ======= Watchers =======
watch(
  () => props.result,
  (newValue) => {
    const jsonObject = JSON.parse(newValue);
    localValue.value = JSON.stringify(jsonObject, null, 2);
    nextTick(() => {
      Prism.highlightAll();
    });
  },
);
</script>

<template>
  <!-- <output name="" class="converter__card-field"> {{ localValue }} </output> -->

  <pre><code class="language-json converter__card-field">{{ localValue }}</code></pre>

  <div class="copy" ref="copyBtn" @click="copyResult">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="800px"
      height="800px"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M20.9983 10C20.9862 7.82497 20.8897 6.64706 20.1213 5.87868C19.2426 5 17.8284 5 15 5H12C9.17157 5 7.75736 5 6.87868 5.87868C6 6.75736 6 8.17157 6 11V16C6 18.8284 6 20.2426 6.87868 21.1213C7.75736 22 9.17157 22 12 22H15C17.8284 22 19.2426 22 20.1213 21.1213C21 20.2426 21 18.8284 21 16V15"
        stroke="#fff"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        d="M3 10V16C3 17.6569 4.34315 19 6 19M18 5C18 3.34315 16.6569 2 15 2H11C7.22876 2 5.34315 2 4.17157 3.17157C3.51839 3.82475 3.22937 4.69989 3.10149 6"
        stroke="#fff"
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </svg>
  </div>
</template>

<style lang="scss" scoped>
.copy {
  position: absolute;
  max-width: 40px;
  max-height: 40px;
  z-index: 2;

  right: 5px;
  bottom: 5px;

  border-radius: 10px;
  padding: 5px;
  background: rgb(127, 173, 202);

  cursor: pointer;

  transition: background 0.3s;

  &:hover {
    background: rgb(127, 193, 202);
  }

  &.copied {
    background: rgb(212, 144, 98);
  }

  svg {
    width: 100%;
    height: 100%;
  }
}

pre {
  margin: 0;
}

.converter__card-field.language-json {
  background-image: linear-gradient(
    275deg,
    #e9f2f4 0%,
    rgb(220, 253, 241) 100%
  );
  box-shadow: none;
  background-color: transparent;
  background-size: cover;
  background-origin: border-box;
  border-left: 0;

  &::before,
  &::after {
    display: none;
  }
}

pre {
  &::before,
  &::after {
    display: none;
  }
}
</style>
