<template>
<b-navbar type="dark" class="text-white" variant="primary">
  <b-navbar-brand :to="url">{{name}}</b-navbar-brand>
  <b-collapse class="justify-content-end" is-nav>
    <!-- Logged in -->
    <b-button variant="primary" v-if="this.$root.user" v-b-toggle.sidebar>
      <b-icon icon="person-fill" scale="1.2" />
      <span class="d-none d-sm-inline">
        {{(this.$root.user.name) ? this.$root.user.name : this.$root.user.username }}
      </span>
    </b-button>

    <!-- Not logged in -->
    <b-button v-else variant="primary" @click="login" href="#">
      <b-icon icon="person-plus" scale="1.2" />
      <span class="d-none d-sm-inline">
        Logga in
      </span>
    </b-button>

  </b-collapse>
  <!-- Logged in -->
  <b-sidebar class="text-center" bg-variant="dark" text-variant="light" id="sidebar" shadow>
    <div class="px-4 py-3 large">
      <template v-if="this.$root.user">
        <div class="mb-4">
          <div class="my-2">
            <b-avatar size="6em" variant="primary"></b-avatar>
          </div>
          {{(this.$root.user.name) ? this.$root.user.name : this.$root.user.username }}
        </div>
        <div class="my-3">
          <b-button variant="light" @click="logout" href="#">
            <b-icon icon="box-arrow-right" scale="1.2" /> Logga ut</b-button>
        </div>
      </template>

      <!-- Not logged in -->
      <template v-else>
        <b-button variant="light" @click="login" href="#">
          <b-icon icon="box-arrow-in-right" scale="1.2" /> Logga in</b-button>
      </template>
      <slot></slot>
    </div>
  </b-sidebar>
</b-navbar>
</template>

<script>
import api from "@/modules/api"
export default {
  name: 'navbar',
  props: ['name', 'url', 'user'],
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
