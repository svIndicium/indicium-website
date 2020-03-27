<template>
  <div class="container">
    <h2>Lid worden</h2>
    <p>
      Om lid te worden hebben we de volgende gegevens nodig. Uiteraard gaan wij zorgvuldig om met je gegevens, hoe we
      dat doen kan je terug vinden in ons
      <TextLink url="privacyreglement" inline>
        privacy reglement
      </TextLink>
      .
    </p>
    <input v-model="registration.firstName" type="text" placeholder="Voornaam" /><br />
    <input v-model="registration.middleName" type="text" placeholder="Tussevoegsel" /><br />
    <input v-model="registration.lastName" type="text" placeholder="Achternaam" /><br />
    <input v-model="registration.mailAddress" type="text" placeholder="Emailadres" /><br />
    <input v-model="registration.phoneNumber" type="text" placeholder="Telefoonnummer" /><br />
    <input v-model="registration.dateOfBirth" type="date" placeholder="Geboortedatum" /><br />
    <select v-model="registration.studyTypeId">
      <option disabled :value="0">
        Selecteer je studierichting
      </option>
      <option v-for="(studyType, idx) in studyTypes" :key="idx" :value="studyType.id">
        {{ studyType.name }}
      </option>
    </select><br />
    <input id="statuten" v-model="registration.statuten" type="checkbox" /> <label for="statuten">Ik ga akkoord met de
      <TextLink url="statuten" inline>statuten</TextLink>
      van Studievereniging Indicium.</label><br />
    <input id="nieuwsbrief" v-model="registration.toReceiveNewsletter" type="checkbox" /> <label for="nieuwsbrief">Ik wil
      graag de maandelijkse nieuwsbrief ontvangen met aankomende activiteiten, nieuwtjes en updates van de
      vereniging.</label><br />
    <Button @click.native="saveRegistration">
      Meld je aan
    </Button>
    {{ registration }}
  </div>
</template>

<script>
  import TextLink from '../components/interactions/TextLink'
  import Button from '../components/interactions/button'

  export default {
  name: 'Aanmelden',
  components: {
    Button,
    TextLink
  },
  data() {
    return {
      registration: {
        firstName: null,
        middleName: null,
        lastName: null,
        mailAddress: null,
        phoneNumber: null,
        dateOfBirth: new Date(),
        studyTypeId: 0,
        statuten: false,
        toReceiveNewsletter: false
      },
      studyTypes: [],
      loading: false
    }
  },
  mounted() {
    this.getStudyTypes()
  },
  methods: {
    getStudyTypes() {
      this.$api.get('/studytype')
        .then((res) => {
          this.studyTypes = res.data
        })
    },
    async saveRegistration() {
      this.loading = true
      const res = await this.$api.post('/registration', this.registration)
      if (res.status === 201) {
        this.loading = false
      }
    },
    validateRegistration() {
    }
  }
}
</script>

<style lang="scss" scoped>
  label {
    display: inline;
  }
</style>
