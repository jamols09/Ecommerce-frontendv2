<script setup lang="ts">
const emit = defineEmits(['close'])
</script>

<template>
  <div class="sidebar-panel is-generic">
    <div class="subpanel-header">
      <h3 class="no-mb">Settings</h3>
      <div class="panel-close" @click="emit('close')">
        <i aria-hidden="true" class="iconify" data-icon="feather:x"></i>
      </div>
    </div>
    <div class="inner" data-simplebar>
      <ul>
        <li v-has-nested-router-link class="has-children">
          <div class="collapse-wrap">
            <a class="parent-link">
              <i aria-hidden="true" class="lnil lnil-car pr-3"></i>
              Delivery
              <i
                aria-hidden="true"
                class="iconify"
                data-icon="feather:chevron-right"
              />
            </a>
          </div>
          <ul>
            <li>
              <RouterLink
                :to="{ name: 'app' }"
                class="is-submenu"
                title="Blog list"
              >
                <i aria-hidden="true" class="lnil lnil-list pr-3"></i>
                <span>Menu</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink
                :to="{ name: 'app-delivery-map' }"
                class="is-submenu"
                title="Add blog"
              >
                <i aria-hidden="true" class="lnil lnil-map pr-3"></i>
                <span>Map</span>
              </RouterLink>
            </li>
          </ul>
        </li>
        <li v-has-nested-router-link class="has-children">
          <div class="collapse-wrap">
            <a class="parent-link">
              <i aria-hidden="true" class="lnil lnil-credit-cards pr-3"></i>
              Payment
              <i
                aria-hidden="true"
                class="iconify"
                data-icon="feather:chevron-right"
              />
            </a>
          </div>
        </li>
        <li v-has-nested-router-link class="has-children">
          <div class="collapse-wrap">
            <a class="parent-link">
              <i aria-hidden="true" class="lnil lnil-credit-cards pr-3"></i>
              Social Accounts
              <i
                aria-hidden="true"
                class="iconify"
                data-icon="feather:chevron-right"
              />
            </a>
          </div>
        </li>
        <li class="divider"></li>

        <li class="divider with-label">
          <span class="divider-label">Admin API Integrations</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
@import '../../scss/abstracts/_variables.scss';
@import '../../scss/layout/_sidebar-panel.scss';
</style>
