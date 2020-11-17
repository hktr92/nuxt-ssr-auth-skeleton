<template>
  <div class="container">
    <div v-if="!isLoggedIn">
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group
          id="input-group-1"
          label="Email address:"
          label-for="input-1"
          description="We'll never share your email with anyone else."
        >
          <b-form-input
            id="input-1"
            v-model="form.email"
            type="email"
            required
            placeholder="Enter email"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Your password:" label-for="input-2">
          <b-form-input
            id="input-2"
            type="password"
            v-model="form.password"
            required
            placeholder="Your password..."
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </div>
    <div v-if="isLoggedIn">
      <Logo/>
      <h1 class="title">
        Welcome, {{user.name}}!
      </h1>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          rel="noopener noreferrer"
          class="button--green"
        >
          Documentation
        </a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          rel="noopener noreferrer"
          class="button--grey"
        >
          GitHub
        </a>

        <b-btn v-if="isLoggedIn"
               variant="primary"
               @click="logout()"
        >Logout</b-btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {mapState} from "vuex";
import {UserModel} from "~/app/model/user.model";

export default Vue.extend({
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      show: true
    }
  },
  computed: {
    ...mapState(['user', 'isLoggedIn'])
  },
  methods: {
    logout() {
      this.$axios.$post<UserModel>('/api/auth/logout', this.form)
        .then(({ status, data, message }: any) => {
          if (!status) {
            this.$toast.error(message)
            return
          }

          this.$toast.success(message)
          this.$store.dispatch('logout')
        })
        .catch(error => console.error(error))
    },
    onSubmit(evt: any) {
      evt.preventDefault()

      this.$axios.$post<UserModel>('/api/auth/login', this.form)
        .then(({ status, data, message }: any) => {
          if (!status) {
            this.$toast.error(message)
            return
          }

          this.$toast.success(message)

          this.$store.dispatch('login', data)
        })
        .catch(error => console.error(error))
    },
    onReset(evt: any) {
      evt.preventDefault()

      this.$set(this, 'form', {})

      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
})
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand',
  'Source Sans Pro',
  -apple-system,
  BlinkMacSystemFont,
  'Segoe UI',
  Roboto,
  'Helvetica Neue',
  Arial,
  sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
