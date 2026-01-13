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
          <div v-if="builtRateCard" class="mt-4 flex flex-wrap gap-2">
            <button
              @click="copyToClipboard(builtRateCard)"
              class="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Copy to Clipboard
            </button>
            <button
              @click="copyBuilderToValidator"
              class="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Copy to Validator →
            </button>
          </div>
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
        <div class="mt-4 flex flex-wrap gap-2">
          <button
            @click="copyToClipboard(exampleRateCard)"
            class="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Copy to Clipboard
          </button>
          <button
            @click="copyExampleToValidator"
            class="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Copy to Validator →
          </button>
        </div>
      </div>
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
          <div class="mt-4 flex flex-wrap gap-2">
            <button
              @click="validateRateCard"
              :disabled="validatorLoading"
              class="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 disabled:bg-gray-400 transition-colors"
            >
              {{ validatorLoading ? 'Validating...' : 'Validate' }}
            </button>
            <button
              v-if="validatorInput"
              @click="copyValidatorToChecksum"
              class="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Copy to Add Checksum →
            </button>
          </div>
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

    <!-- Add Checksum Tool -->
    <div v-show="activeTool === 'checksum'" class="space-y-6">
      <div>
        <h2 class="text-2xl font-bold mb-4">Add Checksum</h2>
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
            @click="handleAddChecksum"
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
            v-if="checksumResult && checksumResult.success"
            :value="checksumResult.rateCard"
            readonly
            class="w-full h-96 p-4 border border-gray-300 rounded-lg font-mono text-sm bg-gray-50"
          />
          <div v-else-if="checksumResult && !checksumResult.success" class="p-4 bg-red-50 border border-red-200 rounded-lg h-96 flex items-center justify-center">
            <div class="flex items-start">
              <svg class="w-5 h-5 text-red-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="text-sm text-red-700">Error: {{ checksumResult.error }}</span>
            </div>
          </div>
          <div v-else class="p-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 text-sm h-96 flex items-center justify-center">
            Result will appear here
          </div>
          <div v-if="checksumResult && checksumResult.success" class="mt-4 flex flex-wrap gap-2">
            <button
              @click="copyToClipboard(checksumResult.rateCard)"
              class="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Copy to Clipboard
            </button>
            <button
              @click="copyChecksumToValidateChecksum"
              class="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Copy to Validate Checksum →
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Validate Checksum Tool -->
    <div v-show="activeTool === 'validate-checksum'" class="space-y-6">
      <div>
        <h2 class="text-2xl font-bold mb-4">Validate Checksum</h2>
        <p class="text-gray-600 mb-6">
          Verify the SHA-256 checksum of your rate card to ensure data integrity.
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Rate Card JSON (with checksum)
          </label>
          <textarea
            v-model="validateChecksumInput"
            class="w-full h-96 p-4 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Paste your rate card JSON with checksum here..."
          />
          <div class="mt-4 flex flex-wrap gap-2">
            <button
              @click="handleValidateChecksum"
              :disabled="validateChecksumLoading"
              class="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 disabled:bg-gray-400 transition-colors"
            >
              {{ validateChecksumLoading ? 'Validating...' : 'Validate Checksum' }}
            </button>
            <button
              v-if="validateChecksumInput && validateChecksumResult?.valid"
              @click="copyValidateChecksumToSign"
              class="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Copy to Sign Document →
            </button>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Validation Result
          </label>
          <div 
            v-if="validateChecksumResult"
            class="p-4 rounded-lg border"
            :class="validateChecksumResult.valid ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'"
          >
            <div class="flex items-start">
              <svg 
                v-if="validateChecksumResult.valid"
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
                  :class="validateChecksumResult.valid ? 'text-green-800' : 'text-red-800'"
                >
                  {{ validateChecksumResult.message }}
                </h3>
                <div v-if="validateChecksumResult.details" class="text-sm" :class="validateChecksumResult.valid ? 'text-green-700' : 'text-red-700'">
                  <p v-if="validateChecksumResult.details.checksum">Checksum: {{ validateChecksumResult.details.checksum }}</p>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="p-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 text-sm h-96 flex items-center justify-center">
            Validation result will appear here
          </div>
        </div>
      </div>
    </div>

    <!-- Sign Document Tool -->
    <div v-show="activeTool === 'sign-document'" class="space-y-6">
      <div>
        <h2 class="text-2xl font-bold mb-4">Sign Document</h2>
        <p class="text-gray-600 mb-6">
          Digitally sign your rate card using your private key for authenticity verification.
        </p>
      </div>

      <div v-if="!hasStoredKeys" class="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div class="flex items-center">
          <svg class="w-5 h-5 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span class="text-yellow-800">No signing keys found. Please generate or import keys in the <button @click="activeTool = 'key-management'" class="underline font-medium">Key Management</button> section first.</span>
        </div>
      </div>

      <div v-else class="grid md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Rate Card JSON (with checksum)
          </label>
          <textarea
            v-model="signInput"
            class="w-full h-80 p-4 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Paste your rate card JSON here..."
          />
          <div class="mt-4 flex flex-wrap gap-2">
            <div class="flex items-center gap-2">
              <label class="text-sm font-medium text-gray-700">Algorithm:</label>
              <select
                v-model="signAlgorithm"
                class="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="RS256">RS256 (RSA)</option>
                <option value="RS384">RS384 (RSA)</option>
                <option value="RS512">RS512 (RSA)</option>
                <option value="ES256">ES256 (ECDSA)</option>
                <option value="ES384">ES384 (ECDSA)</option>
                <option value="ES512">ES512 (ECDSA)</option>
              </select>
            </div>
          </div>
          <div class="mt-4 flex flex-wrap gap-2">
            <label class="flex items-center gap-2">
              <input type="checkbox" v-model="signIncludePublicKey" class="rounded" />
              <span class="text-sm text-gray-700">Include public key in signature</span>
            </label>
            <label class="flex items-center gap-2 ml-4">
              <input type="checkbox" v-model="signIncludeTimestamp" class="rounded" />
              <span class="text-sm text-gray-700">Include timestamp</span>
            </label>
          </div>
          <button
            @click="handleSignDocument"
            :disabled="signLoading"
            class="mt-4 bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 disabled:bg-gray-400 transition-colors"
          >
            {{ signLoading ? 'Signing...' : 'Sign Document' }}
          </button>
          <div v-if="signError" class="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div class="flex items-start">
              <svg class="w-5 h-5 text-red-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="text-sm text-red-700">{{ signError }}</span>
            </div>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Signed Document
          </label>
          <textarea
            v-if="signResult"
            :value="signResult.rateCard"
            readonly
            class="w-full h-80 p-4 border border-gray-300 rounded-lg font-mono text-sm bg-gray-50"
          />
          <div v-else class="p-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 text-sm h-80 flex items-center justify-center">
            Signed document will appear here
          </div>
          <div v-if="signResult" class="mt-4 flex flex-wrap gap-2">
            <button
              @click="copyToClipboard(signResult.rateCard)"
              class="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Copy to Clipboard
            </button>
            <button
              @click="copySignedToVerify"
              class="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Copy to Verify Signature →
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Verify Signature Tool -->
    <div v-show="activeTool === 'verify-signature'" class="space-y-6">
      <div>
        <h2 class="text-2xl font-bold mb-4">Verify Signature</h2>
        <p class="text-gray-600 mb-6">
          Verify the digital signature of a signed rate card document.
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Signed Rate Card JSON
          </label>
          <textarea
            v-model="verifySignatureInput"
            class="w-full h-80 p-4 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Paste your signed rate card JSON here..."
          />
          <div class="mt-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Public Key (optional - uses embedded key if available)
            </label>
            <textarea
              v-model="verifyPublicKeyOverride"
              class="w-full h-32 p-4 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="-----BEGIN PUBLIC KEY-----
