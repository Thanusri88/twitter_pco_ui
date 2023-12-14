<template>
  <main class="mt-0 main-content main-content-bg">
    <section>
      <div class="page-header">
        <div class="container">
          <div class="row">
            <div class="mx-auto col-xl-6 col-lg-6 col-md-6 d-flex flex-column">
              <div class="mt-8 card card-plain">
                <div class="card-body">
                  <label>Nickname</label>
                  <div class="form-group">
                    <div>
                      <input
                        id="task"
                        type="text"
                        class="form-control form-control-default"
                        name="task"
                        v-model="firstName"
                      />
                    </div>
                  </div>
                  <label>Twitter Username/URL</label>
                  <div class="form-group">
                    <div>
                      <input
                        id="task"
                        type="text"
                        class="form-control form-control-default"
                        :class="errors.includes('twitter') ? 'is-invalid' : ''"
                        name="task"
                        v-model="lastName"
                      />
                      <div
                        class="invalid-feedback"
                        v-if="errors.includes('twitter')"
                      >
                        Please provide a valid Twitter Username/URL.
                      </div>
                    </div>
                  </div>
                  <label>Facebook Username?URL</label>
                  <div class="form-group">
                    <div>
                      <input
                        id="task"
                        type="text"
                        class="form-control form-control-default"
                        name="task"
                        v-model="email"
                      />
                    </div>
                  </div>
                  <label>Instagram Username</label>
                  <div class="form-group">
                    <div>
                      <input
                        id="task"
                        type="text"
                        class="form-control form-control-default"
                        :class="errors.includes('ig') ? 'is-invalid' : ''"
                        name="task"
                        v-model="ig"
                      />
                      <div
                        class="invalid-feedback"
                        v-if="errors.includes('ig')"
                      >
                        Please provide a valid Instagram Username/URL.
                      </div>
                    </div>
                  </div>
                  <label>YouTube Channel URL</label>
                  <div class="form-group">
                    <div>
                      <input
                        id="task"
                        type="text"
                        class="form-control form-control-default"
                        :class="errors.includes('yt') ? 'is-invalid' : ''"
                        name="task"
                        v-model="yt"
                      />
                      <div
                        class="invalid-feedback"
                        v-if="errors.includes('yt')"
                      >
                        Please provide a valid YouTube Channel URL.
                      </div>
                    </div>
                  </div>
                  <label>Tiktok Username</label>
                  <div class="form-group">
                    <div>
                      <input
                        id="task"
                        type="text"
                        class="form-control form-control-default"
                        name="task"
                        v-model="password"
                      />
                    </div>
                  </div>
                  <label>Telegram Channel URLs</label>
                  <div
                    class="form-group"
                    v-for="(input, k) in channelList"
                    :key="k"
                  >
                    <div>
                      <input
                        id="username"
                        type="text"
                        class="form-control form-control-default channel-input"
                        name="username"
                        v-model="input.value"
                        placeholder="Channel URL"
                      />
                      <span>
                        <i
                          class="fas fa-minus-circle"
                          @click="remove(k)"
                          v-show="k || (!k && channelList.length > 1)"
                          style="margin-right: 5px"
                        ></i>
                        <i
                          class="fas fa-plus-circle"
                          @click="add"
                          v-show="k == channelList.length - 1"
                        ></i>
                      </span>
                    </div>
                  </div>
                  <div class="text-center">
                    <vsud-button
                      v-on:click="onSignin"
                      class="my-4 mb-2"
                      variant="gradient"
                      color="success"
                      full-width
                      >Save
                    </vsud-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import VsudButton from "@/components/VsudButton.vue";
const body = document.getElementsByTagName("body")[0];
import { mapMutations } from "vuex";
import axios from "axios";

export default {
  name: "AddTimesheet",
  components: {
    VsudButton,
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      ig: "",
      yt: "",
      errors: [],
      channelList: [
        {
          value: "",
        },
      ],
    };
  },
  mounted() {
    if (this.$route.params.id) {
      axios
        .get(
          `https://dataextraction.craftertechnologies.com/api/inf/${this.$route.params.id}`
        )
        .then((res) => {
          if (res.data && res.data.payload) {
            console.log(res.data.payload);
            this.firstName = res.data.payload.name;
            this.lastName = res.data.payload.twitterId;
            this.email = res.data.payload.fbId;
            this.password = res.data.payload.ttId;
            this.yt = res.data.payload.ytId;
            this.ig = res.data.payload.igId;
            this.channelList = res.data.payload.telegramIds.map((id) => ({
              value: id,
            }));
          }
        });
    }
  },
  created() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
    body.classList.remove("bg-gray-100");
  },
  beforeUnmount() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
    body.classList.add("bg-gray-100");
  },
  methods: {
    ...mapMutations(["toggleEveryDisplay", "toggleHideConfig"]),
    add() {
      this.channelList.push({ value: "" });
    },
    remove(index) {
      this.channelList.splice(index, 1);
    },
    onSignin() {
      if (this.$route.params.id) {
        axios
          .patch(
            `https://dataextraction.craftertechnologies.com/api/inf/${this.$route.params.id}`,
            {
              name: this.firstName,
              twitterId: this.lastName,
              fbId: this.email,
              ttId: this.password,
              ytId: this.yt,
              igId: this.ig,
              telegramIds: this.channelList
                .map((i) => i.value)
                .filter((i) => i),
            }
          )
          .then((res) => {
            if (!res.data.error) {
              this.$router.push(`/influencers`);
            } else {
              this.errors = res.data.message;
            }
          });
      } else {
        axios
          .post("https://dataextraction.craftertechnologies.com/api/inf", {
            name: this.firstName,
            twitterId: this.lastName,
            fbId: this.email,
            ttId: this.password,
            ytId: this.yt,
            igId: this.ig,
            telegramIds: this.channelList.map((i) => i.value).filter((i) => i),
          })
          .then((res) => {
            if (!res.data.error) {
              this.$router.push(`/influencers`);
            } else {
              this.errors = res.data.message;
            }
          });
      }
    },
  },
};
</script>

<style scoped>
.channel-input {
  width: 80%;
  display: inline;
  margin-right: 10px;
}
</style>