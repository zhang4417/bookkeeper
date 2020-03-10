<template>
  <div>
    <Layout prefix="layout">
      <NumberPad />
      <Types xxx='hi'/>
      <Notes />
      <Tags />
    </Layout>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Layout from "@/components/Layout.vue";
import NumberPad from "@/components/Money/NumberPad.vue";
import Types from "@/components/Money/Types.vue";
import Notes from "@/components/Money/Notes.vue";
import Tags from "@/components/Money/Tags.vue";

export default Vue.extend({
  name: "Money",
  components: { NumberPad, Types, Notes, Tags }
});
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>
<style lang="scss" scoped>
</style>