<template>
  <div>
    <b-container class="my-4">
      <b-row align-h="center">
        <b-col lg="8">
          <h1>Kursrapport</h1>
          <b-form class="py-3" @submit.prevent="submitForm">
            <b-form-group :label="question.question" v-for="question in form" :key="question._id">
              <b-form-textarea v-model="question.answer" rows="3" placeholder="Svar" required></b-form-textarea>
            </b-form-group>
            <b-button class="my-2" type="submit" variant="primary">Skicka kursrapport</b-button>
          </b-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import api from "@/modules/api";
export default {
  methods: {
    submitForm: function() {
      var questions = this.form.map(element => ({
        question: element.question,
        answer: element.answer
      }));
      var data = {
        questions: questions,
        author: "User"
      };
      api.reports.post(data, {
        _id: this.$route.params.courseId,
        instanceId: this.$route.params.instanceId
      });
    }
  },
  created: async function() {
    this.instance = await api.courseInstance.get(
      this.$route.params.courseId,
      this.$route.params.instanceId
    );
  },
  data: function() {
    return {
      instance: {},
      form: [
        {
          question:
            "Hur nöjda var studenterna med kursen i stort? (Medelvärde från kursvärdering)",
          answer: "",
          _id: 0
        },

        {
          question:
            "I vilken grad ansträngde sig studenterna för att tillgodogöra sig kursinnehållet? (Medelvärde från kursvärdering)",
          answer: "",
          _id: 1
        },

        {
          question:
            "Beskrivning av eventuella förändringar sedan förra kurstillfället",
          answer: "",
          _id: 2
        },

        {
          question: "Kursens styrkor enligt studenterna",
          answer: "",
          _id: 3
        },
        {
          question: "Kursens svagheter engligt studenterna",
          answer: "",
          _id: 4
        },
        {
          question: "Kursansvariges analys av kurstillfället",
          answer: "",
          _id: 5
        }
      ]
    };
  }
};
</script>
