<!-- FormRenderer.vue - Actually Simple -->
<template>
  <div class="flex flex-col items-center justify-center w-full p-4">
    <!-- Upload Section -->
    <div class="bg-gray-50 w-5/10 py-4 px-8 rounded-lg text-center border border-gray-200 shadow-sm">
      <h1 class="text-2xl font-bold">Render and test your form!</h1>
      <p class="text-gray-600">Import a JSON file from the form builder.</p>

      <div class="flex gap-4 justify-center my-8">
        <input ref="fileInput" class="cursor-pointer max-w-84 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" type="file" accept=".json" />
        <button @click="loadForm" class=" cursor-pointer bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded-md text-white">
          Load Form
        </button>
      </div>

      <button @click="downloadSample" class="bg-gray-800 cursor-pointer hover:bg-gray-950 py-2 px-4 rounded-md text-white">
        Download Sample
      </button>
    </div>

    <!-- Form Section -->
    <div v-if="formElements.length > 0" class="mt-8 w-5/10 p-6 bg-gray-50  border border-gray-200 rounded-lg shadow-sm">
      <h2 class="text-xl font-semibold mb-4">Form Preview</h2>

      <form @submit.prevent="submitForm" class="space-y-4">
        <div v-for="element in formElements" :key="element.id" class="space-y-2">
          <label class="block font-medium">
            {{ element.label }}
            <span v-if="element.required" class="text-red-500">*</span>
          </label>

          <!-- Input -->
          <Input v-if="element.type === 'input'"
            v-model="formData[element.id]"
            :type="element.inputType || 'text'"
            :placeholder="element.placeholder"
            :required="element.required"
            class="w-full p-2 border rounded">
          </Input>

          <!-- Textarea -->
          <Textarea
            v-else-if="element.type === 'textarea'"
            v-model="formData[element.id]"
            :placeholder="element.placeholder"
            :required="element.required"
            :rows="element.rows || 3"
            class="w-full p-2 border rounded resize-none"
          />

          <!-- Select -->

          <Select v-else-if="element.type === 'select'"
            v-model="formData[element.id]"
            :required="element.required"
            >
            <SelectTrigger class="w-full">
              <SelectValue :placeholder="element.placeholder" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                v-for="option in element.options || []"
                :key="option"
                :value="option"
              >
                {{ option }}
              </SelectItem>
            </SelectContent>
          </Select>



          <!-- Radio Group -->
          
          <div v-else-if="element.type === 'radio-group'" class="space-y-1">
            <div v-if="element.groupTitle" class="text-sm text-gray-600 mb-2">
            {{ element.groupTitle }}
          </div>
          <RadioGroup v-model="formData[element.id]"  class="space-y-1">
            <div
              v-for="option in element.options" :key="option"
              class="flex items-center gap-2"
            >
              <RadioGroupItem
                :id="`${element.id}-radio-${option}`"
                :value="option"
              />
              <Label :for="`${element.id}-radio-${option}`" class="text-sm font-normal">{{ option }}</Label>
            </div>
          </RadioGroup>
          </div>
          

          <!-- Checkbox Group -->
          <div v-else-if="element.type === 'checkbox-group'" class="space-y-1">
            <div v-if="element.groupTitle" class="text-sm text-gray-600 mb-2">
              {{ element.groupTitle }}
            </div>
            <div class="space-y-2 p-2">
              <div
                v-for="(option, index) in element.options || []"
                :key="`${element.id}-checkbox-${index}`"
                class="flex items-center gap-2"
              >
                <Checkbox 
                  :id="`${element.id}-checkbox-${index}`"
                  :checked="(formData[element.id] || []).includes(option)"
                  @click="toggleCheckbox(element.id, option)"
                />
                <Label :for="`${element.id}-checkbox-${index}`" class="text-sm font-normal">{{ option }}</Label>
              </div>
            </div>
          </div>

          <!-- Validation Error -->
          <p v-if="errors[element.id]" class="text-red-500 text-sm">{{ errors[element.id] }}</p>
        </div>

        <button type="submit" class="w-full bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded text-white">
          Submit Form
        </button>
      </form>

      <button @click="clearForm" class="mt-4 text-blue-500 hover:underline">
        Clear Form
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { loadJSONFromFile } from '@/composables/useJsonUtils'
import type { FormElement as FormElementType } from '@/types/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
// State
const fileInput = ref<HTMLInputElement>()
const formElements = ref<FormElementType[]>([])
const formData = reactive<Record<string, any>>({})
const errors = reactive<Record<string, string>>({})

