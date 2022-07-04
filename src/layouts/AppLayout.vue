<script setup lang="ts">
import { ref, watchPostEffect, watch } from 'vue'
import { useRoute } from 'vue-router'

import type { SidebarTheme } from '/@src/components/navigation/desktop/Sidebar.vue'
import { useViewWrapper } from '/@src/stores/viewWrapper'

const props = withDefaults(
  defineProps<{
    theme?: SidebarTheme
    defaultSidebar?: string
    closeOnChange?: boolean
    openOnMounted?: boolean
    nowrap?: boolean
  }>(),
  {
    defaultSidebar: 'dashboard',
    theme: 'default',
  }
)

const viewWrapper = useViewWrapper()
const route = useRoute()
const isMobileSidebarOpen = ref(false)
const isDesktopSidebarOpen = ref(props.openOnMounted)
const activeMobileSubsidebar = ref(props.defaultSidebar)

function switchSidebar(id: string) {
  if (id === activeMobileSubsidebar.value) {
    isDesktopSidebarOpen.value = !isDesktopSidebarOpen.value
  } else {
    isDesktopSidebarOpen.value = true
    activeMobileSubsidebar.value = id
  }
}

/**
 * watchPostEffect callback will be executed each time dependent reactive values has changed
 */
watchPostEffect(() => {
  viewWrapper.setPushed(isDesktopSidebarOpen.value ?? false)
})
watch(
  () => route.fullPath,
  () => {
    isMobileSidebarOpen.value = false

    if (props.closeOnChange && isDesktopSidebarOpen.value) {
      isDesktopSidebarOpen.value = false
    }
  }
)
</script>

