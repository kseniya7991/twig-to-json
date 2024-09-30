<template>
  <textarea name="" class="converter__card-field" :value="props.result">
  </textarea>
</template>
<script>
export default {
  props: {
    result: {
      type: String,
      required: false,
    },
  },

  setup(props) {
    console.log(props.result, "test result");
    return { props };
  },
};
</script>
