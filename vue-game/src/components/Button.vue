<template>
  <button @click="callback">{{ label }}</button>
</template>
<script>
export default {
  props: ["callback", "label"],
  data: function () {
    return {
      label: this.label,
    };
  },
};
</script>
