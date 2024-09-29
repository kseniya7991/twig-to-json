<template>
  <div class="converter">
    <converter-card />
    <converter-card />
  </div>
</template>

<script>
import ConverterCard from "@/components/ConverterCard.vue";
export default {
  name: "ConverterComp",
  components: {
    ConverterCard,
  },
  setup() {},
};
</script>

<style lang="scss" scoped>
.converter {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: stretch;
  gap: 20px;

  width: 100%;
}
</style>
