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
    <b-link class="text-white" @click="login" href="#">
      <b-icon icon="box-arrow-in-right" scale="1.2" /> Logga in</b-link>
</template>

</div>

</template>

<script>
import api from "@/modules/api"
export default {
  name: 'user',
  methods: {
    logout: async function() {
      this.$root.user = null;
      api.cas.logout();

    },
    login: function() {
      api.cas.redirect();
    },
  }
}
</script>
