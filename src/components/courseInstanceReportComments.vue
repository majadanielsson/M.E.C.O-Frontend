<template>
  <div class="comments">
    <h4 class="text-dark">Kommentarer</h4>
    <comment
      :comment="comment"
      v-for="comment in comments[instanceId]"
      :date="date"
      :key="comment._id"
    />
    <b-form @submit.prevent="send" v-if="$api.state.user" class="my-3">
      <b-form-textarea
        v-model="comment"
        class="mb-2"
        placeholder="Skriv en kommentar"
        rows="2"
        max-rows="6"
      />
      <b-button variant="primary" type="submit">Skicka</b-button>
    </b-form>
  </div>
</template>
<script>
import comment from "@/components/Comment";
export default {
  data() {
    return {
      comment: "",
      comments: { "": null }
    };
  },
  watch: {
    instanceId() {
      this.load();
    }
  },
  methods: {
    send: async function() {
      if (!this.comment.trim().length) return;
      try {
        var instanceId = this.instanceId;
        var comment = await this.$api.request(
          "POST",
          "/comments/" + this.courseId + "/" + instanceId,
          { comment: this.comment }
        );
        this.comments[instanceId].push(comment);
        this.comment = "";
      } catch (err) {
        switch (err.status) {
          default:
            this.$swal({
              title: "Något gick fel",
              icon: "error",
              showConfirmButton: false,
              timer: 1400
            });
        }
      }
    },
    async action(action, id) {
      var instanceId = this.instanceId;
      var comment = await this.$api.request(
        "PATCH",
        "/comments/" + id + "/" + action
      );
      this.comments[instanceId].splice(
        this.comments[instanceId].findIndex(x => x._id == comment._id),
        1,
        comment
      );
    },
    load: async function() {
      if (this.comments[this.instanceId]) return;
      try {
        var comments = await this.$api.request(
          "GET",
          "/comments/" + this.instanceId
        );
        comments.sort(function(a, b) {
          if (a.votes == b.votes) return a.date > b.date;
          else return a.votes < b.votes;
        });
        this.$set(this.comments, this.instanceId, comments);
      } catch (err) {
        switch (err.status) {
          default:
            this.$swal({
              title: "Något gick fel",
              icon: "error",
              showConfirmButton: false,
              timer: 1400
            });
        }
      }
    }
  },
  props: ["instanceId", "courseId", "date"],
  async created() {
    this.load();
  },
  components: {
    comment
  }
};
</script>