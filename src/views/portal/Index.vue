<template>
  <b-container class="my-4">
    <b-row align-h="center">
      <b-col lg="8">
        <b-link to="/dev" class="text-danger">Dev login</b-link>
        <br>
        <b-link to="/moderator">Mod</b-link>
        <h1 class="mb-3 text-dark">Sök kurser</h1>
        <!-- Search Field -->
        <b-form @submit.prevent="searchButton">
          <b-input-group>
            <b-form-input
              v-model="searchBar"
              autocomplete="off"
              autofocus
              placeholder="Sök namn eller kurskod"
            />
            <b-input-group-append>
              <b-button type="submit" variant="primary">
                <fa-icon class="fa-lg" icon="search" />
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form>
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
            <p v-if="this.results.length">Visar {{this.results.length}} av {{this.totalCount}}</p>
            <b-progress
              v-if="this.results.length"
              :max="this.totalCount"
              height="3px"
              :value="this.results.length"
              class="mb-4 progress"
            ></b-progress>
            <b-button
              variant="primary"
              :disabled="loadingPage"
              block
              @click="load"
              v-if="results.length < totalCount"
            >{{loadingPage ? "Laddar..." : "Ladda fler"}}</b-button>
            <span v-if="results.length == 0 && this.q">Inga resultat hittades</span>
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
      this.searchBar = this.$route.query.q;
      this.q = this.$route.query.q;
      this.search();
    }
  },

  // Perform search on history change
  watch: {
    "$route.query.q": function() {
      if (this.$route.name == "PortalIndex" && this.$route.query.q != this.q) {
        if (this.$route.query.q) {
          this.q = this.$route.query.q;
          this.searchBar = this.$route.query.q;
          this.search();
        }
        if (!this.$route.query.q) {
          this.q = "";
          this.searchBar = "";
          this.loadingPage = false;
        }
      }
    }
  },
  data: function() {
    return {
      searchBar: "", // Searchbar content
      q: "", // Current search string
      searchResults: { "": { results: [] } },
      loadingPage: false // Loading new page
    };
  },
  computed: {
    results() {
      var results = this.searchResults[this.q];
      return results ? results.results : null;
    },
    totalCount() {
      var results = this.searchResults[this.q];
      return results ? results.totalCount : null;
    }
  },
  methods: {
    searchButton: async function() {
      if (this.$route.query.q != this.searchBar) {
        this.$router.push({
          query: {
            q: this.searchBar
          }
        });
      }
    },
    // Search from searchbar
    search: async function() {
      this.loadingPage = false;
      if (this.searchResults[this.q]) return;
      const response = await this.$api.request("GET", "/search", null, {
        q: this.q
      });
      const results = response.data;
      this.$set(this.searchResults, this.q, {
        results: results,
        totalCount: response.total,
        page: 0
      });
      if (results.length == 1)
        this.$router.replace(this.$route.path + "/courses/" + results[0]._id);
    },
    // Load next page
    load: async function() {
      this.loadingPage = true;
      this.searchResults[this.q].page++;
      const response = await this.$api.request("GET", "/search", null, {
        q: this.q,
        page: this.searchResults[this.q].page
      });
      const results = response.data;
      this.loadingPage = false;
      this.searchResults[this.q].results.push(...results);
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