...
-----END PUBLIC KEY-----"
            />
          </div>
          <button
            @click="handleVerifySignature"
            :disabled="verifySignatureLoading"
            class="mt-4 bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 disabled:bg-gray-400 transition-colors"
          >
            {{ verifySignatureLoading ? 'Verifying...' : 'Verify Signature' }}
          </button>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Verification Result
          </label>
          <div 
            v-if="verifySignatureResult"
            class="p-4 rounded-lg border"
            :class="verifySignatureResult.valid ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'"
          >
            <div class="flex items-start">
              <svg 
                v-if="verifySignatureResult.valid"
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
                  :class="verifySignatureResult.valid ? 'text-green-800' : 'text-red-800'"
                >
                  {{ verifySignatureResult.message }}
                </h3>
                <div v-if="verifySignatureResult.signatureInfo" class="text-sm space-y-1" :class="verifySignatureResult.valid ? 'text-green-700' : 'text-red-700'">
                  <p><strong>Algorithm:</strong> {{ verifySignatureResult.signatureInfo.algorithm }}</p>
                  <p v-if="verifySignatureResult.signatureInfo.timestamp"><strong>Signed at:</strong> {{ verifySignatureResult.signatureInfo.timestamp }}</p>
                  <p v-if="verifySignatureResult.signatureInfo.keyId"><strong>Key ID:</strong> {{ verifySignatureResult.signatureInfo.keyId }}</p>
                </div>
                <p v-if="verifySignatureResult.error" class="text-sm text-red-700 mt-2">{{ verifySignatureResult.error }}</p>
              </div>
            </div>
          </div>
          <div v-else class="p-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 text-sm h-80 flex items-center justify-center">
            Verification result will appear here
          </div>
        </div>
      </div>
    </div>

    <!-- Key Management Tool (Advanced) -->
    <div v-show="activeTool === 'key-management'" class="space-y-6">
      <div>
        <h2 class="text-2xl font-bold mb-4">🔐 Key Management</h2>
        <p class="text-gray-600 mb-6">
          Generate, import, and export cryptographic key pairs for signing rate card documents. Keys are stored securely in your browser's local storage.
        </p>
      </div>

      <!-- Current Key Status -->
      <div class="p-4 rounded-lg border" :class="hasStoredKeys ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <svg v-if="hasStoredKeys" class="w-6 h-6 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <svg v-else class="w-6 h-6 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <div>
              <h3 class="font-semibold" :class="hasStoredKeys ? 'text-green-800' : 'text-gray-700'">
                {{ hasStoredKeys ? '✓ Keys Stored in Browser' : 'No Keys Stored in Browser' }}
              </h3>
              <p class="text-sm" :class="hasStoredKeys ? 'text-green-600' : 'text-gray-500'">
                <span v-if="hasStoredKeys && storedKeyAlgorithm">Algorithm: {{ storedKeyAlgorithm }} · </span>
                <span>Both public and private keys are stored in your browser's local storage</span>
              </p>
            </div>
          </div>
          <div v-if="hasStoredKeys" class="flex items-center space-x-2">
            <template v-if="!confirmDeleteKeys">
              <button
                @click="confirmDeleteKeys = true"
                class="text-red-600 hover:text-red-800 text-sm font-medium"
              >
                Delete Keys
              </button>
            </template>
            <template v-else>
              <span class="text-sm text-red-700">Delete keys?</span>
              <button
                @click="handleDeleteKeys"
                class="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
              >
                Yes, Delete
              </button>
              <button
                @click="confirmDeleteKeys = false"
                class="bg-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-400"
              >
                Cancel
              </button>
            </template>
          </div>
        </div>
      </div>

      <!-- Success/Error Messages -->
      <div v-if="keyManagementMessage" class="p-4 rounded-lg border" :class="keyManagementMessage.type === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <svg v-if="keyManagementMessage.type === 'success'" class="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <svg v-else class="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span :class="keyManagementMessage.type === 'success' ? 'text-green-800' : 'text-red-800'">{{ keyManagementMessage.text }}</span>
          </div>
          <button @click="keyManagementMessage = null" class="text-gray-500 hover:text-gray-700">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Generate/Import Keys (shown when no keys exist, or when user wants to replace) -->
      <div v-if="!hasStoredKeys || showKeyGeneration" class="grid md:grid-cols-2 gap-6">
        <!-- Generate Keys -->
        <div class="p-6 border border-gray-200 rounded-lg">
          <h3 class="text-lg font-semibold mb-4">Generate New Key Pair</h3>
          <p class="text-sm text-gray-600 mb-4">Generate a new cryptographic key pair for signing documents. Keys will be stored in your browser.</p>
          
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Algorithm</label>
            <select
              v-model="generateKeyAlgorithm"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="RS256">RS256 (RSA-SHA256) - Recommended</option>
              <option value="RS384">RS384 (RSA-SHA384)</option>
              <option value="RS512">RS512 (RSA-SHA512)</option>
              <option value="ES256">ES256 (ECDSA-P256)</option>
              <option value="ES384">ES384 (ECDSA-P384)</option>
              <option value="ES512">ES512 (ECDSA-P521)</option>
            </select>
          </div>
          
          <button
            @click="handleGenerateKeys"
            :disabled="generateKeyLoading"
            class="w-full bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 disabled:bg-gray-400 transition-colors"
          >
            {{ generateKeyLoading ? 'Generating...' : 'Generate Keys' }}
          </button>
          
          <p v-if="hasStoredKeys" class="mt-2 text-sm text-yellow-600">
            ⚠️ This will replace your existing keys stored in this browser
          </p>
        </div>

        <!-- Import Keys -->
        <div class="p-6 border border-gray-200 rounded-lg">
          <h3 class="text-lg font-semibold mb-4">Import Key Pair</h3>
          <p class="text-sm text-gray-600 mb-4">Import an existing PEM-encoded key pair. Keys will be stored in your browser.</p>
          
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Private Key (PEM)</label>
            <textarea
              v-model="importPrivateKey"
              class="w-full h-32 p-3 border border-gray-300 rounded-lg font-mono text-xs focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="-----BEGIN PRIVATE KEY-----
