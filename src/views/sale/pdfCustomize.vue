<template>
  <div class="pdf">
    <div id="pdf-viewer"></div>
    <!-- <pdf-viewer :pdf-file="pdfUrl" :height="500" :width="800" /> -->
  </div>
</template>
<script setup lang="ts">
import PDFObject from 'pdfobject'
import pdfUrl from './QXCMG1L801-2024.pdf'

onMounted(() =>
  PDFObject.embed(pdfUrl, '#pdf-viewer', {
    height: '80vh',
    width: '60%',
    page: '2',
    pdfOpenParams: {
      zoom: '60',
    },
  }),
)
</script>
<style lang="scss" scoped></style>
