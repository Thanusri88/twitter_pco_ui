<template>
  <main class="mt-0 main-content main-content-bg">
    <section>
      <div class="page-header min-vh-75">
        <div class="container">
          <div class="row">
            <div class="mx-auto col-xl-4 col-lg-5 col-md-6 d-flex flex-column">
              <div class="pb-0 card-header text-start">
                <p class="mb-0">Select influencers and enter the search key</p>
              </div>
              <div class="card-body">
                <label>Influencers</label>
                <div class="form-group">
                  <div>
                    <select
                      class="form-select"
                      aria-label="Select Influencer"
                      v-model="username"
                      multiple
                      required
                    >
                      <option
                        :value="i.twitterId"
                        v-for="i in infs"
                        :key="i._id"
                      >
                        {{ i.name }}
                      </option>
                    </select>
                  </div>
                </div>
                <label>Keyword</label>
                <div class="form-group">
                  <div>
                    <input
                      id="password"
                      required
                      type="text"
                      class="form-control form-control-default"
                      name="password"
                      v-model="password"
                      placeholder="could be mentions, hashtags or any words"
                    />
                  </div>
                </div>
                <div class="text-center">
                  <vsud-button
                    v-on:click="onSignin"
                    class="my-4 mb-2"
                    variant="gradient"
                    color="success"
                    full-width
                    >Fetch Data
                  </vsud-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card-body px-0 pt-0 pb-2">
        <div
          class="mx-auto col-xl-4 col-lg-5 col-md-6 d-flex flex-column"
          v-if="data.length === 0"
        >
          <div>No Data</div>
        </div>
        <div class="table-responsive p-0" v-if="data.length > 0">
          <div class="row">
            <div class="col-6 text-start">
              <vsud-button
                color="dark"
                variant="gradient"
                @click="goToNewSheet"
              >
                Download As CSV
              </vsud-button>
            </div>
          </div>
          <table class="table align-items-center mb-0">
            <thead>
              <tr>
                <th
                  class="
                    text-uppercase text-secondary text-xxs
                    font-weight-bolder
                    opacity-7
                  "
                >
                  Username
                </th>
                <th
                  class="
                    text-uppercase text-secondary text-xxs
                    font-weight-bolder
                    opacity-7
                    ps-2
                  "
                >
                  Tweet
                </th>
                <th
                  class="
                    text-uppercase text-secondary text-xxs
                    font-weight-bolder
                    opacity-7
                    ps-2
                  "
                >
                  Created At
                </th>
                <th
                  class="
                    text-uppercase text-secondary text-xxs
                    font-weight-bolder
                    opacity-7
                    ps-2
                  "
                >
                  Like
                </th>
                <th
                  class="
                    text-uppercase text-secondary text-xxs
                    font-weight-bolder
                    opacity-7
                    ps-2
                  "
                >
                  Replies
                </th>
                <th
                  class="
                    text-uppercase text-secondary text-xxs
                    font-weight-bolder
                    opacity-7
                    ps-2
                  "
                >
                  Retweet
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in data" v-bind:key="item.id">
                <td>
                  <div class="d-flex px-2 py-1">
                    <div class="d-flex flex-column justify-content-center">
                      <h6 class="mb-0 text-sm">{{ item.author_username }}</h6>
                    </div>
                  </div>
                </td>
                <td>
                  <div>
                    <a
                      class="text-xs font-weight-bold mb-0"
                      :href="`https://twitter.com/${item.author_username}/status/${item.id}`"
                      target="_blank"
                      >{{ item.text }}</a
                    >

                    <a
                      class="btn btn-link text-dark px-3 mb-0"
                      href="javascript:;"
                      @click="
                        copyText(
                          `https://twitter.com/${item.author_username}/status/${item.id}`
                        )
                      "
                    >
                      <i
                        class="fas fa-copy text-dark me-2"
                        aria-hidden="true"
                      ></i>
                    </a>
                  </div>
                </td>
                <td>
                  {{ new Date(item.created_at).toLocaleString() }}
                </td>
                <td>
                  {{ item.public_metrics.like_count }}
                </td>
                <td>
                  {{ item.public_metrics.reply_count }}
                </td>
                <td>
                  {{ item.public_metrics.retweet_count }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
// import Navbar from "@/examples/PageLayout/Navbar.vue";
import VsudButton from "@/components/VsudButton.vue";
const body = document.getElementsByTagName("body")[0];
import axios from "axios";
import { mapMutations } from "vuex";

export default {
  name: "SignIn",
  components: {
    VsudButton,
  },
  data() {
    return {
      username: [],
      password: "",
      data: [],
      csvHeader: "data:text/csv;charset=utf-8,Username,Tweet URL,Created At\n",
      infs: [],
    };
  },
  created() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
    body.classList.remove("bg-gray-100");
  },
  mounted() {
    this.fetchData();
  },
  beforeUnmount() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
    body.classList.add("bg-gray-100");
  },
  methods: {
    ...mapMutations(["toggleEveryDisplay", "toggleHideConfig"]),
    fetchData() {
      axios
        .get(`https://dataextraction.craftertechnologies.com/api/inf`, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.data) {
            if (res.data && res.data.payload && res.data.payload) {
              this.infs = res.data.payload.filter((i) => i.twitterId);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onSignin() {
      axios
        .get(
          `https://dataextraction.craftertechnologies.com/api/twitter?username=${this.username.join(
            ","
          )}&hashtag=${encodeURIComponent(this.password)}`
        )
        .then((response) => {
          console.log(response.data);
          this.data = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    copyText(text) {
      navigator.clipboard.writeText(text).then(
        function () {
          console.log("Async: Copying to clipboard was successful!");
        },
        function (err) {
          console.error("Async: Could not copy text: ", err);
        }
      );
    },
    goToNewSheet() {
      this.csvContent = this.csvHeader;
      this.data.forEach((record) => {
        this.csvContent += `${record.author_username},https://twitter.com/${
          record.author_username
        }/status/${record.id},"${new Date(
          record.created_at
        ).toLocaleString()}"\n`;
      });
      const encodedUri = encodeURI(this.csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "reports.csv");
      document.body.appendChild(link);

      link.click();
    },
    inf() {
      this.$router.push({
        path: `/influencers`,
      });
    },
    switchApp() {
      this.$router.push({
        path: `/telegram`,
      });
    },
    switchApp2() {
      this.$router.push({
        path: `/yt`,
      });
    },
  },
};
</script>
