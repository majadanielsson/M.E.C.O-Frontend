<template>
<div>
  <navbar name="Kursvärderingsportalen" url="/portal">
  </navbar>
  <router-view />
</div>
</template>

<script>
import navbar from "@/components/navbar"
export default {
  components: {
    navbar
  }
}
</script>
