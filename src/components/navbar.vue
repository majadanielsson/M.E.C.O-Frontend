<template>
  <b-navbar type="dark" class="text-white" variant="primary">
    <b-navbar-brand :to="url">{{name}}</b-navbar-brand>
    <b-collapse class="justify-content-end" is-nav>
      <!-- Logged in -->
      <b-button variant="primary" v-if="$api.state.user" v-b-toggle.sidebar>
        <b-icon icon="person-check-fill" scale="1.2" />
        <span
          class="d-none d-sm-inline ml-1"
        >{{($api.state.user.name) ? $api.state.user.name : $api.state.user.username }}</span>
      </b-button>

      <!-- Not logged in -->
      <b-button v-else variant="primary" @click="$api.redirect()" href="#">
        <b-icon icon="person-plus" scale="1.2" />
        <span class="d-none d-sm-inline ml-1">Logga in</span>
      </b-button>
    </b-collapse>
    <!-- Logged in -->
    <b-sidebar
      v-if="$api.state.user"
      backdrop
      class="text-center"
      body-class="d-flex px-5 py-3 pt-4 large justify-content-between flex-column"
      bg-variant="dark"
      text-variant="light"
      id="sidebar"
      shadow
    >
      <div>
        <div class="mb-4">
          <b-avatar
            size="7em"
            variant="primary"
            :text="$api.state.user.username.substring(0,1)+$api.state.user.username.substring(2,3)"
          />
        </div>
        <h4>{{($api.state.user.name) ? $api.state.user.name : $api.state.user.username }}</h4>
      </div>
      <div class="my-4">
        <b-button block variant="light" @click="$api.logout()" href="#">
          <b-icon icon="person-dash" scale="1.2" class="mr-1" />Logga ut
        </b-button>
      </div>
    </b-sidebar>
  </b-navbar>
</template>

<script>
export default {
  name: "navbar",
  props: ["name", "url", "user"]
};
</script>
