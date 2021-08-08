<template>
  <div>
    <githubList />
  </div>
</template>

<script>
import githubList from "./components/githubList.vue";

export default {
  name: "App",
  components: {
    githubList
  }
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 40px;
}
</style>
