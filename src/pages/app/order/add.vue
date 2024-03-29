<script setup lang="ts">
import { nextTick, ref } from 'vue'
import VueScrollTo from 'vue-scrollto'
import { useNotyf } from '/@src/composable/useNotyf'
import sleep from '/@src/utils/sleep'

const notyf = useNotyf()
const { scrollTo } = VueScrollTo

const currentStep = ref(0)
const isLoading = ref(false)
const currentHelp = ref(-1)
const controlType = ref('')
const storageType = ref('')
const taxType = ref('')
const taxStatements = ref('')

const validateStep = async () => {
  if (currentStep.value === 4) {
    if (isLoading.value) {
      return
    }

    isLoading.value = true
    notyf.success('Your shipment is successfully stored!')
    await sleep(1000)

    // router.push({
    //   name: 'sidebar-dashboards',
    // })
    return
  }

  isLoading.value = true
  await sleep(400)
  currentStep.value += 1

  nextTick(() => {
    scrollTo(`#form-step-${currentStep.value}`, 1000)
    isLoading.value = false
  })
}
</script>

<template>
  <form @submit.prevent="validateStep">
    <div class="mobile-steps is-active">
      <ul class="steps has-content-centered is-thin is-horizontal is-short">
        <li :class="[currentStep === 0 && 'is-active']" class="steps-segment">
          <span class="steps-marker"></span>
          <a
            href="#"
            class="steps-content"
            @click.prevent="
              currentStep >= 0 && scrollTo('#form-step-0', 800, { offset: -150 })
            "
          >
            <p class="step-number">Step 1</p>
          </a>
        </li>

        <li :class="[currentStep === 1 && 'is-active']" class="steps-segment">
          <span class="steps-marker"></span>
          <a
            href="#"
            class="steps-content"
            @click.prevent="
              currentStep >= 1 && scrollTo('#form-step-1', 800, { offset: -150 })
            "
          >
            <p class="step-number">Step 2</p>
          </a>
        </li>

        <li :class="[currentStep === 2 && 'is-active']" class="steps-segment">
          <span class="steps-marker"></span>
          <a
            href="#"
            class="steps-content"
            @click.prevent="
              currentStep >= 2 && scrollTo('#form-step-2', 800, { offset: -150 })
            "
          >
            <p class="step-number">Step 3</p>
          </a>
        </li>

        <li :class="[currentStep === 3 && 'is-active']" class="steps-segment">
          <span class="steps-marker"></span>
          <a
            href="#"
            class="steps-content"
            @click.prevent="
              currentStep >= 3 && scrollTo('#form-step-3', 800, { offset: -150 })
            "
          >
            <p class="step-number">Step 4</p>
          </a>
        </li>

        <li :class="[currentStep === 4 && 'is-active']" class="steps-segment">
          <span class="steps-marker"></span>
          <a
            href="#"
            class="steps-content"
            @click.prevent="
              currentStep >= 4 && scrollTo('#form-step-4', 800, { offset: -150 })
            "
          >
            <p class="step-number">Step 5</p>
          </a>
        </li>
      </ul>
    </div>
    <div class="stepper-form">
      <div class="form-sections">
        <div v-if="currentStep >= 0" id="form-step-0" class="form-section is-active">
          <h3 class="form-section-title">
            <span>General Information</span>
            <button
              type="button"
              class="help-button"
              tabindex="0"
              @keydown.space.prevent="
                currentHelp === 0 ? (currentHelp = -1) : (currentHelp = 0)
              "
              @click="currentHelp === 0 ? (currentHelp = -1) : (currentHelp = 0)"
            >
              <i aria-hidden="true" class="iconify" data-icon="feather:help-circle"></i>
            </button>
          </h3>

          <div class="form-section-inner">
            <div class="fieldset">
              <VField grouped>
                <VControl expanded>
                  <VInput type="text" placeholder="Name of the product" />
                </VControl>
              </VField>

              <div class="fieldset-separator"></div>

              <VField>
                <VLabel>Type</VLabel>
                <VControl>
                  <Multiselect
                    v-model="controlType"
                    :options="['X-REF Quality', 'SERPA Check', 'AMF Check']"
                    placeholder="Select a control type"
                  />
                </VControl>
              </VField>

              <VField>
                <VLabel>Additional Notes</VLabel>
                <VControl>
                  <VInput type="text" placeholder="Add some additional notes" />
                </VControl>
              </VField>

              <VField v-slot="{ id }">
                <VLabel>Method</VLabel>
                <VControl>
                  <Multiselect
                    v-model="storageType"
                    :attrs="{ id }"
                    :options="[
                      'LVL 1 Security warehouse',
                      'LVL 2 Security warehouse',
                      'LVL 3 Security warehouse',
                    ]"
                    placeholder="Select a storage"
                  />
                </VControl>
              </VField>

              <VField>
                <VLabel>Quantity (units)</VLabel>
                <VControl>
                  <VInput type="number" placeholder="Enter a quantity" />
                </VControl>
              </VField>

              <VField>
                <VLabel>Duration (days)</VLabel>
                <VControl>
                  <VInput type="number" placeholder="Enter a storage duration" />
                </VControl>
              </VField>

              <VField>
                <div class="buttons">
                  <VButton>Add Shipment</VButton>
                </div>
              </VField>
            </div>
          </div>
          <div class="form-section-output">
            <div class="output">
              <i aria-hidden="true" class="iconify" data-icon="feather:archive"></i>
              <span>15 i9 Laptops - b2</span>
              <div class="action">
                <VIconButton icon="feather:trash-2" />
              </div>
            </div>
          </div>
        </div>

        <Transition name="fade-slow">
          <div v-if="currentStep >= 1" id="form-step-1" class="form-section is-active">
            <h3 class="form-section-title">
              <span>Shipment Owner</span>
              <button
                type="button"
                class="help-button"
                @keydown.space.prevent="
                  currentHelp === 1 ? (currentHelp = -1) : (currentHelp = 1)
                "
                @click="currentHelp === 1 ? (currentHelp = -1) : (currentHelp = 1)"
              >
                <i aria-hidden="true" class="iconify" data-icon="feather:help-circle"></i>
              </button>
            </h3>

            <div class="form-section-inner">
              <VField>
                <VControl>
                  <VInput type="text" placeholder="Owning company name" />
                </VControl>
              </VField>

              <VField>
                <VControl>
                  <button type="button" class="input-button">
                    <i aria-hidden="true" class="iconify" data-icon="feather:plus"></i>
                    <span>Add contact</span>
                  </button>
                </VControl>
              </VField>

              <div class="fieldset">
                <VField grouped>
                  <VControl expanded>
                    <VInput type="text" placeholder="Full name" />
                  </VControl>
                  <VControl subcontrol>
                    <VSwitchSegment label-true="Ground" label-false="Other" />
                  </VControl>
                </VField>

                <VField grouped>
                  <VControl expanded>
                    <VInput type="text" placeholder="Email address" />
                  </VControl>
                  <VControl subcontrol>
                    <VCheckbox> Primary </VCheckbox>
                  </VControl>
                </VField>

                <VField grouped>
                  <VControl expanded>
                    <VInput type="text" placeholder="Phone number" />
                  </VControl>
                  <VControl subcontrol></VControl>
                </VField>
              </div>
            </div>

            <div class="form-section-output">
              <div class="output">
                <i aria-hidden="true" class="iconify" data-icon="feather:user"></i>
                <span>Erik Kovalsky</span>
                <div class="action">
                  <VIconButton icon="feather:trash-2" />
                </div>
              </div>
              <div class="output">
                <i aria-hidden="true" class="iconify" data-icon="feather:user"></i>
                <span>Elsa Walker</span>
                <div class="action">
                  <VIconButton icon="feather:trash-2" />
                </div>
              </div>
            </div>
          </div>
        </Transition>

        <Transition name="fade-slow">
          <div v-if="currentStep >= 2" id="form-step-2" class="form-section is-active">
            <h3 class="form-section-title">
              <span>Shipment Taxes</span>
              <button
                type="button"
                class="help-button"
                @keydown.space.prevent="
                  currentHelp === 2 ? (currentHelp = -1) : (currentHelp = 2)
                "
                @click="currentHelp === 2 ? (currentHelp = -1) : (currentHelp = 2)"
              >
                <i aria-hidden="true" class="iconify" data-icon="feather:help-circle"></i>
              </button>
            </h3>

            <div class="form-section-inner">
              <VField>
                <VControl>
                  <VInput type="text" placeholder="Company Tax ID" />
                </VControl>
              </VField>

              <div class="columns">
                <div class="column is-6">
                  <VField>
                    <VControl>
                      <Multiselect
                        v-model="taxType"
                        :options="['VAT', 'RFC', 'SFC']"
                        placeholder="Tax Type"
                      />
                    </VControl>
                  </VField>
                </div>
                <div class="column is-6">
                  <VField>
                    <VControl>
                      <Multiselect
                        v-model="taxStatements"
                        :options="['W-12 Form', 'W-12a Form', 'Z-Form']"
                        placeholder="Tax Statements"
                      />
                    </VControl>
                  </VField>
                </div>
              </div>
            </div>
          </div>
        </Transition>

        <Transition name="fade-slow">
          <div v-if="currentStep >= 3" id="form-step-3" class="form-section is-active">
            <h3 class="form-section-title">
              <span>Options</span>
              <button
                type="button"
                class="help-button"
                @keydown.space.prevent="
                  currentHelp === 3 ? (currentHelp = -1) : (currentHelp = 3)
                "
                @click="currentHelp === 3 ? (currentHelp = -1) : (currentHelp = 3)"
              >
                <i aria-hidden="true" class="iconify" data-icon="feather:help-circle"></i>
              </button>
            </h3>

            <div class="form-section-inner">
              <div class="options">
                <VField class="option">
                  <VInput raw type="checkbox" />
                  <div class="indicator">
                    <i aria-hidden="true" class="iconify" data-icon="feather:check"></i>
                  </div>
                  <div class="option-inner">
                    <i aria-hidden="true" class="lnil lnil-consulting"></i>
                    <h4>Double check</h4>
                    <p>Second control pass</p>
                  </div>
                </VField>

                <VField class="option">
                  <VInput raw type="checkbox" />
                  <div class="indicator">
                    <i aria-hidden="true" class="iconify" data-icon="feather:check"></i>
                  </div>
                  <div class="option-inner">
                    <i aria-hidden="true" class="lnil lnil-tie"></i>
                    <h4>Agent</h4>
                    <p>Dedicated agent</p>
                  </div>
                </VField>

                <VField class="option">
                  <VInput raw type="checkbox" />
                  <div class="indicator">
                    <i aria-hidden="true" class="iconify" data-icon="feather:check"></i>
                  </div>
                  <div class="option-inner">
                    <i aria-hidden="true" class="lnil lnil-handshake"></i>
                    <h4>Insurance</h4>
                    <p>Level 1-3 goods</p>
                  </div>
                </VField>

                <VField class="option">
                  <VInput raw type="checkbox" />
                  <div class="indicator">
                    <i aria-hidden="true" class="iconify" data-icon="feather:check"></i>
                  </div>
                  <div class="option-inner">
                    <i aria-hidden="true" class="lnil lnil-licencse"></i>
                    <h4>Extension</h4>
                    <p>License extension</p>
                  </div>
                </VField>

                <VField class="option">
                  <VInput raw type="checkbox" />
                  <div class="indicator">
                    <i aria-hidden="true" class="iconify" data-icon="feather:check"></i>
                  </div>
                  <div class="option-inner">
                    <i aria-hidden="true" class="lnil lnil-pie-chart-alt"></i>
                    <h4>BI Reports</h4>
                    <p>Custom made reports</p>
                  </div>
                </VField>

                <VField class="option">
                  <VInput raw type="checkbox" />
                  <div class="indicator">
                    <i aria-hidden="true" class="iconify" data-icon="feather:check"></i>
                  </div>
                  <div class="option-inner">
                    <i aria-hidden="true" class="lnil lnil-customer"></i>
                    <h4>Metrics</h4>
                    <p>Setup live metrics</p>
                  </div>
                </VField>
              </div>
            </div>
          </div>
        </Transition>

        <Transition name="fade-slow">
          <div v-if="currentStep >= 4" id="form-step-4" class="form-section is-active">
            <h3 class="form-section-title">
              <span>Validation</span>
              <button
                type="button"
                class="help-button"
                @keydown.space.prevent="
                  currentHelp === 4 ? (currentHelp = -1) : (currentHelp = 4)
                "
                @click="currentHelp === 4 ? (currentHelp = -1) : (currentHelp = 4)"
              >
                <i aria-hidden="true" class="iconify" data-icon="feather:help-circle"></i>
              </button>
            </h3>
            <div class="form-section-inner">
              <div class="validation-box">
                <div class="box-content">
                  <h3>Excellent</h3>
                  <p>
                    Before submitting the form, make sure you've filled all the required
                    fields. Once submitted, you won't be able to change the info for this
                    shipment.
                  </p>
                </div>
                <div class="box-illustration">
                  <img src="/@src/assets/illustrations/plants/1.svg" alt="" />
                </div>
              </div>
            </div>
          </div>
        </Transition>

        <div class="navigation-buttons">
          <div class="buttons is-right">
            <VButton type="submit" color="primary" bold :loading="isLoading" tabindex="0">
              Continue
            </VButton>
          </div>
        </div>
      </div>

      <div class="form-stepper">
        <ul v-if="currentHelp === -1" class="steps is-vertical is-thin is-short">
          <li
            id="step-segment-0"
            :class="[currentStep === 0 && 'is-active']"
            class="steps-segment"
            tabindex="0"
            @keydown.space.prevent="
              currentStep >= 0 && scrollTo('#form-step-0', 800, { offset: -20 })
            "
            @click.prevent="
              currentStep >= 0 && scrollTo('#form-step-0', 800, { offset: -20 })
            "
          >
            <a href="#" class="steps-marker"></a>
            <div class="steps-content">
              <p class="step-number">STEP 1</p>
              <p class="step-info">General Information</p>
            </div>
          </li>
          <li
            id="step-segment-1"
            :class="[currentStep === 1 && 'is-active']"
            class="steps-segment"
            tabindex="0"
            @keydown.space.prevent="
              currentStep >= 1 && scrollTo('#form-step-1', 800, { offset: -20 })
            "
            @click.prevent="
              currentStep >= 1 && scrollTo('#form-step-1', 800, { offset: -20 })
            "
          >
            <a href="#" class="steps-marker"></a>
            <div class="steps-content">
              <p class="step-number">STEP 2</p>
              <p class="step-info">Shipment Owner</p>
            </div>
          </li>
          <li
            id="step-segment-2"
            :class="[currentStep === 2 && 'is-active']"
            class="steps-segment"
            tabindex="0"
            @keydown.space.prevent="
              currentStep >= 2 && scrollTo('#form-step-2', 800, { offset: -20 })
            "
            @click.prevent="
              currentStep >= 2 && scrollTo('#form-step-2', 800, { offset: -20 })
            "
          >
            <a href="#" class="steps-marker"></a>
            <div class="steps-content">
              <p class="step-number">STEP 3</p>
              <p class="step-info">Shipment Taxes</p>
            </div>
          </li>
          <li
            id="step-segment-3"
            :class="[currentStep === 3 && 'is-active']"
            class="steps-segment"
            tabindex="0"
            @keydown.space.prevent="
              currentStep >= 3 && scrollTo('#form-step-3', 800, { offset: -20 })
            "
            @click.prevent="
              currentStep >= 3 && scrollTo('#form-step-3', 800, { offset: -20 })
            "
          >
            <a href="#" class="steps-marker"></a>
            <div class="steps-content">
              <p class="step-number">STEP 4</p>
              <p class="step-info">Options</p>
            </div>
          </li>
          <li
            id="step-segment-4"
            :class="[currentStep === 4 && 'is-active']"
            class="steps-segment"
            tabindex="0"
            @keydown.space.prevent="
              currentStep >= 4 && scrollTo('#form-step-4', 800, { offset: -20 })
            "
            @click.prevent="
              currentStep >= 4 && scrollTo('#form-step-4', 800, { offset: -20 })
            "
          >
            <a href="#" class="steps-marker"></a>
            <div class="steps-content">
              <p class="step-number">STEP 5</p>
              <p class="step-info">Validation</p>
            </div>
          </li>
        </ul>
        <div v-else class="form-help">
          <div
            v-if="currentHelp === 0"
            id="help-section-0"
            class="form-help-inner is-active"
          >
            <button
              class="close-help-button"
              tabindex="0"
              @keydown.space.prevent="currentHelp = -1"
              @click="currentHelp = -1"
            >
              <i aria-hidden="true" class="iconify" data-icon="feather:x"></i>
            </button>
            <h3>General Information</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quod proximum
              fuit non vidit. Quantum Aristoxeni ingenium consumptum videmus in musicis?
              An eiusdem modi? Quae similitudo in genere etiam humano apparet.
            </p>
            <div class="list-wrap">
              <ul>
                <li>
                  <i aria-hidden="true" class="iconify" data-icon="feather:check"></i>
                  <span>Some nice list item</span>
                </li>
                <li>
                  <i aria-hidden="true" class="iconify" data-icon="feather:check"></i>
                  <span>Some nice list item</span>
                </li>
                <li>
                  <i aria-hidden="true" class="iconify" data-icon="feather:check"></i>
                  <span>Some nice list item</span>
                </li>
              </ul>
            </div>
          </div>
          <div
            v-if="currentHelp === 1"
            id="help-section-1"
            class="form-help-inner is-active"
          >
            <button
              class="close-help-button"
              tabindex="0"
              @keydown.space.prevent="currentHelp = -1"
              @click="currentHelp = -1"
            >
              <i aria-hidden="true" class="iconify" data-icon="feather:x"></i>
            </button>
            <h3>Shipment Owner</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quod proximum
              fuit non vidit. Quantum Aristoxeni ingenium consumptum videmus in musicis?
              An eiusdem modi? Quae similitudo in genere.
            </p>
            <div class="list-wrap">
              <ul>
                <li>
                  <i aria-hidden="true" class="iconify" data-icon="feather:check"></i>
                  <span>Some nice list item</span>
                </li>
                <li>
                  <i aria-hidden="true" class="iconify" data-icon="feather:check"></i>
                  <span>Some nice list item</span>
                </li>
              </ul>
            </div>
          </div>
          <div
            v-if="currentHelp === 2"
            id="help-section-2"
            class="form-help-inner is-active"
          >
            <button
              class="close-help-button"
              tabindex="0"
              @keydown.space.prevent="currentHelp = -1"
              @click="currentHelp = -1"
            >
              <i aria-hidden="true" class="iconify" data-icon="feather:x"></i>
            </button>
            <h3>Shipment Taxes</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quod proximum
              fuit non vidit. Quantum Aristoxeni ingenium consumptum videmus in musicis?
              An eiusdem modi? Quae similitudo in genere etiam humano apparet.
            </p>
            <div class="list-wrap">
              <ul>
                <li>
                  <i aria-hidden="true" class="iconify" data-icon="feather:check"></i>
                  <span>Some nice list item</span>
                </li>
                <li>
                  <i aria-hidden="true" class="iconify" data-icon="feather:check"></i>
                  <span>Some nice list item</span>
                </li>
                <li>
                  <i aria-hidden="true" class="iconify" data-icon="feather:check"></i>
                  <span>Some nice list item</span>
                </li>
              </ul>
            </div>
          </div>
          <div
            v-if="currentHelp === 3"
            id="help-section-3"
            class="form-help-inner is-active"
          >
            <button
              class="close-help-button"
              tabindex="0"
              @keydown.space.prevent="currentHelp = -1"
              @click="currentHelp = -1"
            >
              <i aria-hidden="true" class="iconify" data-icon="feather:x"></i>
            </button>
            <h3>Options</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quod proximum
              fuit non vidit. Quantum Aristoxeni ingenium consumptum videmus in musicis?
              An eiusdem modi? Quae similitudo in genere.
            </p>
            <div class="list-wrap">
              <ul>
                <li>
                  <i aria-hidden="true" class="iconify" data-icon="feather:check"></i>
                  <span>Some nice list item</span>
                </li>
                <li>
                  <i aria-hidden="true" class="iconify" data-icon="feather:check"></i>
                  <span>Some nice list item</span>
                </li>
              </ul>
            </div>
          </div>
          <div
            v-if="currentHelp === 4"
            id="help-section-4"
            class="form-help-inner is-active"
          >
            <button
              class="close-help-button"
              tabindex="0"
              @keydown.space.prevent="currentHelp = -1"
              @click="currentHelp = -1"
            >
              <i aria-hidden="true" class="iconify" data-icon="feather:x"></i>
            </button>
            <h3>Validation</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quod proximum
              fuit non vidit. Quantum Aristoxeni ingenium consumptum videmus in musicis?
              An eiusdem modi? Quae similitudo in genere.
            </p>
            <div class="list-wrap">
              <ul>
                <li>
                  <i aria-hidden="true" class="iconify" data-icon="feather:check"></i>
                  <span>Some nice list item</span>
                </li>
                <li>
                  <i aria-hidden="true" class="iconify" data-icon="feather:check"></i>
                  <span>Some nice list item</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<style lang="scss">
@import '/@src/scss/forms/layout_5.scss';
</style>
