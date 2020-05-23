<template>
  <b-container class="my-4">
    <h1 class="text-dark">Anmälda kommentarer</h1>
    <div class="comments my-4">
      <comment :comment="comment" v-for="comment in comments" :key="comment._id" />
    </div>
  </b-container>
</template>
<script>
import comment from "@/components/Comment";
export default {
  data() {
    return {
      comments: []
    };
  },
  methods: {
    async remove() {
      this.$swal({
        title: "Vill du permanent radera kommentaren?",
        icon: "question",
        showCancelButton: true
      }).then(async result => {
        if (!result.value) return;
        try {
          await this.$api.request("DELETE", "/comments/" + this.comment._id);
          this.comment = null;
        } catch (err) {
          this.$swal({
            title: "Något gick fel",
            icon: "error"
          });
        }
      });
    },
    async ban() {
      this.$swal({
        title: "Vill du stänga av användaren?",
        icon: "question",
        showCancelButton: true
      }).then(async result => {
        if (!result.value) return;
        try {
          await this.$api.request(
            "PATCH",
            "/comments/" + this.comment._id + "/ban"
          );
          this.comment = null;
        } catch (err) {
          this.$swal({
            title: "Något gick fel",
            icon: "error"
          });
        }
      });
    }
  },
  created: async function() {
    try {
      var comments = await this.$api.request("GET", "/comments/2018-11023");
      //comments.sort((a, b) => a.flag < b.flag);
      this.comments = comments;
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
  components: {
    comment
  }
};
</script>