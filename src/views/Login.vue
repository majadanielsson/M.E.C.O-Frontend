<!-- PENDING LOGIN -->
<template>
  <b-container
    class="d-flex cover text-secondary align-items-center justify-content-center pb-5 text-center"
  >
    <!-- Logging in -->
    <div v-if="loggingIn">
      <h1 class="h3">Loggar in...</h1>
    </div>

    <!-- Failed -->
    <div v-else>
      <h1 class="h3 mb-4">Inloggningen misslyckades</h1>
      <b-button class="my-2" variant="primary" @click="login">Försök igen</b-button>
      <br />
      <b-button variant="link text-dark" @click="back">Tillbaka</b-button>
    </div>
  </b-container>
</template>

<script>
export default {
  data: function() {
    return {
      loggingIn: true
    };
  },
  // Send login API request with ticket from CAS on load
  created: async function() {
    if (this.$api.state.user) this.$router.replace("/portal");
    const ticket = this.$route.query.ticket;
    if (!ticket) {
      this.loggingIn = false;
    } else {
      try {
        await this.$api.login(ticket);
        var redirect = window.sessionStorage.getItem("redirect");
        if (!redirect) redirect = "/portal";
        window.sessionStorage.removeItem("redirect");
        this.$router.push(redirect);
      } catch (err) {
        this.loggingIn = false;
      }
    }
  },
  methods: {
    login: function() {
      this.$api.redirect();
    },
    back: function() {
      var redirect = window.sessionStorage.getItem("redirect");
      if (!redirect) redirect = "/portal";
      window.sessionStorage.removeItem("redirect");
      this.$router.push(redirect);
    }
  },
  metaInfo() {
    return {
      title: this.loggingIn ? "Loggar in..." : "Inloggningen misslyckades"
    };
  }
};
</script>
