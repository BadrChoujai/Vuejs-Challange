<template>
  <div class="Btn">
    <a id="button"></a>
  </div>
</template>
<script>
import $ from "jquery";

export default {
  name: "buttonToTop",
  data() {
    return {};
  },
  created() {},
  methods: {
    backTop() {
      var btn = $("#button");

      $(window).scroll(function() {
        if ($(window).scrollTop() > 300) {
          btn.addClass("show");
        } else {
          btn.removeClass("show");
        }
      });

      btn.on("click", function(e) {
        e.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, "300");
      });
    }
  },
  mounted() {
    this.backTop();
  }
};
</script>
<style scoped>
#button {
  display: inline-block;
  background-color: #13b4ff;
  width: 40px;
  height: 40px;
  text-align: center;
  border-radius: 4px;
  position: fixed;
  bottom: 30px;
  right: 30px;
  transition: background-color 0.3s, opacity 0.5s, visibility 0.5s;
  opacity: 0;
  visibility: hidden;
  z-index: 1000;
}
#button::after {
  content: "\f077";
  font-family: FontAwesome;
  font-weight: normal;
  font-style: normal;
  font-size: 2em;
  line-height: 50px;
  color: #fff;
}
#button:hover {
  cursor: pointer;
  background-color: rgb(66, 66, 66);
}
#button:active {
  background-color: #555;
}
#button.show {
  opacity: 1;
  visibility: visible;
}
</style>
