<template>
  <div class="converter">
    <converter-card :parentData="inputData">
      <template #default>
        <InputComp @conversionCompleted="handleResult" />
      </template>
    </converter-card>
    <converter-card :parentData="outputData">
      <template #default>
        <OutputComp :result="converterResult" />
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
    const converterResult = ref("");
    const inputData = ref({
      title: "Twig template",
      descr: "Lorem, ipsum dolor sit amet consectetur adipisicing",
    });
    const outputData = ref({
      title: "JSON",
      descr: "Lorem, ipsum dolor sit amet consectetur adipisicing",
      modificator: "converter__card_json",
    });

    const handleResult = (data) => {
      converterResult.value = JSON.stringify(data);
    };

    return {
      inputData,
      outputData,
      handleResult,
      converterResult,
    };
  },
};
</script>

<style lang="scss" scoped>
.converter {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: stretch;
  gap: 50px;

  width: 100%;
  padding: 20px 40px;
  max-width: 100%;

  @media (max-width: 768px) {
    gap: 35px;
  }
}
</style>
