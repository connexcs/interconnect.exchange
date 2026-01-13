<template>
  <footer class="bg-gray-900 text-white mt-auto">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 class="text-lg font-semibold mb-4">Interconnect.exchange</h3>
          <p class="text-gray-400 text-sm">
            Open Rate Card Specification for telecommunications industry
          </p>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-4">Resources</h3>
          <ul class="space-y-2 text-sm">
            <li>
              <NuxtLink to="/docs" class="text-gray-400 hover:text-white transition-colors">
                Documentation
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/tools" class="text-gray-400 hover:text-white transition-colors">
                Tools
              </NuxtLink>
            </li>
            <li>
              <a 
                href="https://github.com/connexcs/interconnect-made-easy" 
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-400 hover:text-white transition-colors"
              >
                GitHub Repository
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-4">About</h3>
          <ul class="space-y-2 text-sm">
            <li>
              <a 
                href="https://connexcs.com" 
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-400 hover:text-white transition-colors"
              >
                ConnexCS
              </a>
            </li>
            <li>
              <a 
                href="https://www.npmjs.com/package/@connexcs/interconnect-made-easy" 
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-400 hover:text-white transition-colors"
              >
                NPM Package
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
        <p>&copy; {{ currentYear }} ConnexCS. Open Rate Card Specification.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>
