<template>
  <div class="List">
    <h1 class="sixth">Top Stared Github Repositories</h1>
    <div class="Date">
      <input type="date" id="date1" />
      <button
        class="button is-link is-rounded"
        @click="inputDate(), filterInput()"
      >
        Filter
      </button>
    </div>
    <buttonToTop />
    <div id="card" v-for="item in iteme" v-bind:key="item">
      <div>
        <div class="box">
          <article class="media">
            <div class="media-left">
              <figure class="avatar">
                <img :src="item.owner.avatar_url" alt="Image" />
              </figure>
            </div>
            <div class="media-content">
              <div class="content">
                <p>
                  <strong>
                    {{ item.owner.login }}
                  </strong>
                  <br />
                  {{ item.description }}
                </p>
                <div class="div">
                  <div class="stars">
                    <span class="button is-static is-light" id="warn">
                      <span class="icon has-text-warning">
                        <i class="fas fa-star fa-fw"></i>
                      </span>
                      Stars {{ item.stargazers_count }}
                    </span>
                  </div>
                  <div class="issues">
                    <span class="button is-static is-light" id="danger">
                      <span class="icon has-text-danger">
                        <i class="fas fa-times-circle fa-fw"></i>
                      </span>
                      Issues {{ item.open_issues_count }}
                    </span>
                  </div>
                </div>
                <small>
                  submitted on {{ truncate_string(item.created_at, 10) }} by @{{
                    item.name
                  }}
                </small>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>

    <div v-show="loadr" class="load">
      <svg
        version="1.1"
        id="L9"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 100 100"
        enable-background="new 0 0 0 0"
        xml:space="preserve"
      >
        <path
          fill="#000"
          d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
        >
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            dur="1s"
            from="0 50 50"
            to="360 50 50"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import buttonToTop from "./buttonToTop.vue";
import moment from "moment";

export default {
  name: "gitubList",
  components: {
    buttonToTop
  },
  data() {
    return {
      itemss: [],
      page: 1,
      isVisible: true,
      modifyBtn: "Hide List",
      date: [],
      loadr: false,
      date1: "2020-01-01",
      iteme: [],
      fromDate: new Date(),
      toDate: new Date(),
      order: "Asc",
      sort: "stars"
    };
  },
  created() {
    this.getList();
  },
  mounted() {
    window.moment = moment;
    this.getNextList();
  },
  methods: {
    apiStr(fromDt, order, sort, page) {
      var str = `https://api.github.com/search/repositories?q=created:>${fromDt}&sort=${sort}&order=${order}&page=${page}`;
      return str;
    },
    getList() {
      this.loadr = true;
      return axios
        .get(this.apiStr(this.date1, this.order, this.sort, this.page))
        .then(response => {
          this.iteme = response.data.items;
        });
    },
    filterInput() {
      this.fromDate = this.date1;
      this.toDate = this.dateAddDays(this.fromDate, 31);
      this.order = "Desc";
      return axios
        .get(this.apiStr(this.date1, this.order, this.sort, this.page))
        .then(response => {
          this.iteme = response.data.items;
        });
    },
    truncate_string(str1, length) {
      if (str1.constructor === String && length > 0) {
        return str1.slice(0, length);
      }
    },
    inputDate() {
      this.date1 = document.getElementById("date1").value;
      moment(this.date1).format("YYYY-MM-DD");
      return this.date1;
    },
    getNextList() {
      window.onscroll = () => {
        var vm = this;
        let bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight ===
          document.documentElement.offsetHeight;
        if (bottomOfWindow) {
          this.page++;
          this.loadr = true;
          axios
            .get(this.apiStr(this.date1, this.order, this.sort, this.page))
            .then(response => {
              vm.itemss = response.data.items;
              vm.iteme = [...vm.iteme, ...vm.itemss];
            });
        }
      };
    },
    dateAddDays(/*string dd/mm/yyyy*/ datstr, /*int*/ ndays) {
      var dattmp = datstr.split("-").join("-");
      var nwdate = new Date(dattmp);
      nwdate.setDate(nwdate.getDate() + ndays);
      return [
        nwdate.getFullYear(),
        this.zeroPad(nwdate.getMonth() + 1, 10),
        this.zeroPad(nwdate.getDate(), 10)
      ].join("-");
    },
    //function to add zero to date/month < 10
    zeroPad(nr, base) {
      var len = String(base).length - String(nr).length + 1;
      return len > 0 ? new Array(len).join("0") + nr : nr;
    }
  }
};
</script>
<style scoped>
/*  */
.Date,
input {
  margin-right: 10px;
}
h1.sixth {
  display: flex;
  justify-content: center;
  position: relative;
  margin-bottom: 40px;
}
i {
  margin-right: 15px;
  margin-bottom: 2px;
  display: flex;
  justify-content: center;
}
svg {
  width: 80px;
  height: 80px;
  margin: 20px;
}
.load {
  display: flex;
  justify-content: center;
}
.Date {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
.media-content {
  margin-top: 20px;
}
.avatar {
  border-radius: 50%;
  width: 120px;
  height: 120px;
  margin-top: 20px;
}
.media-left {
  border-radius: 50%;
}
#card {
  border-radius: 7px;
  width: 50%;
  margin-left: 25%;
  margin-bottom: 20px;
  transition: box-shadow 0.2s;
}
#card:hover {
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
}
.div {
  display: grid;
  grid-gap: 80px;
  grid-template-columns: [first] 40px [line2] 50px;
  /* grid-template-rows:[row1-end] 100px [row1-end] 100px; */
}
.stars {
  text-align: center;
  width: 100px;
}
.issues {
  width: 100px;
  text-align: center;
}
.loader {
  display: flex;
  justify-content: center;
}
#warn {
  color: black;
  background-color: rgb(254, 255, 180);
}
#danger {
  color: black;
  background-color: rgb(255, 154, 154);
}
</style>
