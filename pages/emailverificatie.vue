<template>
  <div class="container">
    <div v-if="error">
      {{ error }}
    </div>
    <h2>Email verificatie</h2>
    <div v-if="result !== null">
      {{ result }}
    </div>
    <div v-else-if="loading === true">
      <Loading />
    </div>
    <div v-else>
      Om je email te verifiëren heb je een code in je mailbox ontvangen (check ook je spam). Heb je geen mail ontvangen?
      Neem dan even contact op met secretaris@indicium.hu.<br />
      <input v-model="verification.mailAddress" type="text" name="email" placeholder="email adres" /><br />
      <input v-model="verification.token" type="text" name="token" placeholder="verificatie token" /><br />
      <Button @click.native="verifyMail">
        Verifieer
      </Button>
    </div>
  </div>
</template>

<script>
  import Button from '../components/interactions/button'
  import Loading from '../components/Loading'

  export default {
  name: 'Emailverificatie',
  components: {
    Button,
    Loading
  },
  data() {
    return {
      verification: {},
      loading: false,
      manual: false,
      result: null,
      error: null
    }
  },
  async mounted() {
    this.loading = true
    await this.getParameters()
  },
  methods: {
    async getParameters() {
      const email = this.$route.query.email || null
      const token = this.$route.query.token || null
      if (email === null || token === null) {
        this.manual = true
        this.loading = false
      } else {
        this.verification = {
          mailAddress: email,
          token
        }
        await this.verifyMail()
      }
    },
    async verifyMail() {
      const res = await this.$api.post('/mail/verify', this.verification)
      if (res.status === 200) {
        this.result = 'Je email is geverifieerd'
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>

</style>
