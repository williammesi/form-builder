<template>
  <div class="flex flex-col items-center justify-center w-full   p-4">
    <div class="bg-gray-50 w-5/10 py-4 px-8 rounded-lg text-center border border-gray-200 shadow-sm">
      <h1 class="text-2xl font-bold">
        Render and test your form here !
      </h1>
      <p class="text-gray-600">
        Import a JSON file exported from the form builder to see the rendered form.
      </p>

      <div class="flex flex-row items-center gap-4 justify-center my-8">
        <input ref="fileInput" class="cursor-pointer max-w-84 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" type="file" accept=".json" />
        <button @click="loadFormFromJson" class=" cursor-pointer bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded-lg text-white">
          Load Form
        </button>
      </div>
      

      <p class="text-gray-600 mt-2">
        You can also test the form functionality by downloading a basic form sample by clicking on the button below, and then importing it.
      </p>
      <div class="flex flex-row items-center gap-4 justify-center mt-4">
        <button class=" cursor-pointer bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded-lg text-white">
          Download a form sample
        </button>
      </div>

    </div>


    

    <div v-if="isFormLoaded" class="mt-8 w-5/10 py-4 px-8 rounded-lg text-center bg-gray-50 border border-gray-200 shadow-sm">
      <h2 class="text-2xl font-semibold mb-4">Form Preview</h2>
      <form @submit="onSubmit" class="flex flex-col items-center  ">
        <div class="w-full flex flex-row items-center justify-center" v-for="element in formElements" :key="element.id">
          <FormElement
            :mode="'render'"
            :element="element"
          />
        </div>
        <button type="submit" class="mt-4 cursor-pointer bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded-lg text-white">
          Submit
        </button>
      </form>
      
      
    </div>

    
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { loadJSONFromFile } from '@/composables/useJsonUtils'
import type { FormElement as FormElementType } from '@/types/form';
import FormElement from '@/components/FormElement.vue';




const fileInput = ref<HTMLInputElement>()
const formElements = ref<FormElementType[]>([])
const isFormLoaded = ref(false)

const loadFormFromJson = async () => {
  const input = fileInput.value
  if (!input || !input.files || input.files.length === 0) {
    alert('Please select a JSON file first')
    return
  }

  const file = input.files[0]

  try {
    const formData = await loadJSONFromFile(file)
    console.log('Parsed form data:', formData)
    // Process your form data here
    formElements.value = formData as FormElementType[]
    isFormLoaded.value = true
    alert('Form loaded successfully!')

  } catch (error) {
    alert(error instanceof Error ? error.message : 'Failed to load JSON file')
    console.error('Error loading JSON:', error)
    isFormLoaded.value = false
    formElements.value = []
    
  }
}

const onSubmit = () => {
  alert('Form submitted! (Functionality to be implemented)')
}





</script>

<style scoped>
</style>
  