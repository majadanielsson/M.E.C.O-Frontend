<template>
  <div>
    <b-container class="my-4">
      <b-row align-h="center">
        <b-col lg="8">
          <h2>Kursrapport</h2>
          <h5>Kursnamn: {{instance.name}}</h5>
          <h5>Kurskod: {{instance.courseId}}</h5>
          <h5>Kurstillfälle: {{toSemester(instance.date)}}</h5>
            <div v-if="Array.isArray(instance.report) && instance.report.length">
              <p v-for="report in instance.report" :key="report._id">Ändrad av: {{report.author}}, {{report.date.slice(0,10)}} {{report.date.slice(11,16)}}</p>
              <b-form class="py-3" @submit.prevent="submitForm">
                <b-form-group :label="question.question" v-for="question in instance.report[instance.report.length - 1].questions" :key="question._id">
                  <b-form-textarea v-model="question.answer" rows="3" placeholder="Svar" required></b-form-textarea>
                </b-form-group>
                <b-button class="my-2" type="submit" variant="primary">Redigera kursrapport</b-button>
              </b-form>
            </div>
            <div v-else>
              <b-form class="py-3" @submit.prevent="submitForm">
                <b-form-group :label="question.question" v-for="question in form" :key="question._id">
                  <b-form-textarea v-model="question.answer" rows="3" placeholder="Svar" required></b-form-textarea>
                </b-form-group>
                <b-button class="my-2" type="submit" variant="primary">Skicka kursrapport</b-button>
              </b-form>
            </div>
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
    },
    toSemester: function(date) {
      if (date != undefined) {
        var year = date.slice(0, 4);
        var p = date[5];
        //translates period to corresponding
        //period in "Teknisk-naturvetenskapliga fakulteten" for now.
        if (p < 3) return "VT " + year + ", period " + (parseInt(p) + 2);
        if (p > 3) return "HT " + year + ", period " + (p - 3);
        else return "Sommar " + year;
      }
    },
  
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
        }
      ]
    };
  }
  
  
};
</script>
