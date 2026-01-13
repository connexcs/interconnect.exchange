<template>
  <header class="bg-white shadow-sm border-b border-gray-200">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <NuxtLink to="/" class="flex items-center">
            <span class="text-2xl font-bold text-primary-600">Interconnect</span>
            <span class="text-2xl font-bold text-gray-900 ml-1">.exchange</span>
          </NuxtLink>
        </div>
        <div class="flex items-center space-x-8">
          <NuxtLink 
            to="/" 
            class="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors"
            active-class="text-primary-600"
          >
            Home
          </NuxtLink>
          <NuxtLink 
            to="/docs" 
            class="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors"
            active-class="text-primary-600"
          >
            Documentation
          </NuxtLink>
          <NuxtLink 
            to="/tools" 
            class="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors"
            active-class="text-primary-600"
          >
            Tools
          </NuxtLink>
          <a 
            href="https://github.com/connexcs/interconnect-made-easy" 
            target="_blank"
            rel="noopener noreferrer"
            class="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
</script>
