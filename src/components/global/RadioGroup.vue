<script>
    export default {
      name: "Radio Group",
      components: {},
      emit: ["selected"],
      props: {
        options: {
            type: Array,
            required: true,
        },
        name: {
          type: String
        }
      },
      methods: {
        inputEventHandler(value) {
          this.$emit('radioGroupChange', value);
        },
        getLabel(value) {
          return value.split('-').map(str => {
            return str.charAt(0).toUpperCase() + str.slice(1);
          }).join(' ');
        }
      }
    };
</script>

<template>
  <div class="radio-group">
    <Radio :for="option" v-for="option in options"
      :key="option"
      :value="option"
      :name="`radio-input-${this.name}`"
      @radioChange="inputEventHandler">
      {{ this.getLabel(option) }}
    </Radio>
  </div>
</template>

<style lang="scss">
  .radio-group {
    display: flex;
    flex-direction: column;
    max-height: 120px;
    flex-wrap: wrap;
    align-content: flex-start;

    label{padding-right: 15px;
          padding-bottom: 5px;
    }
  }
</style>
