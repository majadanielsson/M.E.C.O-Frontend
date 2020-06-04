<template>
  <b-container class="my-4 mb-5">
    <b-row align-h="center">
      <b-col lg="8">
        <h1 class="text-dark">Ladda upp kursutvärdering</h1>
        <b-form @submit.prevent>
          <b-form-group class="mb-4" label="Kurskod" label-size="lg">
            <b-form-input placeholder="Kurskod" v-model="courseId" />
          </b-form-group>
        </b-form>
        <div v-if="course" class="mb-4">
          <h2 class="h4">{{course.name}}</h2>
          <b-form-select v-model="select" class="text-dark">
            <b-form-select-option
              v-for="(instance, index) in course.instances"
              :key="instance._id"
              :value="index"
            >{{instance.dateString}} - Anmälningskod: {{instance._id.split("-")[1]}}</b-form-select-option>
          </b-form-select>
        </div>
        <div class="d-flex justify-content-between">
          <h2 class="h3 text-dark">Frågor</h2>
          <b-button v-b-modal.modal variant="link">
            <fa-icon icon="cog" class="mr-1" />Hantera frågor
          </b-button>
        </div>
        <b-form @submit.prevent="submit">
          <b-card
            v-for="question in questions"
            :key="question._id"
            class="bg-white border mb-3"
            body-class="px-4"
            header-bg-variant="secondary"
            header-text-variant="white"
          >
            <template v-slot:header>
              <b-link @click="remove(question._id)" class="text-white">
                <fa-icon icon="times" class="float-right fa-lg" />
              </b-link>
              <h3 class="h5 mb-0 font-weight-normal">{{question.question}}</h3>
            </template>
            <div style="max-width:150px">
              <b-form-group
                v-for="answer in Object.keys(question.answers)"
                :key="answer"
                :label="answer + ':'"
                label-cols="2"
              >
                <b-form-input type="number" v-model.number="question.answers[answer]" />
              </b-form-group>
            </div>
          </b-card>
          <b-button
            type="submit"
            :disabled="included.length==0 || !course || sending"
            block
            variant="primary"
          >{{sending ? "Skickar..." : "Skicka"}}</b-button>
        </b-form>
      </b-col>
    </b-row>

    <b-modal
      id="modal"
      hide-header
      hide-footer
      centered
      content-class="px-3 py-2 border-0 shadow-lg"
    >
      <b-link class="text-secondary float-right fa-lg" @click="$bvModal.hide('modal')">
        <fa-icon icon="times" />
      </b-link>
      <h3>Hantera frågor</h3>
      <b-form-checkbox-group
        id="checkbox-group-1"
        v-model="included"
        size="lg"
        :options="evaluationQuestions"
        name="included"
        value-field="_id"
        text-field="question"
      ></b-form-checkbox-group>
    </b-modal>
  </b-container>
</template>
<script>
import formatSemester from "@/modules/formatSemester";
import evaluationQuestions from "@/modules/evaluationQuestions";
export default {
  data: () => ({
    course: null,
    courseId: null,
    sending: false,
    select: 0,
    included: [0, 1],
    evaluationQuestions: evaluationQuestions
  }),
  computed: {
    questions() {
      var included = this.included;
      return Object.values(evaluationQuestions).filter(x =>
        included.includes(x._id)
      );
    }
  },
  watch: {
    async courseId() {
      this.courseId = this.courseId.trim().toUpperCase();
      if (this.courseId.length == 6) {
        var course = await this.$api.request(
          "GET",
          "/courses/" + this.courseId
        );
        course.instances.sort((a, b) => (a.date < b.date ? 1 : -1));
        for (var i in course.instances)
          course.instances[i].dateString = this.toSemester(
            course.instances[i].date
          );
        this.course = course;
      } else this.course = null;
    }
  },
  methods: {
    ...formatSemester,
    async submit() {
      if (
        this.questions
          .map(x => Object.values(x.answers).findIndex(y => y != 0) != -1)
          .includes(false)
      ) {
        this.$swal({
          title: "Innehåller tom fråga",
          icon: "error",
          showConfirmButton: false,
          timer: 1400
        });
        return;
      }
      this.$swal({
        title: "Vill du skicka?",
        icon: "question",
        showCancelButton: true
      }).then(async result => {
        if (!result.value) return;
        this.$api.request(
          "POST",
          `/courses/${this.course._id}/${
            this.course.instances[this.select]._id
          }/evaluation`,
          this.questions.map(x => ({ answers: x.answers, _id: x._id }))
        );
      });
    },
    remove(id) {
      var index = this.included.findIndex(x => x == id);
      if (index != -1) this.included.splice(index, 1);
    },
    add(id) {
      if (this.included.findIndex(x => x == id) == -1) this.included.push(id);
    }
  }
};
</script>