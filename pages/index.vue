<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-primary-600 to-purple-700 text-white py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-5xl font-bold mb-6">Interconnect Made Easy</h1>
          <p class="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Open Rate Card Specification for the telecommunications industry. 
            Standardize, automate, and exchange rate cards with JSON.
          </p>
          <div class="flex justify-center space-x-4">
            <NuxtLink 
              to="/docs" 
              class="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              View Documentation
            </NuxtLink>
            <NuxtLink 
              to="/tools" 
              class="bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-800 transition-colors border-2 border-white"
            >
              Try Tools
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-center mb-12">Why Interconnect Made Easy?</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="p-6 border border-gray-200 rounded-lg">
            <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Standardization</h3>
            <p class="text-gray-600">
              Common JSON specification for rate cards, eliminating PDF and Excel inefficiencies.
            </p>
          </div>
          <div class="p-6 border border-gray-200 rounded-lg">
            <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Automation</h3>
            <p class="text-gray-600">
              Programmatic ingestion and comparison of rate card data for seamless integration.
            </p>
          </div>
          <div class="p-6 border border-gray-200 rounded-lg">
            <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Interoperability</h3>
            <p class="text-gray-600">
              Facilitate integration between carriers, billing systems, and routing engines.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Example Section -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-center mb-12">Quick Example</h2>
        <div class="max-w-3xl mx-auto">
          <div class="bg-gray-900 rounded-lg p-6 overflow-x-auto">
            <pre class="text-green-400 text-sm"><code>{
  "name": "My Telecom Rate Card",
  "schema_version": "1.0.0",
  "version": "1.0",
  "date": "2026-01-13",
  "cards": {
    "default": {
      "name": "Basic Termination",
      "type": "termination",
      "currency": "USD",
      "endpoint": "default"
    }
  }
}</code></pre>
          </div>
          <p class="text-center mt-6 text-gray-600">
            A minimal valid rate card in JSON format
          </p>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-primary-600 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p class="text-xl mb-8 text-blue-100">
          Explore the tools and start working with rate cards today
        </p>
        <NuxtLink 
          to="/tools" 
          class="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
        >
          Explore Tools
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Interconnect Exchange - Open Rate Card Specification',
  meta: [
    { 
      name: 'description', 
      content: 'Open Rate Card Specification for the telecommunications industry. Standardize, automate, and exchange rate cards with JSON.' 
    }
  ]
})
</script>
