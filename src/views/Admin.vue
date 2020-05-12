<template>
<div>
  <navbar name="Kursvärderingsportalen" url="/report">
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
