<!-- PENDING LOGIN -->
<template>
<b-container class="d-flex cover text-secondary align-items-center justify-content-center pb-5 text-center">

  <!-- Logging in -->
  <div v-if="loggingIn">
    <h1 class="h3">Loggar in...</h1>
  </div>

  <!-- Failed -->
  <div v-else>
    <h1 class="h3 mb-4">Inloggningen misslyckades</h1>
    <b-button class="my-2" variant="primary" @click="login">Försök igen</b-button>
    <br>
    <b-button variant="link text-dark" to="/">Tillbaka</b-button>
  </div>

</b-container>
</template>

<script>
import api from "@/modules/api"
export default {
  data: function() {
    return {
      loggingIn: true,
    }
  },
  // Send login API request with ticket from CAS on load
  created: async function() {
    const ticket = this.$route.query.ticket
    if (!ticket) {
      this.loggingIn = false;
    } else {
      try {
        const data = await api.cas.login(ticket);
        this.$root.user = data;
        window.sessionStorage.setItem("user", JSON.stringify(data));
        const redirect = window.sessionStorage.getItem("redirect");
        window.sessionStorage.removeItem("redirect");
        this.$router.push(redirect);
      } catch (err) {
        this.loggingIn = false;
      }
    }
  },
  methods: {
    login: function() {
      api.cas.redirect();
    }
  }
}
</script>
