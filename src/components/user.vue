<!-- USER DATA FOR NAVBAR -->
<template>
<div>
  <!-- Logged in -->
  <template v-if="this.$root.user">
    <b-icon icon="person-fill" scale="1.2" /> {{(this.$root.user.name) ? this.$root.user.name : this.$root.user.username }}
    <br>
    <b-link class="text-white" @click="logout" href="#">
      <b-icon icon="box-arrow-right" scale="1.2" /> Logga ut</b-link>
  </template>

  <!-- Not logged in -->
  <template v-else>
    <b-button variant="primary" @click="login" href="#">
      <b-icon icon="box-arrow-in-right" scale="1.2" /> Logga in</b-button>
</template>

</div>

</template>

<script>
export default {
  name: 'user',
}
</script>