...
-----END PRIVATE KEY-----"
            />
          </div>
          
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Public Key (PEM)</label>
            <textarea
              v-model="importPublicKey"
              class="w-full h-32 p-3 border border-gray-300 rounded-lg font-mono text-xs focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="-----BEGIN PUBLIC KEY-----
...
-----END PUBLIC KEY-----"
            />
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Algorithm</label>
            <select
              v-model="importKeyAlgorithm"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="RS256">RS256 (RSA-SHA256)</option>
              <option value="RS384">RS384 (RSA-SHA384)</option>
              <option value="RS512">RS512 (RSA-SHA512)</option>
              <option value="ES256">ES256 (ECDSA-P256)</option>
              <option value="ES384">ES384 (ECDSA-P384)</option>
              <option value="ES512">ES512 (ECDSA-P521)</option>
            </select>
          </div>
          
          <button
            @click="handleImportKeys"
            :disabled="!importPrivateKey || !importPublicKey"
            class="w-full bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 disabled:bg-gray-400 transition-colors"
          >
            Import Keys
          </button>
          
          <p v-if="hasStoredKeys" class="mt-2 text-sm text-yellow-600">
            ⚠️ This will replace your existing keys stored in this browser
          </p>
        </div>
      </div>

      <!-- Show option to generate/import new keys when keys already exist -->
      <div v-if="hasStoredKeys && !showKeyGeneration" class="p-4 border border-gray-200 rounded-lg bg-gray-50">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Need to generate new keys or import different ones?</p>
          </div>
          <button
            @click="showKeyGeneration = true"
            class="text-primary-600 hover:text-primary-800 text-sm font-medium"
          >
            Generate or Import Keys →
          </button>
        </div>
      </div>

      <!-- Cancel button when showing key generation with existing keys -->
      <div v-if="hasStoredKeys && showKeyGeneration" class="flex justify-end">
        <button
          @click="showKeyGeneration = false"
          class="text-gray-600 hover:text-gray-800 text-sm"
        >
          ← Cancel, keep existing keys
        </button>
      </div>

      <!-- Export Keys -->
      <div v-if="hasStoredKeys" class="p-6 border border-gray-200 rounded-lg">
        <h3 class="text-lg font-semibold mb-4">Export Keys</h3>
        <p class="text-sm text-gray-600 mb-4">Export your key pair for backup or use in other systems.</p>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Public Key</label>
            <textarea
              :value="storedPublicKey"
              readonly
              class="w-full h-48 p-3 border border-gray-300 rounded-lg font-mono text-xs bg-gray-50"
            />
            <button
              @click="copyToClipboard(storedPublicKey)"
              class="mt-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm"
            >
              Copy Public Key
            </button>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Private Key</label>
            <div class="relative">
              <textarea
                :value="showPrivateKey ? storedPrivateKey : hiddenKeyPlaceholder"
                readonly
                class="w-full h-48 p-3 border border-gray-300 rounded-lg font-mono text-xs bg-gray-50"
              />
              <button
                @click="showPrivateKey = !showPrivateKey"
                class="absolute top-2 right-2 text-sm text-primary-600 hover:text-primary-800"
              >
                {{ showPrivateKey ? 'Hide' : 'Show' }}
              </button>
            </div>
            <button
              v-if="showPrivateKey"
              @click="copyToClipboard(storedPrivateKey)"
              class="mt-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm"
            >
              Copy Private Key
            </button>
            <p class="mt-2 text-xs text-red-600">⚠️ Keep your private key secure and never share it!</p>
          </div>
        </div>
      </div>

      <!-- Key Validation -->
      <div class="p-6 border border-gray-200 rounded-lg">
        <h3 class="text-lg font-semibold mb-4">Validate Key Pair</h3>
        <p class="text-sm text-gray-600 mb-4">Test if a key pair is valid by signing and verifying a test message.</p>
        
        <button
          @click="handleValidateKeys"
          :disabled="!hasStoredKeys || validateKeysLoading"
          class="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 disabled:bg-gray-400 transition-colors"
        >
          {{ validateKeysLoading ? 'Validating...' : 'Validate Stored Keys' }}
        </button>
        
        <div v-if="validateKeysResult" class="mt-4 p-4 rounded-lg" :class="validateKeysResult.valid ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'">
          <div class="flex items-center">
            <svg v-if="validateKeysResult.valid" class="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <svg v-else class="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span :class="validateKeysResult.valid ? 'text-green-800' : 'text-red-800'">{{ validateKeysResult.message }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { addChecksum, validate, verifyChecksum, generatePemKeyPair, signDocument, verifySignature } from '@connexcs/interconnect-made-easy'
import type { SigningAlgorithm } from '@connexcs/interconnect-made-easy'

const activeTool = ref('builder')

const tools = [
  { id: 'builder', name: 'Builder' },
  { id: 'example', name: 'Example' },
  { id: 'validator', name: 'Validator' },
  { id: 'checksum', name: 'Add Checksum' },
  { id: 'validate-checksum', name: 'Validate Checksum' },
  { id: 'sign-document', name: 'Sign Document' },
  { id: 'verify-signature', name: 'Verify Signature' },
  { id: 'key-management', name: '🔐 Key Management' },
]

// Validator
const validatorInput = ref('')
const validatorResult = ref<any>(null)
const validatorLoading = ref(false)

const validateRateCard = async () => {
  validatorLoading.value = true
  validatorResult.value = null
  
  try {
    // Use the interconnect-made-easy package for validation
    const result = validate(validatorInput.value)
    validatorResult.value = {
      valid: result.valid,
      message: result.valid ? 'Rate card is valid!' : 'Validation failed',
      errors: result.errors?.map(err => err.message || String(err))
    }
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

const handleAddChecksum = async () => {
  checksumLoading.value = true
  checksumResult.value = null
  
  try {
    // Parse the input JSON
    const parsed = JSON.parse(checksumInput.value)
    
    // Use the interconnect-made-easy package to add checksum
    const docWithChecksum = await addChecksum(parsed)
    
    // Set the result
    checksumResult.value = {
      success: true,
      rateCard: JSON.stringify(docWithChecksum, null, 2),
      checksum: docWithChecksum.metadata?.checksum,
      message: 'Checksum added successfully'
    }
  } catch (error) {
    checksumResult.value = {
      success: false,
      error: (error as Error).message
    }
  } finally {
    checksumLoading.value = false
  }
}

// Validate Checksum
const validateChecksumInput = ref('')
const validateChecksumResult = ref<any>(null)
const validateChecksumLoading = ref(false)

const handleValidateChecksum = async () => {
  validateChecksumLoading.value = true
  validateChecksumResult.value = null
  
  try {
    // Parse the input JSON
    const parsed = JSON.parse(validateChecksumInput.value)
    
    // Use the interconnect-made-easy package to verify checksum
    const isValid = await verifyChecksum(parsed)
    
    // Set the result
    validateChecksumResult.value = {
      valid: isValid,
      message: isValid ? 'Checksum is valid!' : 'Checksum verification failed',
      details: {
        checksum: parsed.metadata?.checksum || 'No checksum found'
      }
    }
  } catch (error) {
    validateChecksumResult.value = {
      valid: false,
      message: 'Error validating checksum',
      details: {
        error: (error as Error).message
      }
    }
  } finally {
    validateChecksumLoading.value = false
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

// Copy between tools
const copyBuilderToValidator = () => {
  validatorInput.value = builtRateCard.value
  activeTool.value = 'validator'
}

const copyExampleToValidator = () => {
  validatorInput.value = exampleRateCard
  activeTool.value = 'validator'
}

const copyValidatorToChecksum = () => {
  checksumInput.value = validatorInput.value
  activeTool.value = 'checksum'
}

const copyChecksumToValidateChecksum = () => {
  validateChecksumInput.value = checksumResult.value?.rateCard || ''
  activeTool.value = 'validate-checksum'
}

const copyValidateChecksumToSign = () => {
  signInput.value = validateChecksumInput.value
  activeTool.value = 'sign-document'
}

// Sign Document
const signInput = ref('')
const signResult = ref<any>(null)
const signLoading = ref(false)
const signAlgorithm = ref<SigningAlgorithm>('RS256')
const signIncludePublicKey = ref(true)
const signIncludeTimestamp = ref(true)
const signError = ref('')

const handleSignDocument = async () => {
  signLoading.value = true
  signResult.value = null
  signError.value = ''
  
  try {
    const parsed = JSON.parse(signInput.value)
    const privateKey = storedPrivateKey.value
    
    if (!privateKey) {
      throw new Error('No private key found. Please generate or import keys first.')
    }
    
    const signedDoc = await signDocument(parsed, privateKey, signAlgorithm.value, {
      publicKey: signIncludePublicKey.value ? storedPublicKey.value : undefined,
      includeTimestamp: signIncludeTimestamp.value
    })
    
    signResult.value = {
      success: true,
      rateCard: JSON.stringify(signedDoc, null, 2),
      message: 'Document signed successfully'
    }
  } catch (error) {
    signError.value = (error as Error).message
  } finally {
    signLoading.value = false
  }
}

const copySignedToVerify = () => {
  verifySignatureInput.value = signResult.value?.rateCard || ''
  activeTool.value = 'verify-signature'
}

// Verify Signature
const verifySignatureInput = ref('')
const verifySignatureResult = ref<any>(null)
const verifySignatureLoading = ref(false)
const verifyPublicKeyOverride = ref('')

const handleVerifySignature = async () => {
  verifySignatureLoading.value = true
  verifySignatureResult.value = null
  
  try {
    const parsed = JSON.parse(verifySignatureInput.value)
    const publicKey = verifyPublicKeyOverride.value.trim() || undefined
    
    const result = await verifySignature(parsed, publicKey)
    
    verifySignatureResult.value = {
      valid: result.valid,
      message: result.valid ? 'Signature is valid!' : 'Signature verification failed',
      signatureInfo: result.signatureInfo,
      error: result.error
    }
  } catch (error) {
    verifySignatureResult.value = {
      valid: false,
      message: 'Error verifying signature',
      error: (error as Error).message
    }
  } finally {
    verifySignatureLoading.value = false
  }
}

// Key Management
const STORAGE_KEY_PRIVATE = 'interconnect-exchange-private-key'
const STORAGE_KEY_PUBLIC = 'interconnect-exchange-public-key'
const STORAGE_KEY_ALGORITHM = 'interconnect-exchange-key-algorithm'

const storedPrivateKey = ref('')
const storedPublicKey = ref('')
const storedKeyAlgorithm = ref('')
const showPrivateKey = ref(false)
const showKeyGeneration = ref(false)
const confirmDeleteKeys = ref(false)
const keyManagementMessage = ref<{ type: 'success' | 'error', text: string } | null>(null)

const hasStoredKeys = computed(() => !!storedPrivateKey.value && !!storedPublicKey.value)

const hiddenKeyPlaceholder = computed(() => '••••••••••••••••••••\n••••••••••••••••••••\n••••••••••••••••••••\nClick "Show" to reveal')

const loadKeysFromStorage = () => {
  if (typeof window !== 'undefined') {
    storedPrivateKey.value = localStorage.getItem(STORAGE_KEY_PRIVATE) || ''
    storedPublicKey.value = localStorage.getItem(STORAGE_KEY_PUBLIC) || ''
    storedKeyAlgorithm.value = localStorage.getItem(STORAGE_KEY_ALGORITHM) || ''
  }
}

const saveKeysToStorage = (privateKey: string, publicKey: string, algorithm: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY_PRIVATE, privateKey)
    localStorage.setItem(STORAGE_KEY_PUBLIC, publicKey)
    localStorage.setItem(STORAGE_KEY_ALGORITHM, algorithm)
    storedPrivateKey.value = privateKey
    storedPublicKey.value = publicKey
    storedKeyAlgorithm.value = algorithm
  }
}

const deleteKeysFromStorage = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY_PRIVATE)
    localStorage.removeItem(STORAGE_KEY_PUBLIC)
    localStorage.removeItem(STORAGE_KEY_ALGORITHM)
    storedPrivateKey.value = ''
    storedPublicKey.value = ''
    storedKeyAlgorithm.value = ''
  }
}

