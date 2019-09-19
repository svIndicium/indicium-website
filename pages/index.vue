<template>
  <div>
    <Heading />

    <no-ssr>
      <Sponsoren />
    </no-ssr>

    <TextBlock
      type="text-center"
      title="Over Indicium"
      text="Wij zijn dé studievereniging voor HBO-ICT van Hogeschool Utrecht. We organiseren het hele jaar door activiteiten zoals bedrijfsbezoeken, kroegcolleges, gastcolleges, lunchlezingen, en nog veel meer over allerlei verschillende onderwerpen. Maar we organiseren natuurlijk ook activiteiten voor gezelligheid! Kom eens langs op onze borrels, LAN-party's of iets anders dat we organiseren!"
      :contained="true"
    />

    <Events />

    <TextBlock
      type="text-center"
      title="Lid zijn is meedoen!"
      text="Een hoop activiteiten organiseren we voor iedereen. Maar als lid krijg je natuurlijk veel meer voordelen! Je krijgt dan korting bij activiteiten of je wordt uitgenodigd voor activiteiten die exclusief voor leden zijn. Ook kunnen we je helpen met het zoeken van een stage en kan je er altijd terecht als je ergens niet uitkomt. Interesse?"
      readMoreButtonText="Word lid"
      :contained="true"
      :button="{
        text: 'Direct Inschrijven',
        url: 'https://docs.google.com/forms/d/e/1FAIpQLSeYE3T-IdYrxb1FB2wKGtltf5D16aLzsDdaW3g1IZAj5Lxj3Q/viewform'
      }"
    />

    <TextBlock
      type="text-center"
      title="Commissies?"
      text="Lijkt je het leuk om de vereniging te helpen door het meeorganiseren van activiteiten, zoals borrels, feestjes, gastcolleges, lunchlezingen, reizen, of wil je je programmeerskills verbeteren? Neem eens een kijkje bij onze commissies, deze commissies bestaan uit enthousiaste leden die helpen om de vereniging draaiende te houden. Wil je meer informatie of wil je weten wat voor commissies er allemaal zijn?"
      :contained="true"
      :button="{
        text: 'Meer weten',
        url: '/over-indicium'
      }"
    />
  </div>
</template>

<script>
import Heading from '../components/Heading'
import Sponsoren from '../components/Sponsoren'
import TextBlock from '../components/TextBlock'
import ImageBlock from '../components/ImageBlock'
import Events from '../components/Events'

export default {
  name: 'Home',
  components: {
    Heading,
    Sponsoren,
    TextBlock,
    ImageBlock,
    Events
  },
  head() {
    return {
      title: 'Indicium'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables.scss';

* {
  box-sizing: border-box;
}

.text-block, .image-block {
  padding: 80px 0;
  @media screen and (max-width: $bp-tablet-sm) {
    padding: 12px 0;
  }
}
</style>
