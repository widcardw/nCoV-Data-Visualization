<script setup lang="ts">
const globalProps = defineProps<{
  year?: number
  month?: number
  day?: number
}>()
let yyyy = $ref(globalProps.year ?? 2020)
let MM = $ref(globalProps.month ?? 9)
let dd = $ref(globalProps.day ?? 15)
const currentDate = computed(() => new Date(yyyy, MM - 1, dd))

const daysOfMonth = computed(() => {
  return new Date(yyyy, MM, 0).getDate()
})
const daysOfPrevMonth = computed(() => {
  return new Date(yyyy, (MM + 11) % 12, 0).getDate()
})
const weekDayOf1th = computed(() => {
  return new Date(yyyy, MM - 1, 1).getDay()
})

interface DateStruct {
  value: number
  role: number
}

const pageDays = computed(() => {
  const prev: number[] = []
  for (let i = 0; i < weekDayOf1th.value; i++)
    prev.unshift(daysOfPrevMonth.value - i)
  const cur: number[] = Array(daysOfMonth.value).fill(0).map((_, index) => index + 1)
  const restCount = 42 - daysOfMonth.value - weekDayOf1th.value
  const next = Array(restCount).fill(0).map((_, i) => i + 1)
  return [...prev.map((it) => {
    return {
      value: it,
      role: -1,
    }
  }), ...cur.map((it) => {
    return {
      value: it,
      role: 0,
    }
  }), ...next.map((it) => {
    return {
      value: it,
      role: 1,
    }
  })] as DateStruct[]
})

// 针对月份进位的处理
watchEffect(() => {
  if (MM > 12) {
    MM = 1
    yyyy++
  }
  else if (MM <= 0) {
    MM = 12
    yyyy--
  }
})

// 针对每月天数在切换月份时候的处理
watchEffect(() => {
  if (dd > daysOfMonth.value)
    dd = daysOfMonth.value
})

const changeDate = (v: DateStruct) => {
  dd = v.value
  MM += v.role
}

let calenderShow = $ref(false)
let calenderLeft = $ref(0)
const calRef = $ref<HTMLElement>()

const btnClicked = (e: MouseEvent) => {
  calenderShow = !calenderShow
  if (calenderShow) {
    // Position widget
    nextTick(() => {
      calenderLeft = (e.target as HTMLElement).offsetLeft - calRef.clientWidth / 2 + (e.target as HTMLElement).clientWidth / 2
    })
  }
}

defineExpose({
  date: currentDate,
})
</script>

<template>
  <button btn @click="btnClicked($event)">
    {{ currentDate.toLocaleDateString() }}
  </button>
  <div
    v-if="calenderShow"
    ref="calRef"
    bg="white dark:zinc-900"
    left-5
    absolute
    text-sm
    w-auto
    p-2
    z-999
    border="~ rounded gray-200 dark:gray-700"
    :style=" { left: `${calenderLeft}px` }"
  >
    <div flex justify-between>
      <button icon-btn i-carbon-caret-left @click="yyyy--" />
      <div>
        {{ yyyy }}
      </div>
      <button icon-btn i-carbon-caret-right @click="yyyy++" />
    </div>
    <div flex justify-between>
      <button icon-btn i-carbon-caret-left @click="MM--" />
      <div>{{ MM }}</div>
      <button icon-btn i-carbon-caret-right @click="MM++" />
    </div>
    <div>
      <table w-full>
        <thead w-full>
          <tr>
            <th v-for="week of ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']" :key="week">
              {{ week }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="i in 6" :key="i" h-1rem>
            <td v-for="j in 7" :key="j">
              <span
                class="px-4 py-1"
                :class="{
                  'icon-btn': pageDays[7 * (i - 1) + j - 1].value !== dd,
                  'btn': pageDays[7 * (i - 1) + j - 1].role === 0
                    && pageDays[7 * (i - 1) + j - 1].value === dd,
                  'opacity-20': pageDays[7 * (i - 1) + j - 1].role !== 0,
                }"
                @click="changeDate(pageDays[7 * (i - 1) + j - 1])"
              >
                {{ pageDays[7 * (i - 1) + j - 1].value }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
