<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h1 class="text-4xl font-bold mb-8">Rate Card Tools</h1>
    <p class="text-gray-600 mb-12">
      Use these tools to validate, add checksums, and work with rate card JSON documents.
    </p>

    <!-- Tool Tabs -->
    <div class="border-b border-gray-200 mb-8">
      <nav class="flex space-x-8">
        <button
          v-for="tool in tools"
          :key="tool.id"
          @click="activeTool = tool.id"
          class="py-4 px-1 border-b-2 font-medium text-sm transition-colors"
          :class="activeTool === tool.id 
            ? 'border-primary-500 text-primary-600' 
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
        >
          {{ tool.name }}
        </button>
      </nav>
    </div>

    <!-- Validator Tool -->
    <div v-show="activeTool === 'validator'" class="space-y-6">
      <div>
        <h2 class="text-2xl font-bold mb-4">Rate Card Validator</h2>
        <p class="text-gray-600 mb-6">
          Validate your rate card JSON against the Open Rate Card specification.
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Rate Card JSON
          </label>
          <textarea
            v-model="validatorInput"
            class="w-full h-96 p-4 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Paste your rate card JSON here..."
          />
          <button
            @click="validateRateCard"
            :disabled="validatorLoading"
            class="mt-4 bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 disabled:bg-gray-400 transition-colors"
          >
            {{ validatorLoading ? 'Validating...' : 'Validate' }}
          </button>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Validation Results
          </label>
          <div 
            v-if="validatorResult"
            class="p-4 rounded-lg border"
            :class="validatorResult.valid ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'"
          >
            <div class="flex items-start">
              <svg 
                v-if="validatorResult.valid"
                class="w-6 h-6 text-green-600 mr-3 flex-shrink-0" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <svg 
                v-else
                class="w-6 h-6 text-red-600 mr-3 flex-shrink-0" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div class="flex-1">
                <h3 
                  class="font-semibold mb-2"
                  :class="validatorResult.valid ? 'text-green-800' : 'text-red-800'"
                >
                  {{ validatorResult.message }}
                </h3>
                <ul 
                  v-if="validatorResult.errors && validatorResult.errors.length > 0"
                  class="space-y-1"
                >
                  <li 
                    v-for="(error, index) in validatorResult.errors"
                    :key="index"
                    class="text-sm text-red-700"
                  >
                    • {{ error }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div v-else class="p-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 text-sm">
            Validation results will appear here
          </div>
        </div>
      </div>
    </div>

    <!-- Checksum Tool -->
    <div v-show="activeTool === 'checksum'" class="space-y-6">
      <div>
        <h2 class="text-2xl font-bold mb-4">Checksum Generator</h2>
        <p class="text-gray-600 mb-6">
          Add a SHA-256 checksum to your rate card for integrity verification.
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Rate Card JSON
          </label>
          <textarea
            v-model="checksumInput"
            class="w-full h-96 p-4 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Paste your rate card JSON here..."
          />
          <button
            @click="addChecksum"
            :disabled="checksumLoading"
            class="mt-4 bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 disabled:bg-gray-400 transition-colors"
          >
            {{ checksumLoading ? 'Processing...' : 'Add Checksum' }}
          </button>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Result with Checksum
          </label>
          <textarea
            v-if="checksumResult"
            :value="checksumResult.rateCard"
            readonly
            class="w-full h-96 p-4 border border-gray-300 rounded-lg font-mono text-sm bg-gray-50"
          />
          <div v-else class="p-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 text-sm h-96 flex items-center justify-center">
            Result will appear here
          </div>
          <button
            v-if="checksumResult"
            @click="copyToClipboard(checksumResult.rateCard)"
            class="mt-4 bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Copy to Clipboard
          </button>
        </div>
      </div>
    </div>

    <!-- Builder Tool -->
    <div v-show="activeTool === 'builder'" class="space-y-6">
      <div>
        <h2 class="text-2xl font-bold mb-4">Rate Card Builder</h2>
        <p class="text-gray-600 mb-6">
          Build a rate card using a simple form interface.
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-6">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              v-model="builder.name"
              type="text"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="My Telecom Rate Card"
            />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Version
              </label>
              <input
                v-model="builder.version"
                type="text"
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="1.0"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <input
                v-model="builder.date"
                type="date"
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Card Name
            </label>
            <input
              v-model="builder.cardName"
              type="text"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Basic Termination"
            />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Card Type
              </label>
              <select
                v-model="builder.cardType"
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="termination">Termination</option>
                <option value="origination">Origination</option>
                <option value="messaging">Messaging</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Currency
              </label>
              <input
                v-model="builder.currency"
                type="text"
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="USD"
              />
            </div>
          </div>

          <button
            @click="buildRateCard"
            class="w-full bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Build Rate Card
          </button>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Generated Rate Card
          </label>
          <textarea
            :value="builtRateCard"
            readonly
            class="w-full h-[500px] p-4 border border-gray-300 rounded-lg font-mono text-sm bg-gray-50"
          />
          <button
            v-if="builtRateCard"
            @click="copyToClipboard(builtRateCard)"
            class="mt-4 bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Copy to Clipboard
          </button>
        </div>
      </div>
    </div>

    <!-- Example Tool -->
    <div v-show="activeTool === 'example'" class="space-y-6">
      <div>
        <h2 class="text-2xl font-bold mb-4">Example Rate Card</h2>
        <p class="text-gray-600 mb-6">
          A complete example of a valid rate card JSON document.
        </p>
      </div>

      <div class="max-w-4xl">
        <textarea
          :value="exampleRateCard"
          readonly
          class="w-full h-[600px] p-4 border border-gray-300 rounded-lg font-mono text-sm bg-gray-50"
        />
        <button
          @click="copyToClipboard(exampleRateCard)"
          class="mt-4 bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors mr-4"
        >
          Copy to Clipboard
        </button>
        <button
          @click="loadExample"
          class="mt-4 bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          Load in Validator
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const activeTool = ref('validator')

const tools = [
  { id: 'validator', name: 'Validator' },
  { id: 'checksum', name: 'Checksum' },
  { id: 'builder', name: 'Builder' },
  { id: 'example', name: 'Example' },
]

// Validator
const validatorInput = ref('')
const validatorResult = ref<any>(null)
const validatorLoading = ref(false)

const validateRateCard = async () => {
  validatorLoading.value = true
  validatorResult.value = null
  
  try {
    const { data } = await useFetch('/api/tools/validate', {
      method: 'POST',
      body: { rateCard: validatorInput.value }
    })
    validatorResult.value = data.value
  } catch (error) {
    validatorResult.value = {
      valid: false,
      message: 'Error validating rate card',
      errors: [(error as Error).message]
    }
  } finally {
    validatorLoading.value = false
  }
}

// Checksum
const checksumInput = ref('')
const checksumResult = ref<any>(null)
const checksumLoading = ref(false)

const addChecksum = async () => {
  checksumLoading.value = true
  checksumResult.value = null
  
  try {
    const { data } = await useFetch('/api/tools/checksum', {
      method: 'POST',
      body: { rateCard: checksumInput.value }
    })
    checksumResult.value = data.value
  } catch (error) {
    alert('Error adding checksum: ' + (error as Error).message)
  } finally {
    checksumLoading.value = false
  }
}

// Builder
const builder = ref({
  name: '',
  version: '1.0',
  date: new Date().toISOString().split('T')[0],
  cardName: '',
  cardType: 'termination',
  currency: 'USD',
})

const builtRateCard = ref('')

const buildRateCard = () => {
  const rateCard = {
    name: builder.value.name,
    schema_version: '1.0.0',
    version: builder.value.version,
    date: builder.value.date,
    cards: {
      default: {
        name: builder.value.cardName,
        type: builder.value.cardType,
        currency: builder.value.currency,
        endpoint: 'default'
      }
    }
  }
  builtRateCard.value = JSON.stringify(rateCard, null, 2)
}

// Example
const exampleRateCard = `{
  "name": "ABC Telecom Rate Card",
  "schema_version": "1.0.0",
  "version": "2.1",
  "date": "2026-01-13",
  "description": "Competitive international calling rates",
  "author": "ABC Telecom",
  "cards": {
    "default": {
      "name": "International Termination",
      "type": "termination",
      "currency": "USD",
      "endpoint": "sip.abctelecom.com",
      "routes": [
        {
          "prefix": "1",
          "destination": "USA",
          "rate": 0.0085,
          "interval": 60,
          "increment": 1
        },
        {
          "prefix": "44",
          "destination": "UK",
          "rate": 0.0095,
          "interval": 60,
          "increment": 1
        },
        {
          "prefix": "91",
          "destination": "India",
          "rate": 0.0125,
          "interval": 60,
          "increment": 1
        }
      ]
    }
  }
}`

const loadExample = () => {
  validatorInput.value = exampleRateCard
  activeTool.value = 'validator'
}

// Utility
const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    alert('Copied to clipboard!')
  } catch (error) {
    alert('Failed to copy to clipboard')
  }
}

useHead({
  title: 'Tools - Interconnect Exchange',
  meta: [
    { 
      name: 'description', 
      content: 'Tools for validating, building, and working with Open Rate Card JSON documents.' 
    }
  ]
})
</script>
