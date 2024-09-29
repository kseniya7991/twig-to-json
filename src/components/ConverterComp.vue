<template>
  <div class="converter">
    <converter-card :parentData="inputData">
      <template #default>
        <InputComp />
      </template>
    </converter-card>
    <converter-card :parentData="outputData">
      <template #default>
        <OutputComp />
      </template>
    </converter-card>
  </div>
</template>

<script>
import { ref } from "vue";
import ConverterCard from "@/components/ConverterCard.vue";
import InputComp from "@/components/InputComp.vue";
import OutputComp from "@/components/OutputComp.vue";

export default {
  name: "ConverterComp",
  components: {
    ConverterCard,
    InputComp,
    OutputComp,
  },
  setup() {
    const inputData = ref({
      title: "TWIG template Input",
      descr: "Lorem, ipsum dolor sit amet consectetur adipisicing",
    });
    const outputData = ref({
      title: "JSON Output",
      descr: "Lorem, ipsum dolor sit amet consectetur adipisicing",
    });

    return {
      inputData,
      outputData,
    };
  },
};
</script>

<style lang="scss" scoped>
.converter {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: stretch;
  gap: 20px;

  width: 100%;
  padding: 20px;
  max-width: 100%;
}
</style>