<template>
  <div class="sidebar-layout">
    <div class="app-overlay"></div>

    <!-- Mobile navigation -->
    <MobileNavbar
      :is-open="isMobileSidebarOpen"
      @toggle="isMobileSidebarOpen = !isMobileSidebarOpen"
    >
      <template #brand>
        <RouterLink :to="{ name: 'index' }" class="navbar-item is-brand">
          <AnimatedLogo width="38px" height="38px" />
        </RouterLink>

        <div class="brand-end">
          <NotificationsMobileDropdown />
          <UserProfileDropdown />
        </div>
      </template>
    </MobileNavbar>

    <!-- Mobile sidebar links -->
    <MobileSidebar
      :is-open="isMobileSidebarOpen"
      @toggle="isMobileSidebarOpen = !isMobileSidebarOpen"
    >
      <template #links>
        <li>
          <RouterLink :to="{ name: 'app' }">
            <i aria-hidden="true" class="iconify" data-icon="feather:home"></i>
          </RouterLink>
        </li>
      </template>

      <template #bottom-links>
        <li>
          <a href="#">
            <i aria-hidden="true" class="iconify" data-icon="feather:settings"></i>
          </a>
        </li>
      </template>
    </MobileSidebar>

    <!-- Mobile subsidebar links -->
    <Transition name="slide-x">
      <DashboardsMobileSubsidebar
        v-if="isMobileSidebarOpen && activeMobileSubsidebar === 'dashboard'"
      />
    </Transition>

    <Sidebar :theme="props.theme" :is-open="isDesktopSidebarOpen">
      <template #links>
        <!-- Dashboards -->
        <li>
          <a
            :class="[activeMobileSubsidebar === 'dashboard' && 'is-active']"
            data-content="Dashboards"
            tabindex="0"
            @keydown.space.prevent="switchSidebar('dashboard')"
            @click="switchSidebar('dashboard')"
          >
            <i
              aria-hidden="true"
              class="iconify sidebar-svg"
              data-icon="feather:layers"
            ></i>
          </a>
        </li>
        <!-- Orders sidebar -->
        <li>
          <a
            :class="[activeMobileSubsidebar === 'orders' && 'is-active']"
            data-content="Orders"
            title="Orders"
            @keydown.space.prevent="switchSidebar('orders')"
            @click="switchSidebar('orders')"
          >
            <i
              aria-hidden="true"
              class="iconify sidebar-svg"
              data-icon="feather:shopping-bag"
            ></i>
          </a>
        </li>
        <!-- Products sidebar -->
        <li>
          <a
            :class="[activeMobileSubsidebar === 'products' && 'is-active']"
            data-content="Products"
            title="Products"
            @click="switchSidebar('products')"
            @keydown.space.prevent="switchSidebar('products')"
          >
            <i aria-hidden="true" class="iconify sidebar-svg" data-icon="feather:box"></i>
          </a>
        </li>
        <!-- Branch sidebar -->
        <li>
          <a
            :class="[activeMobileSubsidebar === 'branches' && 'is-active']"
            data-content="Branches"
            title="Branches"
            @click="switchSidebar('branches')"
            @keydown.space.prevent="switchSidebar('branches')"
          >
            <i aria-hidden="true" class="iconify sidebar-svg" data-icon="ps:branch"></i>
          </a>
        </li>
        <!-- People sidebar -->
        <li>
          <a
            :class="[activeMobileSubsidebar === 'people' && 'is-active']"
            data-content="People"
            title="People"
            @click="switchSidebar('people')"
            @keydown.space.prevent="switchSidebar('people')"
          >
            <i
              aria-hidden="true"
              class="iconify sidebar-svg"
              data-icon="feather:users"
            ></i>
          </a>
        </li>
        <!-- Statistics sidebar -->
        <li>
          <a
            :class="[activeMobileSubsidebar === 'statistics' && 'is-active']"
            data-content="Statistics"
            title="Statistics"
            @click="switchSidebar('statistics')"
            @keydown.space.prevent="switchSidebar('statistics')"
          >
            <i
              aria-hidden="true"
              class="iconify sidebar-svg"
              data-icon="feather:trending-up"
            ></i>
          </a>
        </li>
        <!-- Promos sidebar -->
        <li>
          <a
            :class="[activeMobileSubsidebar === 'promos' && 'is-active']"
            data-content="Promos"
            title="Promos"
            @click="switchSidebar('promos')"
            @keydown.space.prevent="switchSidebar('promos')"
          >
            <i
              aria-hidden="true"
              class="iconify sidebar-svg"
              data-icon="tabler:percentage"
            ></i>
          </a>
        </li>
      </template>

      <template #bottom-links>
        <!-- Settings -->
        <li>
          <a
            :class="[activeMobileSubsidebar === 'settings' && 'is-active']"
            data-content="Settings"
            title="Settings"
            @click="switchSidebar('settings')"
            @keydown.space.prevent="switchSidebar('settings')"
          >
            <i
              aria-hidden="true"
              class="iconify sidebar-svg"
              data-icon="feather:settings"
            ></i>
          </a>
        </li>

        <!-- Profile Dropdown -->
        <li>
          <UserProfileDropdown up />
        </li>
      </template>
    </Sidebar>

    <Transition name="slide-x">
      <!-- Dashboard subsidebar -->
      <DashboardsSubsidebar
        v-if="isDesktopSidebarOpen && activeMobileSubsidebar === 'dashboard'"
        @close="isDesktopSidebarOpen = false"
      />
      <!-- Orders subsidebar -->
      <OrdersSubsidebar
        v-else-if="isDesktopSidebarOpen && activeMobileSubsidebar === 'orders'"
        @close="isDesktopSidebarOpen = false"
      />
      <!-- Products subsidebar -->
      <ProductsSubsidebar
        v-else-if="isDesktopSidebarOpen && activeMobileSubsidebar === 'products'"
        @close="isDesktopSidebarOpen = false"
      />
      <!-- Branch subsidebar -->
      <BranchSubsidebar
        v-else-if="isDesktopSidebarOpen && activeMobileSubsidebar === 'branches'"
        @close="isDesktopSidebarOpen = false"
      />
      <!-- People subsidebar -->
      <PeopleSubsidebar
        v-else-if="isDesktopSidebarOpen && activeMobileSubsidebar === 'people'"
        @close="isDesktopSidebarOpen = false"
      />
      <!-- Statistics subsidebar -->
      <StatisticsSubsidebar
        v-else-if="isDesktopSidebarOpen && activeMobileSubsidebar === 'statistics'"
        @close="isDesktopSidebarOpen = false"
      />
      <!-- Promos subsidebar -->
      <PromosSubsidebar
        v-else-if="isDesktopSidebarOpen && activeMobileSubsidebar === 'promos'"
        @close="isDesktopSidebarOpen = false"
      />
      <!-- Settings subsidebar -->
      <SettingsSubsidebar
        v-else-if="isDesktopSidebarOpen && activeMobileSubsidebar == 'settings'"
        @close="isDesktopSidebarOpen = false"
      />
    </Transition>

    <LanguagesPanel />

    <VViewWrapper>
      <VPageContentWrapper>
        <template v-if="props.nowrap">
          <slot></slot>
        </template>
        <VPageContent v-else class="is-relative">
          <div class="page-title has-text-centered">
            <!-- Sidebar Trigger -->
            <div
              class="vuero-hamburger nav-trigger push-resize"
              tabindex="0"
              @keydown.space.prevent="isDesktopSidebarOpen = !isDesktopSidebarOpen"
              @click="isDesktopSidebarOpen = !isDesktopSidebarOpen"
            >
              <span class="menu-toggle has-chevron">
                <span :class="[isDesktopSidebarOpen && 'active']" class="icon-box-toggle">
                  <span class="rotate">
                    <i aria-hidden="true" class="icon-line-top"></i>
                    <i aria-hidden="true" class="icon-line-center"></i>
                    <i aria-hidden="true" class="icon-line-bottom"></i>
                  </span>
                </span>
              </span>
            </div>

            <div class="title-wrap">
              <h1 class="title is-4">{{ viewWrapper.pageTitle }}</h1>
            </div>

            <Toolbar class="desktop-toolbar" />
          </div>

          <slot></slot>
        </VPageContent>
      </VPageContentWrapper>
    </VViewWrapper>
  </div>
</template>
