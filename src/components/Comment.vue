<template>
  <div
    v-if="comment"
    class="my-2 comment"
    :class="{up: vote=='up', down: vote=='down', flag: flag}"
  >
    <small
      v-if="date && date > comment.date"
      class="d-block text-muted"
    >Skriven för en tidigare version av rapporten</small>
    {{comment.comment}}
    <div class="text-right">
      <template v-if="$route.name=='Moderator'">
        <b-link class="text-primary mr-3" @click="$parent.remove(comment._id)">
          <fa-icon icon="trash-alt" />
        </b-link>
        <b-link class="text-primary mr-3" @click="$parent.ban(comment._id)">
          <fa-icon icon="user-slash" />
        </b-link>
        <span class="text-danger mr-2">
          <fa-icon icon="exclamation" />
          {{comment.flag}}
        </span>
        <span class="text-secondary">
          <fa-icon icon="sort" />
          {{comment.votes}}
        </span>
      </template>
      <template v-else>
        <b-link class="vote-up" @click="up">
          <fa-icon icon="arrow-up" />
        </b-link>
        <span class="vote-text mx-1">{{comment.votes}}</span>
        <b-link class="vote-down" @click="down">
          <fa-icon icon="arrow-down" />
        </b-link>
        <b-link :id="comment._id + '-flag'" class="flag ml-4" @click="doflag">
          <fa-icon icon="exclamation" />
        </b-link>
        <b-tooltip noninteractive :target="comment._id + '-flag'" delay="200">Anmäl kommentar</b-tooltip>
      </template>
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
          icon: "question",
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