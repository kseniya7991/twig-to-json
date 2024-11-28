<script setup>
import ConverterComp from "@/components/ConverterComp.vue";
import { ref } from "vue";

// ======= State =======
const mountedClass = ref("");

// ======= Methods =======
setTimeout(() => {
  mountedClass.value = "mounted";
}, 500);
</script>

<template>
  <h1 class="title" :class="mountedClass">
    <span>Twig</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="800px"
      height="800px"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        class="title__arrow title__arrow_1"
        d="M4 4L4 10L14 10M20 10L17.5 10"
        stroke="rgba(54, 102, 131, 0.753)"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        class="title__arrow title__arrow_2"
        d="M20 20L20 14L10 14M4 14L6.5 14"
        stroke="rgba(54, 102, 131, 0.753)"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    <span>JSON</span>
  </h1>
  <converter-comp />
</template>

<style lang="scss">
@font-face {
  font-family: "Poppins";
  src: url("@/assets/fonts/Poppins-Regular.ttf");
}

#app {
  font-family: "Poppins", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: rgba(54, 102, 131, 0.753);
  margin-top: 60px;
  max-width: 1280px;
  margin-inline: auto;
}

body {
  width: 100%;
  margin: 0;
  padding: 0;

  * {
    box-sizing: border-box;
  }
}

.title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;

  padding-inline: 20px;

  width: max-content;
  max-width: 100%;
  margin-inline: auto;

  font-size: 30px;
  line-height: 1;
  font-weight: 500;

  img,
  svg {
    max-width: 100px;
    height: auto;

    @media (max-width: 991px) {
      max-width: 80px;
    }
  }

  &__arrow {
    opacity: 0.2;
    transition: all 1.5s;
  }

  &.mounted {
    .title__arrow {
      opacity: 1;
      &_1 {
        d: path("M9.5 4L4 10L14 10M20 10L17.5 10");
      }
      &_2 {
        d: path("M14.5 20L20 14L10 14M4 14L6.5 14");
      }
    }
  }
}
</style>
