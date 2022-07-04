<script setup lang="ts">
const emit = defineEmits(['close'])
</script>

<template>
  <div class="sidebar-panel is-generic">
    <div class="subpanel-header">
      <h3 class="no-mb">Promos</h3>
      <div class="panel-close" @click="emit('close')">
        <i aria-hidden="true" class="iconify" data-icon="feather:x"></i>
      </div>
    </div>
    <div class="inner" data-simplebar>
      <ul>
        <li v-has-nested-router-link class="has-children">
          <div class="collapse-wrap">
            <a class="parent-link">
              <i aria-hidden="true" class="lnil lnil-ticket-alt pr-3"></i>
              Consumable
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
                :to="{ name: 'app-promos-consumable-list' }"
                class="is-submenu"
                title="List consumable promos"
              >
                <i aria-hidden="true" class="lnil lnil-list pr-3"></i>
                <span>List</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink
                :to="{ name: 'app-promos-consumable-add' }"
                class="is-submenu"
                title="Add consumable promo"
              >
                <i aria-hidden="true" class="lnil lnil-circle-plus pr-3"></i>
                <span>Add</span>
              </RouterLink>
            </li>
          </ul>
        </li>
        <li v-has-nested-router-link class="has-children">
          <div class="collapse-wrap">
            <a class="parent-link">
              <i aria-hidden="true" class="lnil lnil-reload pr-3"></i>
              Recurring
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
                :to="{ name: 'app-promos-recurring-list' }"
                class="is-submenu"
                title="List recurring promos"
              >
                <i aria-hidden="true" class="lnil lnil-list pr-3"></i>
                <span>List</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink
                :to="{ name: 'app-promos-recurring-add' }"
                class="is-submenu"
                title="Add recurring promos"
              >
                <i aria-hidden="true" class="lnil lnil-circle-plus pr-3"></i>
                <span>Add</span>
              </RouterLink>
            </li>
          </ul>
        </li>
        <li v-has-nested-router-link class="has-children">
          <div class="collapse-wrap">
            <a class="parent-link">
              <i aria-hidden="true" class="lnil lnil-thunderbolt pr-3"></i>
              Flash Deals
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
                :to="{ name: 'app-promos-flash_deals' }"
                class="is-submenu"
                title="Account List"
              >
                <i aria-hidden="true" class="lnil lnil-list-alt-1 pr-3"></i>
                <span>Menu</span>
              </RouterLink>
            </li>
          </ul>
        </li>
        <li v-has-nested-router-link class="has-children">
          <div class="collapse-wrap">
            <a class="parent-link">
              <i aria-hidden="true" class="lnil lnil-table pr-3"></i>
              Account Generated
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
                :to="{ name: 'app-promos-account-list' }"
                class="is-submenu"
                title="Account List"
              >
                <i aria-hidden="true" class="lnil lnil-list pr-3"></i>
                <span>List</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink
                :to="{ name: 'app-promos-account' }"
                class="is-submenu"
                title="Account Promos"
              >
                <i aria-hidden="true" class="lnil lnil-list-alt-1 pr-3"></i>
                <span>Menu</span>
              </RouterLink>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
@import '../../scss/abstracts/_variables.scss';
@import '../../scss/layout/_sidebar-panel.scss';
</style>
