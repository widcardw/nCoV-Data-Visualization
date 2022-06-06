<script setup lang="ts">
import useMyFetch from '~/composables/useMyFetch'

let skip = $ref(0)
const root = $ref<HTMLElement>()

const url = computed(() => `/news?skip=${skip}&limit=15`)

const { data } = await useMyFetch(url, { refetch: true }).json()

const nextPage = () => {
  skip += 15
  nextTick (() => {
    root.scrollTo({ top: 0, behavior: 'smooth' })
  })
}

const previousPage = () => {
  if (skip >= 15) {
    skip -= 15
    nextTick (() => {
      root.scrollTo({ top: 0, behavior: 'smooth' })
    })
  }
}
</script>

<template>
  <div ref="root" columns-3>
    <Card
      v-for="(news, i) in data.data" :key="i"
      :title="news.title"
      :delay="i / 3"
      break-inside-avoid mb-4
    >
      <template #header-extra>
        <a :href="news.sourceUrl" icon-btn class="i-carbon-link" />
      </template>
      <template #default>
        <div
          p-4
          bg-zinc-50 dark:bg-zinc-900
        >
          <!-- <p v-for="line in news.summary.split('\n')" :key="line">
            {{ line }}
          </p> -->
          {{ news.summary }}
        </div>
      </template>
      <template #footer>
        <div p-4 flex justify-between>
          <div>{{ news.infoSource }}</div>
          <div>{{ news.pubDate }}</div>
        </div>
      </template>
    </Card>
  </div>
  <div flex justify-between m-4>
    <div icon-btn i-carbon-arrow-left @click="previousPage" />
    <div icon-btn i-carbon-arrow-right @click="nextPage" />
  </div>
</template>
