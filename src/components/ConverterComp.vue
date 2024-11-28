<script setup>
import { ref } from "vue";
import ConverterCard from "@/components/ConverterCard.vue";
import InputComp from "@/components/InputComp.vue";
import OutputComp from "@/components/OutputComp.vue";

// ======= State =======
const converterResult = ref("");
const inputData = {
  title: "Twig template",
  descr: "Lorem, ipsum dolor sit amet consectetur adipisicing",
};
const outputData = {
  title: "JSON",
  descr: "Lorem, ipsum dolor sit amet consectetur adipisicing",
  modificator: "converter__card_json",
};

// ======= Methods =======
const handleResult = (data) => {
  converterResult.value = JSON.stringify(data);
};
</script>

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
    grid-template-columns: 1fr;
    gap: 35px;
  }
}
</style>