// Methods
const loadForm = async () => {
  const input = fileInput.value
  if (!input?.files?.length) {
    alert('Please select a file')
    return
  }

  try {
    const data = await loadJSONFromFile(input.files[0])
    formElements.value = data as FormElementType[]

    // Initialize form data
    formElements.value.forEach(element => {
      if (element.type === 'checkbox-group') {
        formData[element.id] = []
      } else {
        formData[element.id] = ''
      }
    })

    console.log('Form loaded:', formElements.value.length, 'elements')
  } catch (error) {
    alert('Failed to load form')
    console.error(error)
  }
}

const toggleCheckbox = (elementId: string, option: string) => {
  console.log('Checkbox clicked:', { elementId, option })
  
  const currentValues = formData[elementId] || []
  const isCurrentlySelected = currentValues.includes(option)
  
  if (isCurrentlySelected) {
    // Remove option
    formData[elementId] = currentValues.filter((value: string) => value !== option)
  } else {
    // Add option
    formData[elementId] = [...currentValues, option]
  }
  
  console.log('Updated formData:', formData[elementId])
}

const validateForm = () => {
  // Clear previous errors
  Object.keys(errors).forEach(key => delete errors[key])

  let isValid = true

  formElements.value.forEach(element => {
    if (element.required) {
      const value = formData[element.id]

      if (element.type === 'checkbox-group') {
        if (!value || value.length === 0) {
          errors[element.id] = `${element.label} is required`
          isValid = false
        }
      } else {
        if (!value || value.trim() === '') {
          errors[element.id] = `${element.label} is required`
          isValid = false
        }
      }

      // Email validation
      if (element.type === 'input' && element.inputType === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) {
          errors[element.id] = 'Invalid email format'
          isValid = false
        }
      }
    }
  })

  return isValid
}

const submitForm = () => {
  if (!validateForm()) {
    alert('Please fix the errors above')
    return
  }

  console.log('Form submitted:', formData)

  // Download submission
  const submission = {
    submittedAt: new Date().toISOString(),
    data: { ...formData }
  }

  const blob = new Blob([JSON.stringify(submission, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `submission-${Date.now()}.json`
  link.click()
  URL.revokeObjectURL(url)

  alert('Form submitted successfully!')
}

const clearForm = () => {
  formElements.value = []
  Object.keys(formData).forEach(key => delete formData[key])
  Object.keys(errors).forEach(key => delete errors[key])
  if (fileInput.value) fileInput.value.value = ''
}

const downloadSample = () => {
  const sample = [
    {
      id: 'name',
      type: 'input',
      label: 'Full Name',
      placeholder: 'Enter your name',
      required: true,
      inputType: 'text'
    },
    {
      id: 'email',
      type: 'input',
      label: 'Email',
      placeholder: 'Enter email',
      required: true,
      inputType: 'email'
    },
    {
      id: 'country',
      type: 'select',
      label: 'Country',
      placeholder: 'Select country',
      required: true,
      options: ['USA', 'Canada', 'UK']
    }
  ]

  const blob = new Blob([JSON.stringify(sample, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'sample-form.json'
  link.click()
  URL.revokeObjectURL(url)
}
</script>

<style scoped>
</style>