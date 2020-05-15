<template>
  <div>
    <b-container class="my-4">
      <b-row align-h="center">
        <b-col lg="8">
          <h2>Kursrapport</h2>
          <h5>Kursnamn: {{ instance.name }}</h5>
          <h5>Kurskod: {{ instance.courseId }}</h5>
          <h5>Kurstillfälle: {{ toSemester(instance.date) }}</h5>
          <div v-if="edit != null">
            <div v-if="edit">
              <p v-for="report in instance.report" :key="report._id">
                Ändrad av: {{ report.author }}, {{ report.date.slice(0, 10) }}
                {{ report.date.slice(11, 16) }}
              </p>
            </div>
            <b-form class="py-3" @submit.prevent="submitForm">
              <b-form-group
                :label="question.question"
                label-size="lg"
                v-for="question in form"
                :key="question._id"
              >
                <b-form-textarea v-model="question.answer" rows="3" placeholder="Svar" required></b-form-textarea>
              </b-form-group>
              <b-button
                class="my-2"
                type="submit"
                variant="primary"
              >{{this.sending ? "Skickar..." : (this.edit ? "Redigera kursrapport" : "Skicka kursrapport")}}</b-button>
            </b-form>
          </div>
          <ContentLoader
            v-else
            class="my-5"
            height="300"
            width="550"
            style="maxWidth:1000px"
            preserveAspectRatio="xMidYMid slice"
          >
            <rect x="0" y="0" rx="3" ry="3" width="270" height="25" />
            <rect x="0" y="35" rx="7" ry="7" width="550" height="80" />
            <rect x="0" y="140" rx="3" ry="3" width="200" height="25" />
            <rect x="0" y="175" rx="7" ry="7" width="550" height="80" />
          </ContentLoader>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { ContentLoader } from "vue-content-loader";
import formatSemester from "@/modules/formatSemester";
export default {
  methods: {
    submitForm: async function() {
      var questions = null;
      var data = null;
      // var response = null;

      if (this.edit) {
        questions = this.instance.report[0].questions.map(element => ({
          question: element.question,
          answer: element.answer
        }));
      } else {
        questions = this.form.map(element => ({
          question: element.question,
          answer: element.answer
        }));
      }
      try {
        data = {
          questions: questions,
          author: "User"
        };
        this.sending = true;
        await this.$api.request(
          "POST",
          `/courses/${this.$route.params.courseId}/${this.$route.params.instanceId}`,
          data
        );
        this.sending = false;
        this.$swal({
          title: this.edit ? "Kursrapport redigerad" : "Kursrapport skapad",
          icon: "success",
          showConfirmButton: false,
          timer: 1400
        });
        // Go back one step to the My courses page
        this.$router.go(-1);
      } catch (err) {
        this.sending = false;
        switch (err.status) {
          case 422:
            this.$swal({
              title: "Error 422",
              icon: "error",
              showConfirmButton: false,
              timer: 1400
            });
            break;
          case 404:
            this.$router.push("/404");
            break;
          default:
            alert(err);
            this.$swal({
              title: "Något blev fel",
              icon: "error",
              showConfirmButton: false,
              timer: 1400
            });
        }
      }
    },
    ...formatSemester
  },
  created: async function() {
    try {
      this.instance = await this.$api.request(
        "GET",
        `/courses/${this.$route.params.courseId}/${this.$route.params.instanceId}`
      );
      if (!this.instance.responsible.includes(this.$api.state.user.username)) {
        this.$router.replace("/401");
      }
      if (this.instance.report.length) {
        this.form = this.instance.report[0].questions;
      }
      this.edit = this.instance.report && this.instance.report.length;
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
  data: function() {
    return {
      sending: false,
      edit: null,
      instance: {},
      form: [
        {
          question:
            "Beskrivning av eventuella förändringar sedan förra kurstillfället",
          answer: "",
          _id: 0
        },

        {
          question: "Kursens styrkor enligt studenterna",
          answer: "",
          _id: 1
        },
        {
          question: "Kursens svagheter engligt studenterna",
          answer: "",
          _id: 2
        },
        {
          question: "Kursansvariges analys av kurstillfället",
          answer: "",
          _id: 3
        },
        {
          question: "Förslag till eventuella åtgärder",
          answer: "",
          _id: 4
        }
      ]
    };
  },
  components: {
    ContentLoader
  },
  metaInfo() {
    return {
      title:
        "Kursrapport: " +
        (this.instance && this.instance.name ? this.instance.name : "")
    };
  }
};
</script>
