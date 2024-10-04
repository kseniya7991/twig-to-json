<template>
  <textarea name="" class="converter__card-field" v-model="localValue">
  </textarea>
</template>

<script>
import { ref, watch } from "vue";

export default {
  props: {
    result: {
      type: String,
      required: false,
    },
  },

  setup(props) {
    const localValue = ref(props.result);

    watch(
      () => props.result,
      (newValue) => {
        localValue.value = newValue;
        // .replace(/^{/g, "{\n") // добавляет переносы строк между тегами
        // .replace(/}$/g, "\n}") // добавляет переносы строк между тегами
        // .replace(/,/gm, ",\n"); // удаляет начальные пробелы в строке
        // .replace(/:{/gm, ":\n{") // удаляет конечные пробелы в строке
        // .replace(/\n/gm, "\n    ") // удаляет конечные пробелы в строке
        // .replace(/{"/gm, '{\n    "'); // удаляет конечные пробелы в строке
      },
    );

    return { props, localValue };
  },
};
</script>
