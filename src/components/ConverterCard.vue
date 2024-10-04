<template>
  <div class="converter__card" :class="[parentData.modificator, mountedClass]">
    <h3 class="converter__card-title">
      {{ parentData.title }}
    </h3>
    <slot></slot>
  </div>
</template>

<script>
// import InputComp from "@/components/InputComp.vue";
import { ref, onMounted } from "vue";

export default {
  name: "ConverterCard",
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
    const mountedClass = ref("");
    onMounted(() => {
      setTimeout(() => {
        mountedClass.value = "mounted";
      }, 500);
    });

    return { props, mountedClass };
  },
};
</script>

<style lang="scss">
.converter__card {
  position: relative;

  display: flex;
  align-items: stretch;
  flex-direction: column;
  border-radius: 30px;

  text-align: left;

  &.mounted {
    .converter__card-field {
      filter: grayscale(0);
    }
  }

  & &-title {
    margin: 0;
    font-size: 20px;
    line-height: 1.5;
    font-weight: 500;
    color: rgba(54, 102, 131, 0.753);
    margin-bottom: auto;
  }

  & &-descr {
    margin: 0;
    padding: 0;
    margin-top: 16px;
  }

  & &-field {
    resize: none;
    aspect-ratio: 1 / 1;
    width: 100%;

    margin-top: 20px;
    padding: 20px;

    background-image: linear-gradient(
      275deg,
      #e9f2f4 0%,
      rgb(220, 253, 241) 100%
    );

    font-size: 16px;

    border: none;
    border-radius: 10px;

    outline: none;
    transition: box-shadow 0.3s;

    --sb-track-color: transparent;
    --sb-thumb-color: rgba(126, 177, 170, 0.678);
    --sb-size: 8px;

    filter: grayscale(1);
    transition:
      filter 1.5s,
      box-shadow 0.3s;

    &::-webkit-scrollbar {
      width: var(--sb-size);
    }

    &::-webkit-scrollbar-track {
      background: var(--sb-track-color);
      border-radius: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background: var(--sb-thumb-color);
      border-radius: 6px;
    }

    @supports not selector(::-webkit-scrollbar) {
      scrollbar-color: var(--sb-thumb-color) var(--sb-track-color);
    }

    &:focus {
      box-shadow: 0px 0px 10px 5px rgb(95 138 165 / 57%);
    }
  }

  &_json {
    .converter__card {
      &-field {
        background-image: linear-gradient(90deg, #e9f2f4 0%, #d9f9ffff 100%);
      }
    }
  }
}
</style>
