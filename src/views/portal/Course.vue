<template>
<b-container v-if="course" class="my-4">
  <h1 class="h2">{{course.name}}</h1>
  <h2 class="text-muted h6">{{course._id}}</h2>
</b-container>
</template>

<script>
import api from "@/modules/api"
export default {
  created: async function() {
    this.course = await api.courses.get(this.$route.params.id);
  },
  data: function() {
    return {
      course: null
    }
  },
}
</script>
