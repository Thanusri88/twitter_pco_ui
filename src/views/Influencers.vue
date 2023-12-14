<template>
  <div
    class="modal fade"
    id="deleteModal"
    tabindex="-1"
    aria-labelledby="deleteModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="deleteModalLabel">Confirmation</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">Are you sure you want to delete?</div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            No
          </button>
          <button
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            @click="confirmDelete"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <div class="card mt-4">
        <div class="card-header pb-0 p-3">
          <div class="row">
            <div class="col-6 d-flex align-items-center"></div>
            <div class="col-6 text-end">
              <vsud-button
                color="dark"
                variant="gradient"
                @click="goToNewSheet"
              >
                <i class="fas fa-plus me-2"></i>
                Add New Influencers
              </vsud-button>
            </div>
          </div>
        </div>
        <div class="card mb-4">
          <div class="card-body px-0 pt-0 pb-2">
            <div class="table-responsive p-0">
              <table class="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                    >
                      Nickname
                    </th>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                    >
                      Twitter
                    </th>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                    >
                      Telegram
                    </th>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      Facebook
                    </th>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      TikTok
                    </th>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      YouTube
                    </th>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      Instagram
                    </th>
                    <th class="text-secondary opacity-7"></th>
                    <th class="text-secondary opacity-7"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="ts in timesheets" v-bind:key="ts._id">
                    <td>
                      <div class="d-flex px-2 py-1">
                        <div class="d-flex flex-column justify-content-center">
                          <h6 class="mb-0 text-sm">{{ ts.name }}</h6>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="d-flex px-2 py-1">
                        <div class="d-flex flex-column justify-content-center">
                          <a
                            class="text-xs font-weight-bold mb-0"
                            :href="`https://twitter.com/${ts.twitterId}`"
                            target="_blank"
                            >{{ ts.twitterId ? `@${ts.twitterId}` : "" }}</a
                          >
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="d-flex px-2 py-1">
                        <div class="d-flex flex-column justify-content-center">
                          <a
                            v-for="id in ts.telegramIds"
                            :key="id"
                            class="text-xs font-weight-bold mb-0"
                            :href="id"
                            target="_blank"
                            >{{ id.replaceAll("https://t.me/", "") }}</a
                          >
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="d-flex px-2 py-1">
                        <div class="d-flex flex-column justify-content-center">
                          <h6 class="mb-0 text-sm">{{ ts.fbId }}</h6>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="d-flex px-2 py-1">
                        <div class="d-flex flex-column justify-content-center">
                          <h6 class="mb-0 text-sm">{{ ts.ttId }}</h6>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="d-flex px-2 py-1">
                        <div class="d-flex flex-column justify-content-center">
                          <a
                            class="text-xs font-weight-bold mb-0"
                            :href="ts.ytId"
                            target="_blank"
                            >{{ ts.ytChannelName }}</a
                          >
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="d-flex px-2 py-1">
                        <div class="d-flex flex-column justify-content-center">
                          <a
                            class="text-xs font-weight-bold mb-0"
                            :href="`https://www.instagram.com/${ts.igId}`"
                            target="_blank"
                            >{{ ts.igId }}</a
                          >
                        </div>
                      </div>
                    </td>
                    <td>
                      <a
                        class="btn btn-link text-dark text-gradient px-3 mb-0"
                        @click="edit(ts._id)"
                      >
                        <i
                          class="fas fa-pencil-alt me-2"
                          aria-hidden="true"
                        ></i>
                      </a>
                      <a
                        class="btn btn-link text-danger text-gradient px-3 mb-0"
                        data-bs-toggle="modal"
                        data-bs-target="#deleteModal"
                        @click="onDelete(ts._id)"
                      >
                        <i class="far fa-trash-alt me-2" aria-hidden="true"></i>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VsudButton from "@/components/VsudButton.vue";
import axios from "axios";
import { baseURL } from "../router/endpoint";
export default {
  name: "timesheet",
  data() {
    return {
      timesheets: [],
      toDelete: "",
    };
  },
  components: {
    VsudButton,
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      axios
        .get(`${baseURL}/api/inf`, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.data) {
            console.log(res.data);
            if (res.data && res.data.payload && res.data.payload) {
              this.timesheets = res.data.payload;
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onDelete(id) {
      this.toDelete = id;
    },
    confirmDelete() {
      axios
        .delete(baseURL + "/api/inf/" + this.toDelete, {
          withCredentials: true,
        })
        .then(() => {
          this.fetchData();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    edit(id) {
      this.$router.push({
        path: `/influencers/${id}`,
      });
    },
    goToNewSheet() {
      this.$router.push({
        path: `/influencers/add`,
      });
    },
  },
};
</script>
