<template>
  <div class="my-2 comment" :class="{up: vote=='up', down: vote=='down', flag: flag}">
    <small
      v-if="date > comment.date"
      class="d-block text-muted"
    >Skriven för en tidigare version av rapporten</small>
    {{comment.comment}}
    <div class="text-right">
      <b-link class="vote-up" @click="up">
        <b-icon icon="caret-up-fill" scale="1.2" />
      </b-link>
      <span class="vote-text mx-1">{{comment.votes}}</span>
      <b-link class="vote-down" @click="down">
        <b-icon icon="caret-down-fill" scale="1.2" />
      </b-link>
      <b-link class="flag ml-4" @click="doflag">
        <b-icon icon="flag-fill" scale="1" />
      </b-link>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      flag: false,
      vote: null
    };
  },
  methods: {
    up() {
      if (this.vote != "up") {
        this.vote = "up";
        this.$parent.action("up", this.comment._id);
      } else {
        this.vote = null;
        this.$parent.action("clear", this.comment._id);
      }
    },
    down() {
      if (this.vote != "down") {
        this.vote = "down";
        this.$parent.action("down", this.comment._id);
      } else {
        this.vote = null;
        this.$parent.action("clear", this.comment._id);
      }
    },
    async doflag() {
      if (!this.flag) {
        this.$swal({
          title: "Vill du anmäla kommentaren?",
          icon: "warning",
          showCancelButton: true
        }).then(result => {
          if (!result.value) return;
          this.flag = true;
          this.$parent.action("flag", this.comment._id);
        });
      } else {
        this.flag = false;
        this.$parent.action("unflag", this.comment._id);
      }
    }
  },
  props: ["comment", "date"]
};
</script>