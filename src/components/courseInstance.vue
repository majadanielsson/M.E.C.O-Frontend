<template>
  <div class="py-2 course-instance">
    <course-instance-report
      v-if="instance.report"
      :report="instance.report[0]"
      :instanceId="instance._id"
      :courseId="courseId"
    />
  </div>
</template>
<script>
import courseInstanceReport from "./courseInstanceReport";
export default {
  props: ["instance", "courseId"],
  components: {
    courseInstanceReport
  }
};
</script>