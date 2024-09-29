<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
  <converter-comp />
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import ConverterComp from "@/components/ConverterComp.vue";

export default {
  name: "App",
  components: {
    // HelloWorld,
    ConverterComp,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

body {
  width: 100%;
  margin: 0;
  padding: 0;

  * {
    box-sizing: border-box;
  }
}
</style>