// Generate Keys
const generateKeyAlgorithm = ref<SigningAlgorithm>('RS256')
const generateKeyLoading = ref(false)

const handleGenerateKeys = async () => {
  generateKeyLoading.value = true
  keyManagementMessage.value = null
  
  try {
    const keyPair = await generatePemKeyPair(generateKeyAlgorithm.value)
    saveKeysToStorage(keyPair.privateKey, keyPair.publicKey, generateKeyAlgorithm.value)
    showKeyGeneration.value = false
    keyManagementMessage.value = { type: 'success', text: 'Key pair generated successfully! Both keys are now stored in your browser.' }
  } catch (error) {
    keyManagementMessage.value = { type: 'error', text: 'Error generating keys: ' + (error as Error).message }
  } finally {
    generateKeyLoading.value = false
  }
}

// Import Keys
const importPrivateKey = ref('')
const importPublicKey = ref('')
const importKeyAlgorithm = ref<SigningAlgorithm>('RS256')

const handleImportKeys = () => {
  keyManagementMessage.value = null
  
  if (!importPrivateKey.value.trim() || !importPublicKey.value.trim()) {
    keyManagementMessage.value = { type: 'error', text: 'Please provide both private and public keys' }
    return
  }
  
  saveKeysToStorage(importPrivateKey.value.trim(), importPublicKey.value.trim(), importKeyAlgorithm.value)
  importPrivateKey.value = ''
  importPublicKey.value = ''
  showKeyGeneration.value = false
  keyManagementMessage.value = { type: 'success', text: 'Keys imported successfully! Both keys are now stored in your browser.' }
}

