<template>
  <div class="my-4" v-if="report">
    <h3 class="text-dark">Kursrapport</h3>
    <div v-for="question in report.questions" :key="question._id">
      <h5>{{question.question}}</h5>
      <p>{{question.answer}}</p>
    </div>
    <courseInstanceReportComments
      :instanceId="instanceId"
      :courseId="courseId"
      :date="report.date"
    />
  </div>
</template>
<script>
import courseInstanceReportComments from "./courseInstanceReportComments";
export default {
  props: ["report", "instanceId", "courseId"],
  components: {
    courseInstanceReportComments
  }
};
</script>