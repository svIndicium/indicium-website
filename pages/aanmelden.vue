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
        :key="phoneNumberKey"
        v-model="registration.phoneNumber"
        placeholder="Telefoonnummer"
        name="phoneNumber"
        label="Telefoonnummer"
        required
        :error="fieldErrors['phoneNumber']"
        @focusout="fixPhoneNumber"
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
      <CheckBox v-model="registration.acceptsStatuten" class="check-box" :error="fieldErrors['acceptsStatuten']" required>
        Ik ga akkoord met de
        <TextLink url="statuten" inline>
          statuten
        </TextLink>
        van Studievereniging Indicium.
      </CheckBox>
      <CheckBox v-model="registration.receivingNewsletter" class="check-box">
        Ik wil graag de maandelijkse nieuwsbrief ontvangen met aankomende activiteiten, nieuwtjes en updates van de vereniging.
      </CheckBox>
      <div v-if="error">
        <div class="errorcontainer">
          <Icon type="alert-triangle" class="icon" />
          <span class="message">
          {{ error }}
        </span>
        </div>
      </div>
      <Button size="l" class="submit-buttom" @click.native="validateRegistration">
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
import Icon from '../components/Icon.vue'

export default {
  name: 'Aanmelden',
  components: {
    CheckBox,
    SelectBox,
    TextInput,
    Button,
    TextLink,
    Loading,
    Icon,
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
        acceptsStatuten: false,
        receivingNewsletter: false
      },
      phoneNumberKey: 0,
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
      this.$api.get('/studytypes')
        .then((res) => {
          this.studyTypes = res.data
        })
    },
    async saveRegistration() {
      this.validateRegistration()
      if (Object.keys(this.fieldErrors).length !== 0) {
        this.error = 'Je aanmelding klopt niet helemaal, verbeter hem en lever hem opnieuw in!'
        return
      }
      this.loading = true
      try {
        const { status } = await this.$api.post('/registrations', this.registration)
        if (status === 201) {
          this.$router.push('/aangemeld')
        }
      } catch (e) {
        if (e.response.status === 400) {
          this.error = e.response.data.error.message
        }
      }
      this.loading = false
    },
    fixPhoneNumber() {
      if (this.registration.phoneNumber !== null) {
        if (this.registration.phoneNumber.startsWith('06')) {
          this.$set(this.registration, 'phoneNumber', `+316${this.registration.phoneNumber.slice(2, 10)}`)
          this.phoneNumberKey += 1
        }
      }
    },
    addFieldError(field, error) {
      this.fieldErrors[field] = error
    },
    validateRegistration() {
      this.fieldErrors = {}
      this.checkNotBlank('firstName', 'Voornaam mag niet leeg zijn.')
      this.checkNotBlank('lastName', 'Achternaam mag niet leeg zijn.')
      this.checkNotBlank('mailAddress', 'Emailadres mag niet leeg zijn.')
      this.checkNotBlank('phoneNumber', 'Telefoonnummer mag niet leeg zijn.')
      this.checkNotBlank('dateOfBirth', 'Geboortedatum mag niet leeg zijn.')
      if (this.registration.phoneNumber !== null && (!this.registration.phoneNumber.startsWith('+316') || this.registration.phoneNumber.length !== 12)) {
        this.addFieldError('phoneNumber', 'Voer alsjeblieft een geldig mobiel nummer in')
      }
      if (this.registration.studyTypeId === 0) {
        this.addFieldError('studyTypeId', 'Selecteer een studierichting')
      }
      if (!this.registration.statuten) {
        this.addFieldError('statuten', 'Ga akkoord met de statuten om verder te gaan')
      }
    },
    checkNotBlank(field, error) {
      if (this.registration[field] === null || this.registration.firstName === '') {
        this.addFieldError(field, error)
      }
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

  .errorcontainer {
    margin-top: 16px;
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
