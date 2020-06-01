<template>
  <b-container class="my-4">
    <b-row align-h="center">
      <b-col lg="8">
        <b-link to="/dev" class="text-danger">Dev login</b-link>
        <br />
        <b-link to="/moderator">Mod</b-link>
        <h1 class="mb-3 text-dark">Sök kurser</h1>
        <!-- Search Field -->
        <b-input-group class="searchbar">
          <b-form-input
            v-model="q"
            autocomplete="off"
            autofocus
            placeholder="Sök namn eller kurskod"
          />
        </b-input-group>
        <template v-if="results">
          <!-- Search Results -->
          <router-link
            v-for="result in results"
            :key="result._id"
            :to="$route.path+'/courses/'+result._id"
          >
            <b-card :title="result.name" class="my-4">
              <b-card-text>
                <b-badge variant="dark" class="float-right">{{result.extent}} {{result.extentUnit}}</b-badge>
                <span class="text-muted">{{result._id}}</span>
              </b-card-text>
            </b-card>
          </router-link>

          <!-- Load more -->
          <div class="my-4 text-center">
            <p v-if="results.length">Visar {{results.length}} av {{totalCount}}</p>
            <b-progress
              v-if="results.length"
              :max="totalCount"
              height="3px"
              :value="results.length"
              class="mb-4 progress"
            ></b-progress>
            <b-button
              variant="primary"
              :disabled="loadingPage"
              block
              @click="load"
              v-if="results.length < totalCount"
            >{{loadingPage ? "Laddar..." : "Ladda fler"}}</b-button>
            <span
              v-if="results.length == 0 && show"
            >{{ show.length > 2 ? "Inga resultat hittades" : "Skriv minst tre tecken"}}</span>
          </div>
        </template>
        <!-- Loading Placeholder -->
        <ContentLoader
          v-else
          class="my-4"
          height="210"
          width="300"
          style="maxWidth:400px"
          preserveAspectRatio="xMidYMid slice"
        >
          <rect x="10" y="0" rx="3" ry="3" width="270" height="25" />
          <rect x="10" y="35" rx="3" ry="3" width="60" height="15" />
          <rect x="10" y="80" rx="3" ry="3" width="200" height="25" />
          <rect x="10" y="115" rx="3" ry="3" width="60" height="15" />
          <rect x="10" y="160" rx="3" ry="3" width="250" height="25" />
          <rect x="10" y="195" rx="3" ry="3" width="60" height="15" />
        </ContentLoader>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { ContentLoader } from "vue-content-loader";

export default {
  name: "PortalIndex",
  // Perform search from query params on load
  created: function() {
    if (this.$route.query.q) {
      this.q = this.$route.query.q;
    }
  },

  // Perform search on history change
  watch: {
    async q() {
      if (
        !this.searchResults[this.show] ||
        this.searchResults[this.show].length == 0
      )
        this.show = this.q;
      await this.search();
      this.show = this.q;
      if (this.replace) this.$router.replace({ query: { q: this.q } });
      else {
        this.replace = true;
        this.$router.push({ query: { q: this.q } });
      }
    },
    "$route.query.q": function() {
      if (this.q != this.$route.query.q) this.q = this.$route.query.q;
    }
  },
  data: function() {
    return {
      show: "",
      q: "", // Current search string
      searchResults: { "": { results: [] } },
      loadingPage: false, // Loading new page
      replace: false
    };
  },
  computed: {
    results() {
      var results = this.searchResults[this.show];
      return results ? results.results : null;
    },
    totalCount() {
      var results = this.searchResults[this.show];
      return results ? results.totalCount : null;
    }
  },
  methods: {
    // Search from searchbar
    search: async function() {
      var q = this.q;
      this.loadingPage = false;
      if (this.searchResults[q]) return;
      if (q.trim().length < 3) {
        this.$set(this.searchResults, q, {
          results: []
        });
      }
      const response = await this.$api.request("GET", "/search/beta", null, {
        q: q
      });
      const results = response.data;
      this.$set(this.searchResults, q, {
        results: results,
        totalCount: response.total,
        page: 0
      });
    },
    // Load next page
    load: async function() {
      var q = this.q;
      this.loadingPage = true;
      this.searchResults[q].page++;
      const response = await this.$api.request("GET", "/search/beta", null, {
        q: q,
        page: this.searchResults[q].page
      });
      const results = response.data;
      this.loadingPage = false;
      this.searchResults[q].results.push(...results);
    }
  },
  components: {
    ContentLoader
  },
  metaInfo() {
    return {
      title: this.$route.query.q ? this.$route.query.q : "Sök kurser"
    };
  }
};
</script>

<style scoped>
.card-title {
  font-size: 1.1rem;
  margin-bottom: 0.3rem;
  font-weight: 500;
}

.progress {
  width: 250px;
  max-width: 60vw;
  margin: auto;
}
</style>
