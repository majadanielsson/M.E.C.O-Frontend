<template>
  <div>
    <b-container class="my-4">
      <b-row align-h="center">
        <b-col lg="8">
          <h2>Kursrapport</h2>
          <h5>Kursnamn: {{ instance.name }}</h5>
          <h5>Kurskod: {{ instance.courseId }}</h5>
          <h5>Kurstillfälle: {{ toSemester(instance.date) }}</h5>
          <div v-if="Array.isArray(instance.report) && instance.report.length">
            <p v-for="report in instance.report" :key="report._id">
              Ändrad av: {{ report.author }}, {{ report.date.slice(0, 10) }}
              {{ report.date.slice(11, 16) }}
            </p>
            <b-form class="py-3" @submit.prevent="submitForm">
              <b-form-group
                :label="question.question"
                label-size="lg"
                v-for="question in instance.report[0].questions"
                :key="question._id"
              >
                <b-form-textarea
                  v-model="question.answer"
                  rows="3"
                  placeholder="Svar"
                  required
                ></b-form-textarea>
              </b-form-group>
              <b-button class="my-2" type="submit" variant="primary"
                >Redigera kursrapport</b-button
              >
            </b-form>
          </div>
          <div v-else>
            <b-form class="py-3" @submit.prevent="submitForm">
              <b-form-group
                :label="question.question"
                v-for="question in form"
                :key="question._id"
              >
                <b-form-textarea
                  v-model="question.answer"
                  rows="3"
                  placeholder="Svar"
                  required
                ></b-form-textarea>
              </b-form-group>
              <b-button class="my-2" type="submit" variant="primary"
                >Skicka kursrapport</b-button
              >
            </b-form>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  methods: {
    submitForm: async function() {
      var questions = null;
      var data = null;
      var response = null;

      if (Array.isArray(this.instance.report) && this.instance.report.length) {
        questions = this.instance.report[0].questions.map((element) => ({
          question: element.question,
          answer: element.answer,
        }));

        data = {
        questions: questions,
        author: "User",
        };
        
        response = await this.$api.request(
        "POST",
        `/courses/${this.$route.params.courseId}/${this.$route.params.instanceId}`,
        data
        );

        if(response[1] != "error") {

        this.$swal({
          title: "Kursrapport redigerad",
          icon: "success",
          showConfirmButton: false,
          timer: 1400,
        }); 
        } else {
          this.$swal({
          title: "Något gick fel!",
          icon: "error",
          showConfirmButton: false,
          timer: 1400,
        });
          throw response[0];
        }

      } else {
        questions = this.form.map((element) => ({
          question: element.question,
          answer: element.answer,
        }));

        data = {
        questions: questions,
        author: "User",
        };
        response = await this.$api.request(
        "POST",
        `/courses/${this.$route.params.courseId}/${this.$route.params.instanceId}`,
        data
        );

        if(response[1] != "error") {
        this.$swal({
          title: "Något gick fel!",
          icon: "error",
          showConfirmButton: false,
          timer: 1400,
        });
        } else {
          throw response[0];
        }
      }
      this.$router.go(-1); 
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
    this.instance = await this.$api.request(
      "GET",
      `/courses/${this.$route.params.courseId}/${this.$route.params.instanceId}`
    );
  },
  data: function() {
    return {
      instance: {},
      form: [
        {
          question: "Svarsfrekvens på kursvärdering",
          answer: "",
          _id: 0,
        },
        {
          question:
            "Hur nöjda var studenterna med kursen i stort? (Medelvärde från kursvärdering)",
          answer: "",
          _id: 1,
        },

        {
          question:
            "I vilken grad ansträngde sig studenterna för att tillgodogöra sig kursinnehållet? (Medelvärde från kursvärdering)",
          answer: "",
          _id: 2,
        },

        {
          question:
            "Beskrivning av eventuella förändringar sedan förra kurstillfället",
          answer: "",
          _id: 3,
        },

        {
          question: "Kursens styrkor enligt studenterna",
          answer: "",
          _id: 4,
        },
        {
          question: "Kursens svagheter engligt studenterna",
          answer: "",
          _id: 5,
        },
        {
          question: "Kursansvariges analys av kurstillfället",
          answer: "",
          _id: 6,
        },
        {
          question: "Förslag till eventuella åtgärder",
          answer: "",
          _id: 7,
        },
      ],
    };
  },
};
</script>
