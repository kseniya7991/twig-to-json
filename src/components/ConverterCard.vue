<template>
  <div class="converter__card">
    <h2 class="converter__card-title">TWIG template Input</h2>
    <p class="converter__card-descr">
      Lorem, ipsum dolor sit amet consectetur adipisicing
    </p>
    <textarea class="converter__card-field" name="" id=""></textarea>
  </div>
</template>

<script>
export default {
  setup() {},
};
</script>

<style lang="scss" scoped>
.converter__card {
  display: flex;
  align-items: stretch;
  flex-direction: column;
  padding: 20px;

  text-align: left;

  & &-title {
    margin: 0;
  }

  & &-descr {
    margin: 0;
    padding: 0;
  }

  & &-field {
    resize: none;
    width: 100%;
    background: red;
  }
}
</style>
