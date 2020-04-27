<template>
<div>
  <navbar name="Kursvärderingsportalen" url="/rapport">
  </navbar>
  <b-container class="my-4">
    <b-row align-h="center">
      <b-col lg="8">
        <h1>Formulär</h1>
        <b-form class="py-3" @submit.prevent="submitForm">
          <b-form-group :label="question.question" v-for="question in form" :key="question._id">
            <b-form-input v-model="question.answer" trim placeholder="Svar" required />
          </b-form-group>
          <b-button class="my-2" type="submit" variant="primary">Skicka</b-button>
        </b-form>
        <b-card class="bg-secondary text-white">
          <b-form-group label="Kurskod">
            <b-form-input v-model="params._id" placeholder="1DL221" />
          </b-form-group>
          <b-form-group label="Tillfälle">
            <b-form-input v-model="params.instanceId" placeholder="12345" />
          </b-form-group>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</div>
</template>

<script>
import navbar from "@/components/navbar"
import api from "@/modules/api"
export default {
  methods: {
    submitForm: function() {
      var questions = this.form.map(element => ({
        question: element.question,
        answer: element.answer
      }));
      api.reports.post(questions, this.params);
    }
  },
  data: function() {
    return {
      form: [{
          question: "Vad heter du?",
          answer: "",
          _id: 0
        },
        {
          question: "Vilken är din favoritfärg?",
          answer: "",
          _id: 1
        }
      ],
      params: {
        _id: "",
        instanceId: "",
      }
    }
  },
  components: {
    navbar
  }
}
</script>
