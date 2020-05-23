<template>
  <b-container class="my-4">
    <h1 class="text-dark">Anmälda kommentarer</h1>
    <div v-if="comments" class="comments my-4">
      <comment :comment="comment" v-for="comment in comments" :key="comment._id" />
      <div v-if="!comments.length">Det finns inga anmälda kommentarer</div>
    </div>
  </b-container>
</template>
<script>
import comment from "@/components/Comment";
export default {
  data() {
    return {
      comments: null
    };
  },
  methods: {
    async remove(id) {
      this.$swal({
        title: "Vill du permanent radera kommentaren?",
        icon: "question",
        showCancelButton: true
      }).then(async result => {
        if (!result.value) return;
        try {
          await this.$api.request("DELETE", "/comments/" + id);
          this.comments.splice(
            this.comments.findIndex(x => x._id == id),
            1
          );
          this.$swal({
            title: "Kommentaren har raderats",
            icon: "success",
            timer: 1400,
            showConfirmButton: false
          });
        } catch (err) {
          console.log(err);
          this.$swal({
            title: "Något gick fel",
            icon: "error",
            timer: 1400,
            showConfirmButton: false
          });
        }
      });
    },
    async ban(id) {
      this.$swal({
        title: "Vill du stänga av användaren?",
        html: "Användaren stängs av från att kommentera i 30 dagar.",
        icon: "question",
        showCancelButton: true
      }).then(async result => {
        if (!result.value) return;
        try {
          await this.$api.request("PUT", "/comments/" + id + "/ban");
          this.comment = null;
        } catch (err) {
          console.log(err);
          this.$swal({
            title: "Något gick fel",
            icon: "error",
            timer: 1400,
            showConfirmButton: false
          });
        }
      });
    }
  },
  created: async function() {
    try {
      var comments = await this.$api.request("GET", "/comments?flag=true");
      comments.sort((a, b) => a.flag < b.flag);
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