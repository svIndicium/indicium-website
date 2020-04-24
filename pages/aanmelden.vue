<template>
  <div class="container">
    <h2>Lid worden</h2>
    <div v-if="loading">
      <Loading />
    </div>
    <div v-else>
      <p>
        Harstikke leuk dat je lid wilt worden van Indicium! Om je in te schrijven hebben we een aantal standaard gegevens van je nodig. Uiteraard zullen we zorgvuldig omgaan met je gegevens, meer weten? Check ons
        <TextLink url="privacyreglement" inline>
          privacy reglement
        </TextLink>
        !
      </p>
      <TextInput
        v-model="registration.firstName"
        placeholder="Voornaam"
        label="Voornaam"
        name="firstName"
        :error="fieldErrors['firstName']"
        required
      />
      <TextInput v-model="registration.middleName" placeholder="Tussenvoegsel" name="middleName" label="Tussenvoegsel" :error="fieldErrors['middleName']" />
      <TextInput
        v-model="registration.lastName"
        placeholder="Achternaam"
        name="lastName"
        label="Achternaam"
        required
        :error="fieldErrors['lastName']"
      />
      <TextInput
        v-model="registration.mailAddress"
        placeholder="Emailadres"
        name="email"
        label="Emailadres"
        required
        :error="fieldErrors['mailAddress']"
      />
      <TextInput
        v-model="registration.phoneNumber"
        placeholder="Telefoonnummer"
        name="phoneNumber"
        label="Telefoonnummer"
        required
        :error="fieldErrors['phoneNumber']"
      />
      <client-only>
        <date-input
          v-model="registration.dateOfBirth"
          label="Geboortedatum"
          name="dateOfBirth"
          placeholder="Geboortedatum"
          :error="fieldErrors['dateOfBirth']"
          required
        />
        <SelectBox
          v-model="registration.studyTypeId"
          :items="getStudyTypesForSelectBox"
          :zeroItem="getDefaultItemForSelectBox"
          :error="fieldErrors['studyTypeId']"
          label="Studierichting"
          extra="Ga je beginnen aan de opleiding? Kies dan P!"
          required
        />
      </client-only>
      <CheckBox v-model="registration.statuten" class="check-box" :error="fieldErrors['statuten']" required>
        Ik ga akkoord met de
        <TextLink url="statuten" inline>
          statuten
        </TextLink>
        van Studievereniging Indicium.
      </CheckBox>
      <CheckBox v-model="registration.toReceiveNewsletter" class="check-box">
        Ik wil graag de maandelijkse nieuwsbrief ontvangen met aankomende activiteiten, nieuwtjes en updates van de vereniging.
      </CheckBox>
      <div v-if="error" class="global-error-message">
        {{ error.message }}
      </div>
      <Button size="l" class="submit-buttom" @click.native="saveRegistration">
        Meld je aan
      </Button>
    </div>
  </div>
</template>

<script>
  import TextLink from '../components/interactions/TextLink.vue'
  import Button from '../components/interactions/button.vue'
  import TextInput from '../components/interactions/TextInput.vue'
  import SelectBox from '../components/interactions/SelectBox.vue'
  import CheckBox from '../components/interactions/CheckBox.vue'
  import Loading from '../components/Loading.vue'

  export default {
  name: 'Aanmelden',
  components: {
    CheckBox,
    SelectBox,
    TextInput,
    Button,
    TextLink,
    Loading,
  },
  data() {
    return {
      registration: {
        firstName: null,
        middleName: null,
        lastName: null,
        mailAddress: null,
        phoneNumber: null,
        dateOfBirth: null,
        studyTypeId: 0,
        statuten: false,
        toReceiveNewsletter: false
      },
      studyTypes: [],
      loading: false,
      error: null,
      fieldErrors: {}
    }
  },
  computed: {
    getStudyTypesForSelectBox() {
      return this.studyTypes.map(studyType => ({ key: studyType.name, value: studyType.id }))
    },
    getDefaultItemForSelectBox() {
      return { key: 'Selecteer studierichting', value: 0 }
    },
  },
  watch: {
    error(e) {
      if (e !== null && e.errors !== undefined) {
        this.fieldErrors = []
        e.errors.forEach((err) => {
          this.fieldErrors[err.field] = err.message
        })
      }
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
      try {
        const res = await this.$api.post('/registration', this.registration)
      } catch (e) {
        if (e.response.status === 400) {
          this.error = e.response.data.error
        }
      }
      this.loading = false
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

  .check-box {
    margin-top: 8px;
  }

  .submit-buttom {
    margin-top: 16px;
  }

  .global-error-message {
    margin-top: 16px;
    color: var(--indi-error);
  }
</style>
