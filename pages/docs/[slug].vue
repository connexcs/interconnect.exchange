<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="grid md:grid-cols-4 gap-8">
      <!-- Sidebar -->
      <aside class="md:col-span-1">
        <nav class="sticky top-4 space-y-2">
          <h2 class="text-lg font-semibold mb-4">Documentation</h2>
          <NuxtLink
            v-for="doc in docs"
            :key="doc.slug"
            :to="`/docs/${doc.slug}`"
            class="block px-3 py-2 rounded-md text-sm hover:bg-gray-100 transition-colors"
            :class="{ 'bg-primary-100 text-primary-700 font-medium': currentSlug === doc.slug }"
          >
            {{ doc.title }}
          </NuxtLink>
        </nav>
      </aside>

      <!-- Content -->
      <main class="md:col-span-3">
        <article 
          v-if="content" 
          class="prose prose-blue max-w-none prose-headings:font-bold prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-a:text-primary-600 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-gray-100"
          v-html="content"
        />
        <div v-else class="text-center py-12">
          <p class="text-gray-500">Loading documentation...</p>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const currentSlug = computed(() => (route.params.slug as string) || 'readme')

const docs = [
  { slug: 'readme', title: 'Overview', file: 'README.md' },
  { slug: 'specification', title: 'Specification', file: 'SPECIFICATION.md' },
  { slug: 'card-types', title: 'Card Types', file: 'CARD-TYPES.md' },
  { slug: 'versioning', title: 'Versioning', file: 'VERSIONING.md' },
  { slug: 'glossary', title: 'Glossary', file: 'GLOSSARY.md' },
  { slug: 'contributing', title: 'Contributing', file: 'CONTRIBUTING.md' },
]

const content = ref('')

const loadDoc = async () => {
  const doc = docs.find(d => d.slug === currentSlug.value)
  if (doc) {
    const { data } = await useFetch(`/api/docs/${doc.file}`)
    if (data.value) {
      content.value = data.value as string
    }
  }
}

watch(currentSlug, loadDoc, { immediate: true })

useHead({
  title: `${docs.find(d => d.slug === currentSlug.value)?.title || 'Documentation'} - Interconnect Exchange`,
})
</script>