const handleDeleteKeys = () => {
  deleteKeysFromStorage()
  showPrivateKey.value = false
  confirmDeleteKeys.value = false
  validateKeysResult.value = null
  keyManagementMessage.value = { type: 'success', text: 'Keys have been deleted from your browser.' }
}

// Validate Keys
const validateKeysLoading = ref(false)
const validateKeysResult = ref<any>(null)

const handleValidateKeys = async () => {
  validateKeysLoading.value = true
  validateKeysResult.value = null
  
  try {
    // Create a test document
    const testDoc = {
      name: 'Key Validation Test',
      schema_version: '1.0.0',
      version: '1.0',
      date: new Date().toISOString().split('T')[0],
      cards: {}
    }
    
    // Sign it with the stored private key
    const signedDoc = await signDocument(testDoc, storedPrivateKey.value, storedKeyAlgorithm.value as SigningAlgorithm, {
      publicKey: storedPublicKey.value
    })
    
    // Verify with the stored public key
    const result = await verifySignature(signedDoc, storedPublicKey.value)
    
    validateKeysResult.value = {
      valid: result.valid,
      message: result.valid ? 'Key pair is valid and working correctly!' : 'Key pair validation failed - keys may not match'
    }
  } catch (error) {
    validateKeysResult.value = {
      valid: false,
      message: 'Key validation error: ' + (error as Error).message
    }
  } finally {
    validateKeysLoading.value = false
  }
}

// Load keys on mount
onMounted(() => {
  loadKeysFromStorage()
})

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
