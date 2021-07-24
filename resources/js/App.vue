<template>
  <div class="flex w-full mx-auto items-start">
    <clientForm></clientForm>
    <clientList></clientList>
  </div>
</template>

<script>
import clientForm from "./components/clientForm";
import clientList from "./components/clientList";
export default {
  components: {
    clientForm,
    clientList
  },
  name: "App"
}
</script>