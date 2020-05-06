<template>
  <div class="comments">
    <h4 class="text-dark">Kommentarer</h4>
    <div v-for="(comments, index) in commentGroup" :key="comments.date">
      <div class="my-2 comment" v-for="comment in comments.comments" :key="comment._id">
        {{comment}}
        <small
          v-if="index != commentGroup.length - 1"
          class="d-block text-muted"
        >Skriven för en tidigare version av rapporten</small>
      </div>
    </div>
    <b-form @submit.prevent="send" v-if="$root.user" class="my-3">
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
import api from "@/modules/api";
export default {
  data() {
    return {
      comment: ""
    };
  },
  methods: {
    send: async function() {
      try {
        const posted = await api.courseInstance.comment(
          this.$route.params.id,
          this.instanceId,
          {
            comment: this.comment
          }
        );
        this.comment = "";
        this.commentGroup[this.commentGroup.length - 1].comments.push(posted);
      } catch (err) {
        console.log(err);
      }
    }
  },
  props: ["commentGroup", "instanceId"]
};
</script>
<style>
.comments {
  max-width: 500px;
}
.comment {
  background-color: #f3f3f3;
  padding: 0.6rem 1.1rem;
  border-radius: 0.7rem;
}
</style>