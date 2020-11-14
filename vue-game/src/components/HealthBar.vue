<template>
   <div class="small-6 columns">
        <h1 class="text-center">{{ title }}</h1>
        <div class="healthbar">
          <div
            class="healthbar text-center"
            :class="[{ highlight: isAttack }, { heal: isHeal}]"
            :style="{ width: health + '%' }"
            style="background-color: green; margin: 0; color: white"
          >
            {{ health }}
          </div>
        </div>
      </div>
</template>
<script>
export default {
props: ["health", "isHeal", "isAttack", "title"],
  data: function () {
    return {};
  },
}
</script>
