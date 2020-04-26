<template>
  <div class="container">
    <h2>Emailadres Bevestigen</h2>
    <div v-if="loading">
      <Loading />
    </div>
    <div v-else-if="error">
      <div class="errorcontainer">
        <Icon type="alert-circle" class="icon" />
        <span class="message">
          {{ error }}
        </span>
      </div>
    </div>
    <div v-else>
      Om je email te bevestigen heb je een code in je mailbox ontvangen (check ook je spam). Heb je geen mail ontvangen?
      Neem dan even contact op met secretaris@indicium.hu.<br /><br />
      <TextInput v-model="verification.address" label="Emailadres" placeholder="Emailadres" /><br />
      <TextInput v-model="verification.token" label="Token" placeholder="Bevestigingstoken" /><br />
      <Button size="l" @click.native="verifyMail">
        Bevestig
      </Button>
    </div>
  </div>
</template>

<script>
  import Button from '../components/interactions/button'
  import Loading from '../components/Loading'
  import TextInput from '../components/interactions/TextInput'
  import Icon from '../components/Icon'

  export default {
  name: 'Emailverificatie',
  components: {
    TextInput,
    Button,
    Loading,
    Icon,
  },
  data() {
    return {
      verification: {},
      loading: false,
      manual: false,
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
          address: email,
          token
        }
        await this.verifyMail()
      }
    },
    async verifyMail() {
      this.loading = true
      try {
        await this.$api.post('/mail/verify', this.verification)
        this.$router.push('/emailbevestigd')
      } catch (e) {
        this.error = e
      }
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>

  .errorcontainer {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    color: var(--indi-error);
    margin-bottom: 16px;

    .icon {
      width: 32px;
      height: 32px;
      font-size: 32px;
    }

    .message {
      padding-left: 8px;
    }
  }
</style>
