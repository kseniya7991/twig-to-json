<template>
  <div class="converter__card">
    <h2 class="converter__card-title">
      {{ parentData.title }}
    </h2>
    <p class="converter__card-descr">
      {{ parentData.descr }}
    </p>
    <slot></slot>
  </div>
</template>

<script>
// import InputComp from "@/components/InputComp.vue";
// import { onMounted } from "vue";

export default {
  components: {
    // InputComp,
  },

  props: {
    parentData: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    console.log(props.parentData);

    return {};
  },
};
</script>

<style lang="scss">
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
    margin-top: 16px;
  }

  & &-field {
    resize: none;
    aspect-ratio: 1 / 1;

    margin-top: 30px;
  }
}
</style>
